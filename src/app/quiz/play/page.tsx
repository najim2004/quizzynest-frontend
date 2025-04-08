"use client";

import { Suspense, useEffect, useState } from "react";

import useQuizStore, { DifficultyLevel } from "@/stores/quizStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useCategoryStore } from "@/stores/categoryStore";
import { toast } from "sonner";
import QuizResult from "@/components/dashboard/quiz/quiz-resutl";
import PlayQuiz from "@/components/dashboard/quiz/play-quiz";
import PrivateRoute from "@/components/private-route/private-route";

// Add type guard function at the top of the file
const isDifficultyLevel = (value: string): value is DifficultyLevel => {
  return ["EASY", "MEDIUM", "HARD"].includes(value);
};

function PlayGroundContent() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    startQuizSession,
    submitAnswer,
    sessionResult,
    currentQuiz: quiz,
    currentSession,
    timeLeft,
    tickTimer,
    resetQuiz,
    loading: quizLoading,
  } = useQuizStore();
  const { selectedCategoryId: categoryId } = useCategoryStore();
  const searchParams = useSearchParams();
  const count: number | null = parseInt(searchParams.get("count") ?? "10");
  const difficultyParam =
    searchParams.get("difficulty")?.toUpperCase() || "MEDIUM";
  const difficulty: DifficultyLevel = isDifficultyLevel(difficultyParam)
    ? difficultyParam
    : "MEDIUM";
  // Handle option selection
  const handleOptionSelect = (optionId: number) => {
    setSelectedOption(optionId);
  };

  // Handle answer submission
  const handleContinue = async () => {
    if (!selectedOption || !currentSession?.id || !quiz || loading) return;
    try {
      setLoading(true);
      await submitAnswer(
        currentSession.id,
        quiz.id,
        selectedOption,
        quiz.startTime
      );
      setSelectedOption(null); // Reset for next question
    } catch (error) {
      console.log("[Answer Submission Error]", error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  // Handle quiz close
  const handleClose = () => {
    if (confirm("Are you sure you want to close the quiz?")) {
      resetQuiz();
      setSelectedOption(null);
      setLoading(false);
      router.back();
    }
  };

  // Start quiz session
  useEffect(() => {
    const startSession = async () => {
      if (!categoryId) {
        router.back();
        return;
      }
      if (quizLoading || quiz?.id) return; // Prevent re-start if already loaded
      try {
        await startQuizSession({ categoryId, limit: count, difficulty });
      } catch (error) {
        console.error("Error starting quiz session:", error);
        toast.error("Failed to start quiz!");
        router.back();
      }
    };
    startSession();
  }, [
    categoryId,
    router,
    startQuizSession,
    quizLoading,
    quiz?.id,
    count,
    difficulty,
  ]);

  // Timer effect
  useEffect(() => {
    if (quiz?.id && currentSession?.id && !loading) {
      const timer = setInterval(() => {
        tickTimer();
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [tickTimer, quiz?.id, currentSession?.id, loading]);

  return (
    <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center p-4">
      {sessionResult ? (
        <QuizResult
          totalCoinsEarned={sessionResult.totalCoinsEarned}
          correctAnswers={sessionResult.correctAnswers}
          totalQuestions={sessionResult.totalQuestions}
          accuracy={sessionResult.accuracy}
          totalTimeSpent={sessionResult.totalTimeSpent}
          onBack={handleClose}
        />
      ) : (
        <PlayQuiz
          currentSession={currentSession}
          quiz={quiz}
          timeLeft={timeLeft}
          selectedOption={selectedOption}
          loading={loading}
          onClose={handleClose}
          onOptionSelect={handleOptionSelect}
          onContinue={handleContinue}
        />
      )}
    </div>
  );
}

function PlayGround() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      }
    >
      <PlayGroundContent />
    </Suspense>
  );
}

export default function Page() {
  return (
    <PrivateRoute roles={["USER"]}>
      <PlayGround />
    </PrivateRoute>
  );
}
