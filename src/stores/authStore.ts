import { AxiosError } from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "@/components/axios/api";
import useProfileStore from "./profileStore";

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
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

interface AuthData {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: User;
}

interface ApiError {
  success: boolean;
  message: string;
  statusCode: number;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (
    email: string,
    password: string
  ) => Promise<APIResponse<AuthData> | ApiError>;
  register: (
    fullName: string,
    email: string,
    password: string
  ) => Promise<ApiError | { success: boolean; message: string }>;
  logout: () => Promise<APIResponse<null> | ApiError | undefined>;
  clearError: () => void;
  getUser: () => Promise<void>;
}

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
          const response = await api.post<APIResponse<AuthData>>(
            "/auth/login",
            {
              email,
              password,
            }
          );

          const { data } = response;

          if (data.success && data.data.accessToken) {
            set({
              accessToken: data.data.accessToken,
              isAuthenticated: true,
              user: data.data.user,
              loading: false,
            });
          }

          return data;
        } catch (error) {
          const axiosError = error as AxiosError<ApiError>;
          set({
            loading: false,
            error:
              axiosError.response?.data?.message || "Authentication failed",
            isAuthenticated: false,
          });
          throw axiosError.response?.data;
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
          return {
            success: false,
            message:
              axiosError.response?.data?.message || "Registration failed",
          };
        }
      },

      getUser: async () => {
        try {
          set({
            loading: true,
          });
          const token = get().accessToken;
          if (!token) throw new Error("No access token available");

          const response = await api.get<APIResponse<User>>("/auth/me");
          const { data } = response;

          if (data.success) {
            set({
              user: data.data,
              isAuthenticated: true,
              loading: false,
            });

            const profileStore = useProfileStore.getState();

            // Fetch user stats, achievements, and quiz history in parallel
            if (get().accessToken) {
              await Promise.all([
                profileStore.fetchUserStats(),
                profileStore.fetchAchievements(),
                profileStore.fetchQuizHistory(),
              ]);
            }
          }
        } catch (error) {
          const axiosError = error as AxiosError<ApiError>;
          set({
            loading: false,
            error:
              axiosError.response?.data?.message || "Failed to fetch user data",
            isAuthenticated: false,
            user: null,
          });
        }
      },

      logout: async () => {
        try {
          const token = get().accessToken;
          if (!token) return;
          const response = await api.post<APIResponse<null>>("/auth/logout");
          const { data } = response;

          if (data.success) {
            set({
              user: null,
              accessToken: null,
              isAuthenticated: false,
              error: null,
            });
          }
          return data;
        } catch (error) {
          const axiosError = error as AxiosError<ApiError>;
          set({
            error: axiosError.response?.data?.message || "Logout failed",
          });
          return {
            success: false,
            message: axiosError.response?.data?.message || "Logout failed",
            data: null,
          };
        }
      },

      clearError: () => set({ error: null }),
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
