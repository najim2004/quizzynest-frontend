import api from "@/components/axios/api";
import { create } from "zustand";
import { APIResponse } from "./authStore";

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export interface Category {
  id: number;
  name: string;
  description?: string;
  color?: string;
  icon?: string;
  iconId?: string;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
  _count: {
    quizzes: number;
  };
}

interface CategoryStore {
  categories: Category[];
  loading: boolean;
  error: string | null;

  // Actions
  fetchCategories: () => Promise<void>;
  createCategory: (formData: FormData) => Promise<APIResponse<Category>>;
  updateCategory: (id: number, formData: FormData) => Promise<Category>;
  deleteCategory: (id: number) => Promise<void>;
  getCategoryById: (id: number) => Promise<Category>;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  categories: [],
  loading: false,
  error: null,

  fetchCategories: async () => {
    try {
      set({ loading: true });
      const response = await api.get<APIResponse<Category[]>>("/categories");
      set({ categories: response.data.data, error: null });
    } catch (error) {
      const apiError = error as ApiError;
      set({
        error: apiError.response?.data?.message || "Failed to fetch categories",
      });
    } finally {
      set({ loading: false });
    }
  },

  createCategory: async (formData: FormData) => {
    try {
      set({ loading: true });
      const response = await api.post<APIResponse<Category>>(
        "/categories",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const newCategory = response.data.data;
      set((state) => ({
        categories: [newCategory, ...state.categories],
        error: null,
      }));
      return response.data;
    } catch (error) {
      const apiError = error as ApiError;
      set({
        error: apiError.response?.data?.message || "Failed to create category",
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  updateCategory: async (id: number, formData: FormData) => {
    try {
      set({ loading: true });
      const response = await api.put<APIResponse<Category>>(
        `/categories/${id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const updatedCategory = response.data.data;
      set((state) => ({
        categories: state.categories.map((cat) =>
          cat.id === id ? updatedCategory : cat
        ),
        error: null,
      }));
      return updatedCategory;
    } catch (error) {
      const apiError = error as ApiError;
      set({
        error: apiError.response?.data?.message || "Failed to update category",
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  deleteCategory: async (id: number) => {
    try {
      set({ loading: true });
      await api.delete(`/categories/${id}`);
      set((state) => ({
        categories: state.categories.filter((cat) => cat.id !== id),
        error: null,
      }));
    } catch (error) {
      const apiError = error as ApiError;
      set({
        error: apiError.response?.data?.message || "Failed to delete category",
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  getCategoryById: async (id: number) => {
    try {
      set({ loading: true });
      const response = await api.get<APIResponse<Category>>(
        `/categories/${id}`
      );
      return response.data.data;
    } catch (error) {
      const apiError = error as ApiError;
      set({
        error: apiError.response?.data?.message || "Failed to fetch category",
      });
      throw error;
    } finally {
      set({ loading: false });
    }
  },
}));
