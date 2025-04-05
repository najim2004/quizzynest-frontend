import api from "@/components/axios/api";
import { create } from "zustand";
import { APIResponse } from "./authStore";
import { Category } from "./categoryStore";
interface stats {
  totalPlayedQuizzes: number;
  totalEarnedCoin: number;
  highScore: number;
  totalCorrectAnswers: number;
  rankThisMonth: number;
  successRate: number;
}
enum AchievementType {
  QUIZ_MASTER,
  HIGH_SCORER,
  STREAK_KEEPER,
  FAST_SOLVER,
  PERFECT_SCORE,
}
export interface Achievement {
  id: number;
  userId: number;
  title: string;
  description: string | null;
  type: AchievementType;
  earnedAt: Date;
}

interface Loadings {
  stats: boolean;
  achievements: boolean;
  quizHistory: boolean;
}
interface errors {
  stats: string | null;
  achievements: string | null;
  quizHistory: string | null;
}

export interface QuizHistoryResult {
  id: number;
  category: Pick<Category, "id" | "name" | "icon" | "color">;
  totalQuestions: number;
  correctAnswers: number;
  totalTimeSpent: number;
  totalCoinsEarned: number;
  accuracy: number;
  completedAt: Date;
}

interface ProfileState {
  stats: stats;
  loadings: Loadings;
  error: errors;
  achievements: Achievement[];
  quizHistory: QuizHistoryResult[];

  // Actions
  fetchUserStats: () => Promise<void>;
  fetchAchievements: () => Promise<void>;
  fetchQuizHistory: () => Promise<void>;
}

const useProfileStore = create<ProfileState>((set) => ({
  stats: {
    totalPlayedQuizzes: 0,
    totalEarnedCoin: 0,
    highScore: 0,
    totalCorrectAnswers: 0,
    rankThisMonth: 0,
    successRate: 0,
  },
  loadings: {
    stats: false,
    achievements: false,
    quizHistory: false,
  },
  error: {
    stats: null,
    achievements: null,
    quizHistory: null,
  },
  achievements: [],
  quizHistory: [],

  fetchUserStats: async () => {
    try {
      set((state) => ({
        loadings: {
          ...state.loadings,
          stats: true,
        },
      }));
      const { data } = await api.get<APIResponse<stats>>("/users/stats");
      if (data.success) set({ stats: data.data });
    } catch (error) {
      console.error("[Profile] Failed to fetch user stats:", error);
      set((state) => ({
        error: {
          ...state.error,
          stats: error instanceof Error ? error.message : "Unknown error",
        },
        stats: {
          ...state.stats,
          totalPlayedQuizzes: 0,
        },
      }));
    } finally {
      set((state) => ({
        loadings: {
          ...state.loadings,
          stats: false,
        },
      }));
    }
  },

  fetchAchievements: async () => {
    try {
      set((state) => ({
        loadings: {
          ...state.loadings,
          achievements: true,
        },
      }));
      const { data } = await api.get<APIResponse<Achievement[]>>(
        "/users/achievements"
      );
      if (data?.success) {
        set({ achievements: data?.data });
      }
    } catch (error) {
      console.error("[Profile] Failed to fetch achievements:", error);
      set((state) => ({
        error: {
          ...state.error,
          achievements:
            error instanceof Error ? error.message : "Unknown error",
        },
      }));
      set({ achievements: [] });
    } finally {
      set((state) => ({
        loadings: {
          ...state.loadings,
          achievements: false,
        },
      }));
    }
  },

  fetchQuizHistory: async () => {
    try {
      set((state) => ({
        loadings: {
          ...state.loadings,
          quizHistory: true,
        },
      }));
      const { data } = await api.get<APIResponse<QuizHistoryResult[]>>(
        "/users/quiz-history"
      );
      if (data.success) set({ quizHistory: data.data });
    } catch (error) {
      console.error("[Profile] Failed to fetch quiz history:", error);
      set((state) => ({
        error: {
          ...state.error,
          quizHistory: error instanceof Error ? error.message : "Unknown error",
        },
      }));
      set({ quizHistory: [] });
    } finally {
      set((state) => ({
        loadings: {
          ...state.loadings,
          quizHistory: false,
        },
      }));
    }
  },
}));

export default useProfileStore;
