import { create } from "zustand";
import { persist, createJSONStorage, devtools } from "zustand/middleware";
import { AxiosError } from "axios";
import { APIResponse } from "./authStore";
import api from "@/components/axios/api";

// Quiz-সম্পর্কিত টাইপ (quiz.service.ts এবং প্রিজমা স্কিমা থেকে)
interface Quiz {
  id: number;
  question: string;
  timeLimit: number;
  maxPrice: number;
  description?: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  categoryId: number;
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
  answers: Answer[];
  currentQuizIndex: number; // ব্যাকএন্ড থেকে আসে
  nextQuizId: number | null; // ব্যাকএন্ড থেকে আসে
  previousQuizId: number | null; // ব্যাকএন্ড থেকে আসে
}

interface Answer {
  id: number;
  text: string;
  isCorrect: boolean;
  quizId: number;
}

interface QuizSession {
  id: number;
  userId: number;
  selectedQuizzes: Quiz[]; // ফেচ করা কুইজগুলোর ক্যাশ
  startedAt: Date;
  completedAt?: Date;
  status: "IN_PROGRESS" | "COMPLETED" | "ABANDONED";
  totalQuestions: number;
  answeredCount: number;
}

interface QuizResult {
  id: number;
  userId: number;
  totalQuestions: number;
  correctAnswers: number;
  totalTimeSpent: number;
  totalCoinsEarned: number;
  accuracy: number;
  completedAt: Date;
}

interface QuizAnswerResponse {
  correct: boolean;
  earnedCoins: number;
  timeTaken: number;
}

interface ApiError {
  message: string;
  statusCode: number;
}

interface CreateQuizInput {
  question: string;
  timeLimit: number;
  maxPrize: number;
  description?: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  categoryId: number;
  answers: { text: string; isCorrect: boolean }[];
}

interface UpdateQuizInput {
  question?: string;
  timeLimit?: number;
  maxPrice?: number;
  description?: string;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  categoryId?: number;
  answers?: { text: string; isCorrect: boolean }[];
}

interface QuizFilterDto {
  limit?: number;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  categoryId?: number;
}

interface AdminQuizFilterDto {
  page?: number;
  limit?: number;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  categoryId?: number;
  search?: string;
  createdBy?: number;
}

// Quiz Store-এর স্টেট এবং অ্যাকশন
interface QuizState {
  quizzes: Quiz[];
  currentSession: QuizSession | null;
  currentQuiz: Quiz | null;
  timeLeft: number;
  answers: Answer[];
  selectedAnswerId: number | null;
  sessionResult: QuizResult | null;
  loading: boolean;
  error: string | null;

  // ইউজার অ্যাকশন
  startQuizSession: (filters: QuizFilterDto) => Promise<void>;
  getNextQuiz: (sessionId: number, nextQuizId: number | null) => Promise<void>;
  getPreviousQuiz: (
    sessionId: number,
    previousQuizId: number | null
  ) => Promise<void>;
  submitAnswer: (
    sessionId: number,
    quizId: number,
    answerId: number
  ) => Promise<void>;
  createQuizResult: (sessionId: number) => Promise<void>;
  getQuizById: (quizId: number) => Promise<void>;

  // অ্যাডমিন অ্যাকশন
  getQuizzesForAdmin: (filters: AdminQuizFilterDto) => Promise<void>;
  createQuiz: (input: CreateQuizInput) => Promise<APIResponse<Quiz>>;
  updateQuiz: (quizId: number, input: UpdateQuizInput) => Promise<void>;
  deleteQuiz: (quizId: number) => Promise<void>;

  // ইউটিলিটি
  resetQuiz: () => void;
  tickTimer: () => void;
  clearError: () => void;
}

