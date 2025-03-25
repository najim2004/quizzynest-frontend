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

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!BASE_URL) {
  throw new Error("NEXT_PUBLIC_API_BASE_URL is not defined");
}

// Create axios instance with default config
const api = axios.create({
  baseURL: BASE_URL,
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
          const { data } = await api.post<AuthResponse>("/api/auth/login", {
            email,
            password,
          });

          if (data.success && data?.data.accessToken) {
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
          throw error;
        }
      },

      register: async (fullName: string, email: string, password: string) => {
        try {
          set({ loading: true, error: null });
          const { data } = await api.post<{
            success: boolean;
            message: string;
          }>("/api/auth/register", {
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
          throw error;
        }
      },

      getUser: async () => {
        try {
          set({ loading: true, error: null });
          const { data } = await api.get<{ success: boolean; data: User }>(
            "/api/auth/me",
            {
              headers: {
                Authorization: `Bearer ${get().accessToken}`,
              },
            }
          );
          if (data.success) {
            set({
              user: data.data,
              isAuthenticated: true,
              loading: false,
            });
          }
        } catch (error) {
          const axiosError = error as AxiosError<ApiError>;
          set({
            loading: false,
            error: axiosError.response?.data?.message || "Failed to fetch user",
            isAuthenticated: false,
          });
          throw error;
        }
      },

      logout: () => {
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          error: null,
        });
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
