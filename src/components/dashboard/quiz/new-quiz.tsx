"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRight, Clock, BarChart3 } from "lucide-react";
import { useCategoryStore } from "@/stores/categoryStore";

export default function NewQuizPage({
  categoryId,
}: {
  categoryId: number | null;
}) {
  const router = useRouter();

  const [selectedDifficulty, setSelectedDifficulty] = useState("medium");
  const [selectedQuestionCount, setSelectedQuestionCount] = useState(10);
  const [selectedTimeLimit, setSelectedTimeLimit] = useState(30);
  const { selectedCategoryId, setSelectedCategoryId } = useCategoryStore();

  const difficulties = [
    {
      id: "easy",
      name: "Easy",
      description: "Basic language concepts and syntax",
      isAvailable: true,
    },
    {
      id: "medium",
      name: "Medium",
      description: "Intermediate programming challenges",
      isAvailable: true,
    },
    {
      id: "hard",
      name: "Hard",
      description: "Advanced concepts and problem-solving",
      isAvailable: true,
    },
    {
      id: "adaptive",
      name: "Adaptive",
      description: "Not Available Yet",
      isAvailable: false,
    },
  ];

  const questionCounts = [5, 10, 15, 20];
  const timeLimits = [30, 60, 90, 120, 0];

  const startQuiz = () => {
    if (!selectedCategoryId && categoryId) setSelectedCategoryId(categoryId);

    router.push(`/dashboard/quiz/play?difficulty=${selectedDifficulty}&count=${selectedQuestionCount}`);
  };

  return (
    <main className="flex-1 py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-center">
            Create Your Quiz
          </h1>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Select Difficulty</CardTitle>
              <CardDescription>
                Choose how challenging you want your quiz to be
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {difficulties.map((difficulty) => (
                  <Button
                    key={difficulty.id}
                    disabled={!difficulty.isAvailable}
                    variant={
                      selectedDifficulty === difficulty.id
                        ? "default"
                        : "outline"
                    }
                    className="h-auto py-4 flex flex-col gap-2 justify-start items-start text-left"
                    onClick={() => setSelectedDifficulty(difficulty.id)}
                  >
                    <span className="font-bold">{difficulty.name}</span>
                    <span className="text-xs font-normal text-wrap">
                      {difficulty.description}
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Number of Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {questionCounts.map((count) => (
                    <Button
                      key={count}
                      variant={
                        selectedQuestionCount === count ? "default" : "outline"
                      }
                      onClick={() => setSelectedQuestionCount(count)}
                    >
                      {count}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Time Limit (seconds){" "}
                  <span className="text-xs">(Not Available Yet)</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {timeLimits.map((time) => (
                    <Button
                      key={time}
                      disabled
                      variant={
                        selectedTimeLimit === time ? "default" : "outline"
                      }
                      onClick={() => setSelectedTimeLimit(time)}
                    >
                      {time === 0 ? "No Limit" : time}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center">
            <Button size="lg" className="gap-2" onClick={startQuiz}>
              Start Quiz
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