// Quiz Store
export const useQuizStore = create<QuizState>()(
  devtools(
    persist(
      (set, get) => ({
        quizzes: [],
        currentSession: null,
        currentQuiz: null,
        timeLeft: 0,
        answers: [],
        selectedAnswerId: null,
        sessionResult: null,
        loading: false,
        error: null,

        // ইউজার: কুইজ সেশন শুরু
        startQuizSession: async (filters: QuizFilterDto) => {
          try {
            set({ loading: true, error: null });
            const response = await api.get("/quiz/", { params: filters });
            const { sessionId, currentQuiz, totalQuizzes } = response.data;
            const session: QuizSession = {
              id: sessionId,
              userId: 0, // userId ব্যাকএন্ড থেকে আসবে
              selectedQuizzes: [currentQuiz], // প্রথম কুইজ ক্যাশে রাখা
              startedAt: new Date(),
              status: "IN_PROGRESS",
              totalQuestions: totalQuizzes,
              answeredCount: 0,
            };
            set({
              currentSession: session,
              currentQuiz: currentQuiz,
              timeLeft: currentQuiz.timeLimit,
              answers: currentQuiz.answers,
              loading: false,
            });
          } catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            set({
              loading: false,
              error:
                axiosError.response?.data?.message ||
                "Failed to start quiz session",
            });
            throw error;
          }
        },

        // ইউজার: পরবর্তী কুইজ ফেচ
        getNextQuiz: async (sessionId: number, nextQuizId: number | null) => {
          const { currentSession, currentQuiz } = get();
          if (
            !currentSession ||
            currentSession.answeredCount >= currentSession.totalQuestions ||
            !nextQuizId
          ) {
            await get().createQuizResult(sessionId);
            return;
          }

          // selectedQuizzes-এ nextQuizId আছে কিনা চেক
          const cachedQuiz = currentSession.selectedQuizzes.find(
            (q) => q.id === nextQuizId
          );
          if (cachedQuiz) {
            set({
              currentQuiz: cachedQuiz,
              timeLeft: cachedQuiz.timeLimit,
              answers: cachedQuiz.answers,
              selectedAnswerId: null,
            });
            return;
          }

          // API থেকে ফেচ করা
          try {
            set({ loading: true, error: null });
            const response = await api.get("/quiz/next", {
              params: { sessionId, currentQuizId: currentQuiz?.id },
            });
            const { currentQuiz: fetchedQuiz } = response.data || {};
            if (!fetchedQuiz) {
              await get().createQuizResult(sessionId);
              return;
            }
            set({
              currentQuiz: fetchedQuiz,
              timeLeft: fetchedQuiz.timeLimit,
              answers: fetchedQuiz.answers,
              selectedAnswerId: null,
              currentSession: {
                ...currentSession,
                selectedQuizzes: [
                  ...currentSession.selectedQuizzes,
                  fetchedQuiz,
                ],
              },
              loading: false,
            });
          } catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            set({
              loading: false,
              error:
                axiosError.response?.data?.message ||
                "Failed to fetch next quiz",
            });
            throw error;
          }
        },

        // ইউজার: পূর্ববর্তী কুইজ ফেচ
        getPreviousQuiz: async (
          sessionId: number,
          previousQuizId: number | null
        ) => {
          if (!previousQuizId) return;

          const { currentSession } = get();
          if (!currentSession) return;

          // selectedQuizzes-এ previousQuizId আছে কিনা চেক
          const cachedQuiz = currentSession.selectedQuizzes.find(
            (q) => q.id === previousQuizId
          );
          if (cachedQuiz) {
            set({
              currentQuiz: cachedQuiz,
              timeLeft: cachedQuiz.timeLimit,
              answers: cachedQuiz.answers,
              selectedAnswerId: null,
            });
            return;
          }

          // API থেকে ফেচ করা
          try {
            set({ loading: true, error: null });
            const response = await api.get(`/quiz/${previousQuizId}`);
            const fetchedQuiz = response.data;
            set({
              currentQuiz: fetchedQuiz,
              timeLeft: fetchedQuiz.timeLimit,
              answers: fetchedQuiz.answers,
              selectedAnswerId: null,
              currentSession: {
                ...currentSession,
                selectedQuizzes: [
                  ...currentSession.selectedQuizzes,
                  fetchedQuiz,
                ],
              },
              loading: false,
            });
          } catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            set({
              loading: false,
              error:
                axiosError.response?.data?.message ||
                "Failed to fetch previous quiz",
            });
            throw error;
          }
        },

        // ইউজার: উত্তর সাবমিট
        submitAnswer: async (
          sessionId: number,
          quizId: number,
          answerId: number
        ) => {
          const { currentSession } = get();
          if (!currentSession) return;

          try {
            set({ loading: true, error: null });
            const response = await api.post("/quiz/submit", {
              sessionId,
              quizId,
              answerId,
            });
            const result: QuizAnswerResponse = response.data;
            set({
              selectedAnswerId: answerId,
              currentSession: {
                ...currentSession,
                answeredCount: currentSession.answeredCount + 1,
              },
              loading: false,
            });
            await get().getNextQuiz(
              sessionId,
              currentSession.selectedQuizzes.find((q) => q.id === quizId)
                ?.nextQuizId || null
            );
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

        // ইউজার: কুইজ রেজাল্ট তৈরি
        createQuizResult: async (sessionId: number) => {
          const { currentSession } = get();
          if (!currentSession) return;

          try {
            set({ loading: true, error: null });
            const response = await api.post("/quiz/create-quiz-result", {
              sessionId,
            });
            set({
              sessionResult: response.data,
              currentSession: {
                ...currentSession,
                status: "COMPLETED",
                completedAt: new Date(),
              },
              currentQuiz: null,
              timeLeft: 0,
              answers: [],
              selectedAnswerId: null,
              loading: false,
            });
          } catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            set({
              loading: false,
              error:
                axiosError.response?.data?.message ||
                "Failed to create quiz result",
            });
            throw error;
          }
        },

        // ইউজার/পাবলিক: কুইজ ফেচ বাই আইডি
        getQuizById: async (quizId: number) => {
          try {
            set({ loading: true, error: null });
            const response = await api.get(`/quizzes/${quizId}`);
            set({
              currentQuiz: response.data,
              timeLeft: response.data.timeLimit,
              answers: response.data.answers,
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

        // অ্যাডমিন: সব কুইজ ফেচ
        getQuizzesForAdmin: async (filters: AdminQuizFilterDto) => {
          try {
            set({ loading: true, error: null });
            const response = await api.get("/quiz/admin", {
              params: filters,
            });
            set({ quizzes: response.data.data, loading: false });
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

        // অ্যাডমিন: কুইজ তৈরি
        createQuiz: async (input: CreateQuizInput) => {
          try {
            set({ loading: true, error: null });
            const { data } = await api.post<APIResponse<Quiz>>(
              "/quizzes/admin",
              input
            );
            if (!data.success)
              throw new Error(data.message || "Failed to create quiz");

            set({
              quizzes: [...get().quizzes, data.data],
              loading: false,
            });
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

        // অ্যাডমিন: কুইজ আপডেট
        updateQuiz: async (quizId: number, input: UpdateQuizInput) => {
          try {
            set({ loading: true, error: null });
            const response = await api.put(`/quiz/admin/${quizId}`, input);
            set({
              quizzes: get().quizzes.map((q) =>
                q.id === quizId ? response.data : q
              ),
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

        // অ্যাডমিন: কুইজ ডিলিট
        deleteQuiz: async (quizId: number) => {
          try {
            set({ loading: true, error: null });
            await api.delete(`/quiz/admin/${quizId}`);
            set({
              quizzes: get().quizzes.filter((q) => q.id !== quizId),
              loading: false,
            });
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

        // ইউটিলিটি: রিসেট
        resetQuiz: () => {
          set({
            quizzes: [],
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

        // ইউটিলিটি: টাইমার টিক
        tickTimer: () => {
          const { timeLeft, currentSession, currentQuiz } = get();
          if (timeLeft > 0) {
            set({ timeLeft: timeLeft - 1 });
          } else if (currentSession && currentQuiz) {
            get().getNextQuiz(currentSession.id, currentQuiz.nextQuizId); // টাইম আউট হলে পরবর্তী প্রশ্ন
          }
        },

        // ইউটিলিটি: এরর ক্লিয়ার
        clearError: () => set({ error: null }),
      }),
      {
        name: "quiz-storage",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          currentSession: state.currentSession,
          sessionResult: state.sessionResult,
        }),
      }
    )
  )
);

export default useQuizStore;
