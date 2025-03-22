import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  CheckCircle2,
  XCircle,
  Clock3,
  Coins,
} from "lucide-react";
import Link from "next/link";

// Mock data for quizzes
const quizzes = [
  {
    id: 1,
    title: "Science Fundamentals",
    category: "Science",
    date: "Today, 2:30 PM",
    score: 85,
    totalQuestions: 20,
    correctAnswers: 17,
    timeSpent: "12m 45s",
    status: "completed",
    categoryColor: "bg-emerald-500",
  },
  {
    id: 2,
    title: "World History: Ancient Civilizations",
    category: "History",
    date: "Yesterday, 5:15 PM",
    score: 92,
    totalQuestions: 25,
    correctAnswers: 23,
    timeSpent: "18m 20s",
    status: "completed",
    categoryColor: "bg-blue-500",
  },
  {
    id: 3,
    title: "Mathematics: Algebra Basics",
    category: "Mathematics",
    date: "Mar 18, 2024",
    score: 70,
    totalQuestions: 15,
    correctAnswers: 10,
    timeSpent: "15m 10s",
    status: "completed",
    categoryColor: "bg-purple-500",
  },
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  if (status === "completed") {
    return (
      <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
        <CheckCircle2 className="w-3 h-3" />
        <span className="sr-only">Completed</span>
      </Badge>
    );
  } else if (status === "abandoned") {
    return (
      <Badge
        variant="outline"
        className="bg-red-100 text-red-800 hover:bg-red-100 flex items-center gap-1"
      >
        <XCircle className="w-3 h-3" />
        <span className="sr-only">Abandoned</span>
      </Badge>
    );
  } else {
    return (
      <Badge
        variant="outline"
        className="bg-amber-100 text-amber-800 hover:bg-amber-100 flex items-center gap-1"
      >
        <Clock3 className="w-3 h-3" />
        <span className="sr-only">In Progress</span>
      </Badge>
    );
  }
};

export default function PlayedQuizzesHistory() {
  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-sm flex flex-col">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-medium">Quiz Histories</h2>
      </div>
      <div className="grid grid-cols-1 gap-4 mb-auto">
        {quizzes.map((quiz) => (
          <QuizHistoryItem key={quiz.id} quiz={quiz} />
        ))}
      </div>
      <Separator className="my-2" />

      <div className="text-center">
        <Link href="#" className="text-gray-400 text-sm">
          View all
        </Link>
      </div>
    </div>
  );
}

interface QuizHistoryItemProps {
  quiz: {
    id: number;
    title: string;
    category: string;
    date: string;
    score: number;
    totalQuestions: number;
    correctAnswers: number;
    timeSpent: string;
    status: string;
    categoryColor: string;
  };
}

function QuizHistoryItem({ quiz }: QuizHistoryItemProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <div
          className={`${quiz.categoryColor} w-10 h-10 rounded-md flex items-center justify-center text-white`}
        >
          {quiz.category.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-base text-nowrap">
              {quiz.category}
            </h3>
            <div className="max-w-32 flex items-center gap-4">
              <Progress
                value={quiz.score}
                className="h-1.5 max-w-full min-w-20"
                indicatorClassName={`${getScoreColorClass(quiz.score)}`}
              />
              <p>{quiz.score}%</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1 text-sm text-muted-foreground">
            {/* <div className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{quiz.date}</span>
                </div> */}
            <div className="flex items-center gap-1">
              <Coins className="w-3.5 h-3.5" />
              <span>{100}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{quiz.timeSpent}</span>
            </div>
            <StatusBadge status={quiz.status} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to determine score color
function getScoreColorClass(score: number): string {
  if (score >= 90) return "bg-green-500";
  if (score >= 70) return "bg-blue-500";
  if (score >= 50) return "bg-amber-500";
  return "bg-red-500";
}
