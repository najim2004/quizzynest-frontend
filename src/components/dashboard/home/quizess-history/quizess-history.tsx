import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { QuizHistoryResult } from "@/stores/profileStore";
import { Clock, CheckCircle2,Coins } from "lucide-react";
import Link from "next/link";

const DUMMY_QUIZ_HISTORY: QuizHistoryResult[] = [
  {
    id: 1,
    categoryName: "Mathematics",
    totalQuestions: 10,
    correctAnswers: 8,
    totalTimeSpent: 300,
    totalCoinsEarned: 80,
    accuracy: 80,
    completedAt: new Date("2024-03-29"),
  },
  {
    id: 2,
    categoryName: "Science",
    totalQuestions: 15,
    correctAnswers: 14,
    totalTimeSpent: 450,
    totalCoinsEarned: 140,
    accuracy: 93,
    completedAt: new Date("2024-03-28"),
  },
  {
    id: 3,
    categoryName: "History",
    totalQuestions: 12,
    correctAnswers: 6,
    totalTimeSpent: 360,
    totalCoinsEarned: 30,
    accuracy: 50,
    completedAt: new Date("2024-03-27"),
  },
];

const StatusBadge = () => {
  return (
    <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
      <CheckCircle2 className="w-3 h-3" />
      <span className="sr-only">Completed</span>
    </Badge>
  );
};

export default function PlayedQuizzesHistory({
  quizHistory = DUMMY_QUIZ_HISTORY,
}: {
  quizHistory?: QuizHistoryResult[];
}) {
  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm flex flex-col">
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

  // Calculate category color based on accuracy
  const getCategoryColor = (accuracy: number): string => {
    if (accuracy >= 90) return "bg-green-500";
    if (accuracy >= 70) return "bg-blue-500";
    if (accuracy >= 50) return "bg-purple-500";
    return "bg-red-500";
  };

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div
          className={`${getCategoryColor(
            quiz.accuracy
          )} w-10 h-10 rounded-md flex items-center justify-center text-white`}
        >
          {quiz.categoryName.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-base text-nowrap">
              {quiz.categoryName}
            </h3>
            <div className="max-w-36 flex items-center gap-4">
              <Progress
                value={(quiz.correctAnswers / quiz.totalQuestions) * 100}
                className="h-1.5 max-w-full min-w-20"
                indicatorClassName={`${getScoreColorClass(
                  (quiz.correctAnswers / quiz.totalQuestions) * 100
                )}`}
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

function getScoreColorClass(score: number): string {
  if (score >= 90) return "bg-green-500";
  if (score >= 70) return "bg-blue-500";
  if (score >= 50) return "bg-amber-500";
  return "bg-red-500";
}
