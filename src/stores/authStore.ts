import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios, { AxiosError } from "axios";

interface User {
  id: number;
  email: string;
  fullName: string;
  role: "ADMIN" | "USER";
  profile?: {
    profilePic?: string;
    bio?: string;
  };
}

interface AuthResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    user: User;
  };
}

interface ApiError {
  message: string;
  statusCode: number;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<AuthResponse | undefined>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  clearError: () => void;
  getUser: () => Promise<void>;
}

// Create axios instance with default config
const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      loading: false,
      error: null,

      login: async (email: string, password: string) => {
        try {
          set({ loading: true, error: null });
          const { data } = await api.post<AuthResponse>("/auth/login", {
            email,
            password,
          });

          if (data.success && data?.data.accessToken) {
            get().getUser();
            set({
              accessToken: data?.data.accessToken,
              isAuthenticated: true,
              loading: false,
            });
          }

          return data;
        } catch (error) {
          const axiosError = error as AxiosError<ApiError>;
          set({
            loading: false,
            error: axiosError.response?.data?.message || "Login failed",
            isAuthenticated: false,
          });
          return error.response?.data;
        }
      },

      register: async (fullName: string, email: string, password: string) => {
        try {
          set({ loading: true, error: null });
          const { data } = await api.post<{
            success: boolean;
            message: string;
          }>("/auth/register", {
            fullName,
            email,
            password,
          });

          set({ loading: false });
          return data;
        } catch (error) {
          const axiosError = error as AxiosError<ApiError>;
          set({
            loading: false,
            error: axiosError.response?.data?.message || "Registration failed",
          });
          return error.response?.data;
        }
      },

      getUser: async () => {
        try {
          // if (!get().accessToken) throw new Error("No access token");
          set({ loading: true, error: null });
          const { data } = await api<{ success: boolean; data: User }>(
            "/auth/me",
            {
              headers: {
                Authorization: `Bearer ${get().accessToken}`,
              },
            }
          );
          console.log(data);
          if (data?.success) {
            set({
              user: data.data,
              isAuthenticated: true,
              loading: false,
            });
          }
        } catch (error) {
          console.log(error);
          const axiosError = error as AxiosError<ApiError>;
          set({
            loading: false,
            error: axiosError.response?.data?.message || "Failed to fetch user",
            isAuthenticated: false,
          });
          return (
            error.response?.data || {
              success: false,
              message: error.message || "Failed to fetch user",
            }
          );
        }
      },

      logout: async () => {
        try {
          const { data } = await api.post<{
            success: boolean;
            message: string;
          }>(`/auth/logout`);
          if (data.success) {
            set({ user: null, accessToken: null, isAuthenticated: false });
            return { success: true, message: data.message };
          }
        } catch (error) {
          const axiosError = error as AxiosError<ApiError>;
          set({
            error: axiosError.response?.data?.message || "Failed to logout",
          });
          return error.response?.data;
        }
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
