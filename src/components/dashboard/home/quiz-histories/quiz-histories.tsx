import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { QuizHistoryResult } from "@/stores/profileStore";
import { Clock, CheckCircle2, Coins } from "lucide-react";
import Link from "next/link";

const StatusBadge = () => {
  return (
    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
      <CheckCircle2 className="w-3 h-3" />
      <span className="sr-only">Completed</span>
    </Badge>
  );
};

export default function PlayedQuizzesHistory({
  quizHistory = [],
}: {
  quizHistory?: QuizHistoryResult[];
}) {
  return (
    <div className="w-full bg-white p-6 border border-gray-100 rounded-xl shadow-sm flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-medium">Quiz Histories</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-auto">
        {quizHistory?.map((quiz) => (
          <QuizHistoryItem key={quiz.id} quiz={quiz} />
        ))}
      </div>
      <Separator className="my-2" />

      <div className="text-center">
        <Link href="/history" className="text-gray-400 text-sm">
          View all
        </Link>
      </div>
    </div>
  );
}

function QuizHistoryItem({ quiz }: { quiz: QuizHistoryResult }) {
  // Convert totalTimeSpent (in seconds) to readable format
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <Avatar
          className="h-8 w-8 rounded-sm p-1.5"
          style={{ backgroundColor: `${quiz.category.color}` }}
        >
          <AvatarImage
            src={
              quiz.category.icon ||
              "https://www.svgrepo.com/show/445599/category.svg"
            }
            alt={`${quiz.category?.name}'s avatar`}
          />
          <AvatarFallback
            className="dark:bg-gray-800 dark:text-gray-200"
            style={{ backgroundColor: `${quiz.category.color}` }}
          >
            {quiz.category.name?.charAt(0)?.toUpperCase() || "CG"}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-base text-nowrap">
              {quiz.category.name}
            </h3>
            <div className="max-w-36 flex items-center gap-4">
              <Progress
                value={(quiz.correctAnswers / quiz.totalQuestions) * 100}
                className="h-1.5 max-w-full min-w-20"
                indicatorStyle={{
                  background: `linear-gradient(to right, ${quiz.category.color}40, ${quiz.category.color})`,
                  border: "none",
                }}
              />
              <p>
                {((quiz.correctAnswers / quiz.totalQuestions) * 100).toFixed(1)}
                %
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Coins className="w-3.5 h-3.5" />
              <span>{quiz.totalCoinsEarned}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatTime(quiz.totalTimeSpent)}</span>
            </div>
            <StatusBadge />
          </div>
        </div>
      </div>
    </div>
  );
}
