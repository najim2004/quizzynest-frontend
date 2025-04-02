"use client";

import { useState } from "react";
import { X, Circle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Option = {
  id: string;
  label: string;
  value: string;
  percentage: string;
  isPositive: boolean;
};

export default function QuizBoard() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const quizData = {
    id: 156,
    question: "PREDICT THE TOP LOSER (for tomorrow) across these indices",
    options: [
      {
        id: "A",
        label: "NIFTY50",
        value: "₹17,356",
        percentage: "-0.31%",
        isPositive: false,
      },
      {
        id: "B",
        label: "NIFTYNEXT50",
        value: "₹56,226",
        percentage: "-0.31%",
        isPositive: false,
      },
      {
        id: "C",
        label: "NIFTYBANK",
        value: "₹17,356",
        percentage: "+2.12%",
        isPositive: true,
      },
    ],
    currentStep: 1,
    totalSteps: 5,
    points: 200,
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  return (
    <Card className="w-full h-full bg-neutral-50 flex justify-center items-center rounded-none shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-0">
        <div className="flex items-center">
          <Circle className="h-5 w-5 fill-blue-600 text-white mr-1" />
          <span className="text-sm font-medium">{quizData.points}</span>
        </div>
        <div className="text-center font-medium">
          Fantasy Quiz #{quizData.id}
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>

      <CardContent className="p-6 pt-10">
        <div className="text-center mb-8">
          <h2 className="text-lg font-bold text-blue-900 uppercase">
            {quizData.question}
          </h2>
        </div>

        <div className="space-y-3">
          {quizData.options.map((option) => (
            <button
              key={option.id}
              onClick={() => handleOptionSelect(option.id)}
              className={cn(
                "w-full flex items-center justify-between p-4 bg-white rounded-md border border-neutral-200 hover:border-neutral-300 transition-colors",
                selectedOption === option.id && "border-blue-500"
              )}
            >
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium">{option.id}</span>
                <span className="text-sm font-medium">{option.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">{option.value}</span>
                <span
                  className={cn(
                    "text-sm font-medium",
                    option.isPositive ? "text-green-500" : "text-red-500"
                  )}
                >
                  {option.percentage}
                </span>
              </div>
            </button>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-8 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-8 bg-green-400 rounded-full"></div>
          <span className="text-xs text-neutral-500">
            {quizData.currentStep}/{quizData.totalSteps}
          </span>
        </div>
        <Button className="bg-neutral-300 hover:bg-neutral-400 text-neutral-700 rounded-md px-6">
          CONTINUE
        </Button>
      </CardFooter>
    </Card>
  );
}
