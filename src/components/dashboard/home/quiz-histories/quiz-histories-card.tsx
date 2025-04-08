import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { FC } from "react";

interface QuizHistoryCardProps {
  id: number;
  categoryName: string;
  completedAt: Date;
  correctAnswers: number;
  totalQuestions: number;
}

const QuizHistoryCard: FC<QuizHistoryCardProps> = ({
  id,
  categoryName,
  completedAt,
  correctAnswers,
  totalQuestions,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
      <div>
        <p className="font-medium">{categoryName}</p>
        <p className="text-sm text-muted-foreground">
          {new Date(completedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-bold">
            {correctAnswers}/{totalQuestions}
          </p>
          <p className="text-sm text-muted-foreground">
            {Math.round((correctAnswers / totalQuestions) * 100)}%
          </p>
        </div>
        <Link href={`/quiz/results/${id}`}>
          <Button variant="outline" size="sm">
            View Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default QuizHistoryCard;
