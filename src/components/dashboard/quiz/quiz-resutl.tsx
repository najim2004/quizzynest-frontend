"use client";

import { Trophy, ArrowLeft, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface QuizResultProps {
  totalQuestions: number;
  correctAnswers: number;
  totalCoinsEarned: number;
  accuracy: number;
  totalTimeSpent: number;
  onReset: () => void;
  onShare?: () => void;
}

export default function QuizResult({
  totalQuestions,
  correctAnswers,
  totalCoinsEarned,
  accuracy,
  totalTimeSpent,
  onReset,
  onShare,
}: QuizResultProps) {
  const router = useRouter();

  const handleBack = () => {
    onReset();
    toast.success("Returning to home!");
    router.back();
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full flex items-center justify-center p-4 h-full"
    >
      <Card className="w-full max-w-3xl mx-auto flex flex-col border p-0 shadow-none overflow-hidden h-full bg-transparent">
        <CardHeader className="bg-gradient-to-r from-[#FFD700] to-[#FFA500] p-6 text-center text-white flex flex-col justify-center items-center">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className=""
          >
            <Trophy className="w-24 h-24 text-white drop-shadow-lg" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-4 text-3xl font-bold tracking-tight"
          >
            Congratulations!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-2 text-lg font-medium"
          >
            You’ve completed the quiz!
          </motion.p>
        </CardHeader>

        <CardContent className="p-6 space-y-6 max-w-2xl w-full mx-auto flex-grow flex flex-col justify-center">
          {/* Performance Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-center mb-6"
          >
            <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
              Your Performance Summary
            </h2>
            <p className="text-gray-600">
              {accuracy >= 80
                ? "Outstanding! You're a quiz master! 🌟"
                : accuracy >= 60
                ? "Good job! Keep practicing! 💪"
                : "Keep learning and try again! 📚"}
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">
                Total Questions
              </span>
              <Badge variant="outline" className="text-lg">
                {totalQuestions}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">
                Correct Answers
              </span>
              <Badge variant="outline" className="text-lg text-green-600">
                {correctAnswers}
              </Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">
                Coins Earned
              </span>
              <Badge variant="outline" className="text-lg text-yellow-600">
                {totalCoinsEarned}
              </Badge>
            </div>
            <div className="space-y-2">
              <span className="text-sm font-medium text-gray-600">
                Accuracy
              </span>
              <Progress
                value={accuracy}
                className="h-3 bg-gray-200"
                indicatorClassName="bg-gradient-to-r from-[#FFD700] to-[#FFA500]"
              />
              <p className="text-sm text-gray-500 text-right">
                {accuracy.toFixed(2)}%
              </p>
            </div>
          </motion.div>

          {/* Time Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="space-y-4 pt-4 border-t"
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">
                Total Time Taken
              </span>
              <Badge variant="outline" className="text-lg">
                {formatTime(totalTimeSpent || 0)}
              </Badge>
            </div>
          </motion.div>
        </CardContent>

        {/* Share Results Button */}
        <CardFooter className="p-6 flex justify-center gap-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="flex gap-4"
          >
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex items-center gap-2 px-6 py-2 text-gray-700 border-gray-300 hover:bg-gray-100"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
            <Button
              onClick={onShare ? onShare : undefined}
              className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#FFD700] to-[#FFA500] text-white hover:opacity-90"
            >
              <Share className="w-4 h-4" />
              Share Results
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
