"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import useQuizStore from "@/stores/quizStore";
import { useRouter } from "next/navigation";
import { useCategoryStore } from "@/stores/categoryStore";
import { toast } from "sonner";

export default function QuizBoard() {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const {
    startQuizSession,
    submitAnswer,
    currentQuiz: quiz,
    currentSession,
    timeLeft,
    tickTimer,
    resetQuiz,
    loading: quizLoading,
  } = useQuizStore();
  const { selectedCategoryId: categoryId } = useCategoryStore();
  const handleOptionSelect = (optionId: number) => {
    setSelectedOption(optionId);
  };

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
    } catch (error) {
      console.log("[Answer Submission Error]", error);
      toast.error(
        error instanceof Error ? error.message : "Something went wrong!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (confirm("Are you sure you want to close the quiz?")) {
      resetQuiz();
      setSelectedOption(null);
      setLoading(false);
      toast.success("Quiz closed successfully.");
      router.back();
    }
  };

  useEffect(() => {
    const startSession = async () => {
      if (!categoryId) {
        router.back();
        return;
      }
      try {
        if (quizLoading) return;
        await startQuizSession({ categoryId });
      } catch (error) {
        console.error("Error starting quiz session:", error);
        router.back();
      }
    };

    startSession();
  }, [categoryId, router, startQuizSession, quizLoading]);

  useEffect(() => {
    if (quiz?.id && currentSession?.id && categoryId && !loading) {
      const timer = setInterval(() => {
        tickTimer();
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [tickTimer, quiz?.id, currentSession?.id, categoryId, loading]);

  return (
    <div className="fixed inset-0 bg-gray-50">
      <Card className="container max-w-4xl mx-auto h-full flex flex-col border-none rounded-none shadow-none bg-transparent">
        <CardHeader className="bg-gradient-to-r from-[#6C5CE7] to-[#4834D4] p-6 pb-0 rounded-[60px]">
          <div className="flex items-center justify-between text-white mb-8">
            <span className="font-medium">Points: 0</span>
            <h1 className="text-lg font-medium">Quiz</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="text-white hover:bg-transparent hover:text-white"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="text-center mb-12 text-white">
            <div className="mx-auto mb-6 size-24 border-4 rounded-full flex items-center justify-center">
              {timeLeft}
            </div>
            <h2 className="text-xl font-medium px-8">{quiz?.question}</h2>
          </div>
        </CardHeader>

        <CardContent className="p-6 flex-grow flex items-center">
          <div className="w-full max-w-2xl mx-auto space-y-4">
            {quiz?.answers?.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                onClick={() => handleOptionSelect(option.id)}
                className={cn(
                  "w-full h-14 flex items-center justify-start px-4 bg-white hover:bg-gradient-to-r from-[#6C5CE7] to-[#4834D4] group",
                  selectedOption === option.id &&
                    "bg-gradient-to-r from-[#6C5CE7] to-[#4834D4]"
                )}
              >
                <span className="text-sm font-medium bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center mr-4">
                  {option.label}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium group-hover:text-white",
                    selectedOption === option.id && "text-white"
                  )}
                >
                  {option.text}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Progress
              indicatorClassName="bg-gradient-to-r from-[#6C5CE7] to-[#4834D4]"
              value={
                (((quiz?.currentQuizIndex ?? 0) + 1) /
                  (currentSession?.totalQuestions ?? 1)) *
                100
              }
              className="h-2 w-32"
            />
            <span className="text-sm text-neutral-600">
              {(quiz?.currentQuizIndex ?? 0) + 1} /{" "}
              {currentSession?.totalQuestions ?? 0}
            </span>
          </div>
          <Button
            onClick={handleContinue}
            disabled={!selectedOption || loading}
            className="bg-gradient-to-r from-[#6C5CE7] to-[#4834D4] text-white px-8 ml-auto"
          >
            {loading ? "submitting..." : "Continue"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
