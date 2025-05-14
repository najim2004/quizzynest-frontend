import api from "@/components/axios/api";
import { create } from "zustand";
import { AdminQuizFilterDto, ClientQuiz, UpdateQuizDto } from "./quizStore";
import useAuthStore from "./authStore";
import { persist as zustandPersist } from "zustand/middleware";

interface QuizGeneratorStore {
  // State
  isLoading: boolean;
  message: string | null;
  error: string | null;
  jobId: string | null;
  jobStatus: string | null;
  jobProgress: number;
  pendingQuizzes: (ClientQuiz & { status: string })[];

  // Actions
  initiateQuizGeneration: (files: File[]) => Promise<void>;
  checkJobStatus: (jobId: string) => Promise<void>;
  resetStore: () => void;
  getPendingQuizzes: (filters: AdminQuizFilterDto) => Promise<void>;
  updateQuiz: (
    quizId: number,
    input: UpdateQuizDto & { status: string }
  ) => Promise<{ success: boolean; message: string }>;
  deleteQuiz: (
    quizId: number
  ) => Promise<{ success: boolean; message: string }>;
}

const useQuizGeneratorStore = create<QuizGeneratorStore>()(
  persist(
    (set, get) => ({
      isLoading: false,
      message: null,
      error: null,
      jobId: null,
      jobStatus: null,
      jobProgress: 0,
      pendingQuizzes: [],

      initiateQuizGeneration: async (files: File[]) => {
        set({ isLoading: true, error: null });
        try {
          if (useAuthStore.getState().user?.role !== "ADMIN") return;
          if (get().pendingQuizzes.length > 0) {
            throw new Error(
              "You have pending quizzes. Please resolve them before uploading new files."
            );
          }
          const formData = new FormData();
          files.forEach((file) => formData.append("files", file));

          const { data } = await api.post(
            "/quiz-generation/generate",
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            }
          );

          if (data.success) {
            set({
              jobId: data.data.jobId,
              message: data.message || "Quiz generation initiated successfully",
              error: null,
              jobStatus: "pending",
              jobProgress: 0,
              pendingQuizzes: [],
            });
          } else {
            throw new Error(data.message);
          }
        } catch (error) {
          set({
            jobId: null,
            jobStatus: null,
            jobProgress: 0,
            pendingQuizzes: [],
            message: null,
            error:
              error instanceof Error
                ? error.message
                : "Failed to initiate quiz generation",
          });
        } finally {
          set({ isLoading: false });
        }
      },

      checkJobStatus: async (jobId: string) => {
        try {
          if (useAuthStore.getState().user?.role !== "ADMIN") return;
          const { data } = await api.get(`/quiz-generation/jobs/${jobId}`);
          if (data.success) {
            const { status, progress } = data?.data;
            set({
              jobStatus: status,
              jobProgress: progress,
              message: data.message || "Job status fetched successfully",
              error: null,
            });
            if (status === "completed" || progress == 100) {
              get().getPendingQuizzes({ page: 1, limit: 10 });
            }
          }
        } catch (error) {
          set({
            jobStatus: null,
            jobProgress: 0,
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch job status",
          });
        }
      },

      getPendingQuizzes: async (filters: AdminQuizFilterDto) => {
        try {
          const authStore = useAuthStore.getState();
          if (authStore.user?.role !== "ADMIN") return;
          set({ isLoading: true, error: null });
          const { data } = await api.get("/quizzes/admin", {
            params: {
              ...filters,
              status: "DRAFT",
              createdBy: authStore?.user?.id,
            },
          });
          if (data.success) {
            set({
              message: data.message || "Pending quizzes fetched successfully",
              pendingQuizzes: data.data.data || [],
              jobStatus: "completed",
              jobProgress: 100,
              error: null,
            });
          } else {
            throw new Error(data.message || "Failed to fetch pending quizzes");
          }
        } catch (error) {
          set({
            pendingQuizzes: [],
            jobStatus: null,
            jobProgress: 0,
            error:
              error instanceof Error
                ? error.message
                : "Failed to fetch pending quizzes",
          });
        } finally {
          set({ isLoading: false });
        }
      },

      updateQuiz: async (
        quizId: number,
        input: UpdateQuizDto & { status: string }
      ) => {
        if (useAuthStore.getState().user?.role !== "ADMIN")
          throw new Error("Unauthorized");

        try {
          set({ isLoading: true, error: null });
          const { data } = await api.put(`/quizzes/admin/${quizId}`, input);
          if (!data?.success)
            throw new Error(data.message || "Failed to Update Quiz!");
          set((state: QuizGeneratorStore) => ({
            pendingQuizzes: state.pendingQuizzes.filter(
              (quiz) => quiz.id !== quizId
            ),
          }));
          if ((get().pendingQuizzes.length == 1)) {
            get().getPendingQuizzes({ page: 1, limit: 10 });
          }
          return { success: data.success, message: data.message };
        } catch (error) {
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      deleteQuiz: async (quizId: number) => {
        if (useAuthStore.getState().user?.role !== "ADMIN")
          throw new Error("Unauthorized");

        try {
          set({ isLoading: true, error: null });
          const { data } = await api.delete(`/quizzes/admin/${quizId}`);
          if (!data.success)
            throw new Error(data.message || "Failed to delete quiz");
          const updatedQuizzes = get().pendingQuizzes.filter(
            (q) => q.id !== quizId
          );
          set({
            pendingQuizzes: updatedQuizzes,
          });
          if ((get().pendingQuizzes.length == 1)) {
            get().getPendingQuizzes({ page: 1, limit: 10 });
          }
          return {
            success: true,
            message: data.message || "Quiz deleted successfully",
          };
        } catch (error) {
          return {
            success: false,
            message:
              error instanceof Error ? error.message : "Failed to delete quiz",
          };
        } finally {
          set({ isLoading: false });
        }
      },

      resetStore: () => {
        set({
          isLoading: false,
          error: null,
          jobId: null,
          jobStatus: null,
          jobProgress: 0,
          pendingQuizzes: [],
        });
      },
    }),
    {
      name: "quiz-generator-storage", // LocalStorage key
      partialize: (state) => ({
        jobId: state.jobId,
        jobStatus: state.jobStatus,
        jobProgress: state.jobProgress,
      }),
    }
  )
);

export default useQuizGeneratorStore;
function persist<T>(
  config: (
    set: (partial: T | Partial<T> | ((state: T) => T | Partial<T>)) => void,
    get: () => T
  ) => T,
  options: {
    name: string;
    partialize: (state: T) => Partial<T>;
  }
) {
  return zustandPersist(config, options);
}
