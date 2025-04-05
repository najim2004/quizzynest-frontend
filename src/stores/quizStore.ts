import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { AxiosError } from "axios";
import useAuthStore, { APIResponse } from "./authStore";
import api from "@/components/axios/api";
import { useCategoryStore } from "./categoryStore";
import useProfileStore from "./profileStore";

// ফ্রন্টএন্ডের জন্য টাইপ ডিফিনিশন
export interface ClientQuiz {
  id: number;
  question: string;
  timeLimit?: number; // অপশনাল
  maxPrize?: number; // অপশনাল
  description?: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  categoryId: number;
  answers: {
    id: number;
    label: "A" | "B" | "C" | "D";
    text: string;
    isCorrect?: boolean;
  }[];
  currentQuizIndex: number;
  startTime: string; // এনক্রিপ্টেড
}

export interface QuizAnswerResponse {
  correct: boolean;
  earnedCoins: number;
  timeTaken: number;
}

export interface SubmitQuizAnswerResponse {
  answerResponse: QuizAnswerResponse;
  nextQuiz: ClientQuiz | null;
  result?: QuizResult;
}

export interface QuizFilterDto {
  limit?: number;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  categoryId?: number;
}

export interface AdminQuizFilterDto {
  page?: number;
  limit?: number;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  categoryId?: number;
  search?: string;
  createdBy?: number;
}

export interface CreateQuizDto {
  question: string;
  timeLimit?: number;
  maxPrize?: number;
  description?: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  categoryId: number;
  answers: { label: "A" | "B" | "C" | "D"; text: string; isCorrect: boolean }[];
}

export interface UpdateQuizDto {
  question?: string;
  timeLimit?: number;
  maxPrize?: number;
  description?: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  categoryId?: number;
  answers?: {
    label: "A" | "B" | "C" | "D";
    text: string;
    isCorrect: boolean;
  }[];
}

export interface QuizResult {
  id: number;
  userId: number;
  totalQuestions: number;
  correctAnswers: number;
  totalTimeSpent: number;
  totalCoinsEarned: number;
  accuracy: number;
  completedAt: string;
}

interface QuizSession {
  id: number;
  userId: number;
  selectedQuizzes: ClientQuiz[];
  startedAt: Date;
  completedAt?: Date;
  status: "IN_PROGRESS" | "COMPLETED" | "ABANDONED";
  totalQuestions: number;
  answeredCount: number;
}

interface ApiError {
  message: string;
  statusCode: number;
}

interface QuizState {
  isQuizStarted: boolean;
  quizzes: ClientQuiz[];
  currentSession: QuizSession | null;
  currentQuiz: ClientQuiz | null;
  timeLeft: number;
  answers: ClientQuiz["answers"];
  selectedAnswerId: number | null;
  sessionResult: QuizResult | null;
  loading: boolean;
  error: string | null;

  startQuizSession: (filters: QuizFilterDto) => Promise<void>;
  setIsQuizStarted: (isStarted: boolean) => void;
  submitAnswer: (
    sessionId: number,
    quizId: number,
    answerId: number | null,
    startTime: string
  ) => Promise<QuizAnswerResponse>;
  getQuizById: (quizId: number) => Promise<void>;
  getQuizzesForAdmin: (filters: AdminQuizFilterDto) => Promise<void>;
  createQuiz: (input: CreateQuizDto) => Promise<APIResponse<ClientQuiz>>;
  updateQuiz: (quizId: number, input: UpdateQuizDto) => Promise<void>;
  deleteQuiz: (
    quizId: number
  ) => Promise<{ success: boolean; message: string }>;
  resetQuiz: () => void;
  tickTimer: () => void;
  clearError: () => void;
}

