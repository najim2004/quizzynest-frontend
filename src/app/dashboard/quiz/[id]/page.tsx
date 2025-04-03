"use client";

import { useState } from "react";
import { X, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

interface QuizOption {
  id: string;
  label: string;
}

export default function QuizBoard() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const router = useRouter();

  const quizData = {
    id: 1,
    question: "What is the capital of Bangladesh?",
    options: [
      { id: "A", label: "Dhaka" },
      { id: "B", label: "Chittagong" },
      { id: "C", label: "Sylhet" },
      { id: "D", label: "Rajshahi" },
    ],
    currentStep: 1,
    totalSteps: 10,
    timeLimit: 30,
    points: 100,
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleContinue = () => {
    if (!selectedOption) return;
    // Handle submission logic here
  };

  const handleClose = () => {
    if (confirm("Are you sure you want to close the quiz?")) {
      router.back();
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-50">
      <Card className="container max-w-4xl mx-auto h-full flex flex-col border-none rounded-none shadow-none bg-transparent pt-0">
        <CardHeader className="bg-gradient-to-r from-[#6C5CE7] to-[#4834D4] p-6 pb-0 rounded-b-[60px]">
          <div className="flex items-center justify-between text-white mb-8">
            <span className="font-medium">Points: {quizData.points}</span>
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
              <Timer className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-medium px-8">{quizData.question}</h2>
          </div>
        </CardHeader>

        <CardContent className="p-6 flex-grow flex items-center">
          <div className="w-full max-w-2xl mx-auto space-y-4">
            {quizData.options.map((option) => (
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
                  {option.id}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium group-hover:text-white",
                    selectedOption === option.id && "text-white"
                  )}
                >
                  {option.label}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>

        <CardFooter className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Progress
              indicatorClassName="bg-gradient-to-r from-[#6C5CE7] to-[#4834D4]"
              value={(quizData.currentStep / quizData.totalSteps) * 100}
              className="h-2 w-32"
            />
            <span className="text-sm text-neutral-600">
              {quizData.currentStep}/{quizData.totalSteps}
            </span>
          </div>
          <Button
            onClick={handleContinue}
            disabled={!selectedOption}
            className="bg-gradient-to-r from-[#6C5CE7] to-[#4834D4] text-white px-8"
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
