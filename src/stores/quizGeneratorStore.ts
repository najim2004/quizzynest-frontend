import api from "@/components/axios/api";
import { create } from "zustand";
import { AdminQuizFilterDto, ClientQuiz } from "./quizStore";

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
}

const useQuizGeneratorStore = create<QuizGeneratorStore>((set, get) => ({
  isLoading: true,
  message: null,
  error: null,
  jobId: null,
  jobStatus: null,
  jobProgress: 0,
  pendingQuizzes: [],

  // Actions
  initiateQuizGeneration: async (files) => {
    set({ isLoading: true, error: null });
    try {
      if (get().pendingQuizzes.length > 0) {
        throw new Error(
          "You have pending quizzes. Please resolve them before uploading new files."
        );
      }
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));

      const { data } = await api.post("/quiz-generation/generate", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        set({
          jobId: data.data.jobId,
          message: data.message || "Quiz generation initiated successfully",
          error: null,
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

  checkJobStatus: async (jobId) => {
    try {
      const { data } = await api.get(`/quiz-generation/jobs/${jobId}`);
      if (data.success) {
        const { status, progress } = data?.data;
        set({
          jobStatus: status,
          jobProgress: progress,
          message: data.message || "Job status fetched successfully",
          error: null,
        });
      }
    } catch (error) {
      set({
        jobStatus: null,
        jobProgress: 0,
        error:
          error instanceof Error ? error.message : "Failed to fetch job status",
      });
    }
  },
  getPendingQuizzes: async (filters: AdminQuizFilterDto) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await api.get("/quizzes/admin", {
        params: { ...filters, status: "DRAFT" },
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
}));

export default useQuizGeneratorStore;