export const useQuizStore = create<QuizState>()(
  devtools(
    persist(
      (set, get) => ({
        isQuizStarted: false,
        quizzes: [],
        currentSession: null,
        currentQuiz: null,
        timeLeft: 0,
        answers: [],
        selectedAnswerId: null,
        sessionResult: null,
        loading: false,
        error: null,

        startQuizSession: async (filters: QuizFilterDto) => {
          if (get().isQuizStarted || get().loading) return;
          try {
            set({ loading: true, error: null });
            get().setIsQuizStarted(true);
            const { data: response } = await api.get("/quizzes/start", {
              params: filters,
            });
            if (!response.success)
              throw new Error(
                response.message || "Failed to start quiz session"
              );
            const { sessionId, currentQuiz, totalQuizzes } = response.data;
            const session: QuizSession = {
              id: sessionId,
              userId: useAuthStore.getState().user?.id || 0,
              selectedQuizzes: [currentQuiz],
              startedAt: new Date(),
              status: "IN_PROGRESS",
              totalQuestions: totalQuizzes,
              answeredCount: 0,
            };
            set({
              currentSession: session,
              currentQuiz,
              timeLeft: currentQuiz.timeLimit || 0,
              answers: currentQuiz.answers,
              loading: false,
            });
          } catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            get().setIsQuizStarted(false);
            set({
              loading: false,
              error:
                axiosError.response?.data?.message ||
                "Failed to start quiz session",
            });
            throw error;
          }
        },

        submitAnswer: async (
          sessionId: number,
          quizId: number,
          answerId: number | null,
          startTime: string
        ) => {
          const { currentSession } = get();
          if (!currentSession) throw new Error("No active session");

          try {
            set({ loading: true, error: null });
            const {
              data: {
                success,
                data: { answerResponse, nextQuiz, result },
                message,
              },
            }: { data: APIResponse<SubmitQuizAnswerResponse> } = await api.post(
              "/quizzes/submit",
              { sessionId, quizId, answerId, encryptedStartTime: startTime }
            );
            if (!success) throw new Error(message || "Failed to submit answer");
            set({
              selectedAnswerId: answerId,
              currentSession: {
                ...currentSession,
                answeredCount: currentSession.answeredCount + 1,
                ...(result && {
                  status: "COMPLETED",
                  completedAt: new Date(result.completedAt),
                }),
              },
              currentQuiz: nextQuiz || null,
              timeLeft: nextQuiz?.timeLimit || 0,
              answers: nextQuiz?.answers || [],
              sessionResult: result || null,
              loading: false,
            });
            if (result?.id) {
              const profileState = useProfileStore.getState();
              profileState.fetchAchievements();
              profileState.fetchUserStats();
              profileState.fetchQuizHistory();
            }
            return answerResponse;
          } catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            set({
              loading: false,
              error:
                axiosError.response?.data?.message || "Failed to submit answer",
            });
            throw error;
          }
        },

        getQuizById: async (quizId: number) => {
          try {
            set({ loading: true, error: null });
            const { data } = await api.get(`/quizzes/${quizId}`);
            set({
              currentQuiz: data,
              timeLeft: data.timeLimit || 0,
              answers: data.answers,
              loading: false,
            });
          } catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            set({
              loading: false,
              error:
                axiosError.response?.data?.message || "Failed to fetch quiz",
            });
            throw error;
          }
        },

        getQuizzesForAdmin: async (filters: AdminQuizFilterDto) => {
          if (useAuthStore.getState().user?.role !== "ADMIN") return;

          try {
            set({ loading: true, error: null });
            const { data } = await api.get("/quizzes/admin", {
              params: filters,
            });
            set({ quizzes: data.data.data, loading: false });
          } catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            set({
              loading: false,
              error:
                axiosError.response?.data?.message ||
                "Failed to fetch quizzes for admin",
            });
            throw error;
          }
        },

        createQuiz: async (input: CreateQuizDto) => {
          if (useAuthStore.getState().user?.role !== "ADMIN")
            throw new Error("Unauthorized");

          try {
            set({ loading: true, error: null });
            const { data } = await api.post<APIResponse<ClientQuiz>>(
              "/quizzes/admin",
              input
            );
            if (!data.success)
              throw new Error(data.message || "Failed to create quiz");
            set({ quizzes: [data.data, ...get().quizzes], loading: false });
            return data;
          } catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            set({
              loading: false,
              error:
                axiosError.response?.data?.message || "Failed to create quiz",
            });
            throw error;
          }
        },

        updateQuiz: async (quizId: number, input: UpdateQuizDto) => {
          if (useAuthStore.getState().user?.role !== "ADMIN")
            throw new Error("Unauthorized");

          try {
            set({ loading: true, error: null });
            const { data } = await api.put(`/quizzes/admin/${quizId}`, input);
            set({
              quizzes: get().quizzes.map((q) => (q.id === quizId ? data : q)),
              loading: false,
            });
          } catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            set({
              loading: false,
              error:
                axiosError.response?.data?.message || "Failed to update quiz",
            });
            throw error;
          }
        },

        deleteQuiz: async (quizId: number) => {
          if (useAuthStore.getState().user?.role !== "ADMIN")
            throw new Error("Unauthorized");

          try {
            set({ loading: true, error: null });
            const { data } = await api.delete(`/quizzes/admin/${quizId}`);
            if (!data.success)
              throw new Error(data.message || "Failed to delete quiz");
            set({
              quizzes: get().quizzes.filter((q) => q.id !== quizId),
              loading: false,
            });
            return { success: true, message: data.message };
          } catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            set({
              loading: false,
              error:
                axiosError.response?.data?.message || "Failed to delete quiz",
            });
            throw error;
          }
        },

        resetQuiz: () => {
          useCategoryStore.getState().setSelectedCategoryId(null);
          set({
            isQuizStarted: false,
            currentSession: null,
            currentQuiz: null,
            timeLeft: 0,
            answers: [],
            selectedAnswerId: null,
            sessionResult: null,
            loading: false,
            error: null,
          });
        },

        setIsQuizStarted: (isStarted: boolean) =>
          set({ isQuizStarted: isStarted }),

        tickTimer: () => {
          const { timeLeft, currentSession, currentQuiz } = get();
          if (timeLeft > 0) {
            set({ timeLeft: timeLeft - 1 });
          } else if (currentSession && currentQuiz) {
            get().submitAnswer(
              currentSession.id,
              currentQuiz.id,
              null,
              currentQuiz.startTime
            );
          }
        },

        clearError: () => set({ error: null }),
      }),
      {
        name: "quiz-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          currentSession: state.currentSession,
        }),
      }
    )
  )
);

export default useQuizStore;
