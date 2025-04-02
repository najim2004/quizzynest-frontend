import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import useAuthStore from "@/stores/authStore";

const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const authStore = useAuthStore.getState();
    const token = authStore.accessToken;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error?.status === 401 || error?.response?.status === 401) {
      const { accessToken } = useAuthStore.getState();
      if (accessToken) {
        useAuthStore.setState({
          user: null,
          isAuthenticated: false,
          accessToken: null,
        });
        window.location.replace("/login");
      }
    }
    return Promise.reject(error);
  }
);

export default api;
