"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import QuizHistoryCard from "@/components/dashboard/home/quiz-histories/quiz-histories-card";
import useProfileStore from "@/stores/profileStore";
import { Button } from "@/components/ui/button";
import PrivateRoute from "@/components/private-route/private-route";
const QuizHistories = () => {
  const { quizHistory } = useProfileStore();
  return (
    <div className="p-4">
      <Card className="border-none">
        <CardHeader className="justify-center flex flex-col items-center mb-8">
          <CardTitle>Quiz History</CardTitle>
          <CardDescription>All quizzes you&#39;ve taken</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {quizHistory.map((quiz) => (
              <QuizHistoryCard
                key={quiz.id}
                id={quiz.id}
                categoryName={quiz.category.name}
                completedAt={quiz.completedAt}
                totalQuestions={quiz.totalQuestions}
                correctAnswers={quiz.correctAnswers}
              />
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline">Load More</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default function Page() {
  return (
    <PrivateRoute roles={["USER"]}>
      <QuizHistories />
    </PrivateRoute>
  );
}
