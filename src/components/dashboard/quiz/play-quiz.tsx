import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ClientQuiz, QuizSession } from "@/stores/quizStore";

interface PlayQuizProps {
  currentSession: QuizSession | null;
  quiz: ClientQuiz | null;
  timeLeft: number;
  selectedOption: number | null;
  loading: boolean;
  onClose: () => void;
  onOptionSelect: (id: number) => void;
  onContinue: () => void;
}

const PlayQuiz: React.FC<PlayQuizProps> = ({
  currentSession,
  quiz,
  timeLeft,
  selectedOption,
  loading,
  onClose,
  onOptionSelect,
  onContinue,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full"
    >
      <Card className="w-full max-w-3xl mx-auto flex flex-col h-[90vh] border-none shadow-lg rounded-xl overflow-hidden bg-transparent p-0">
        <CardHeader className="bg-primary p-6 text-white">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between"
          >
            <Badge variant="secondary" className="bg-white/20 text-white">
              Points: {currentSession?.earnedCoins}
            </Badge>
            <h1 className="text-xl font-semibold tracking-tight">Quiz Time</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </Button>
          </motion.div>
          <div className="mt-6 text-center">
            <motion.div
              animate={{ scale: timeLeft <= 5 ? [1, 1.1, 1] : 1 }}
              transition={{ repeat: timeLeft <= 5 ? Infinity : 0 }}
              className="mx-auto mb-4 w-20 h-20 border-4 border-white/30 rounded-full flex items-center justify-center text-2xl font-bold"
            >
              {timeLeft}
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg font-medium px-4 leading-relaxed"
            >
              {quiz?.question}
            </motion.h2>
          </div>
        </CardHeader>

        <CardContent className="p-6 flex-grow flex flex-col w-full items-center justify-center overflow-y-auto">
          <div className="space-y-3 max-w-xl mx-auto w-full">
            <AnimatePresence mode="wait">
              {quiz?.answers.map((option, index) => (
                <motion.div
                  key={option.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant="outline"
                    onClick={() => onOptionSelect(option.id)}
                    disabled={loading}
                    className={cn(
                      "w-full h-14 flex items-center justify-start px-4 bg-white border-gray-200 shadow-sm hover:bg-primary transition-colors duration-200 group",
                      selectedOption === option.id && "bg-primary border-none"
                    )}
                  >
                    <span className="text-sm font-medium bg-gray-100 group-hover:text-gray-800 rounded-full w-8 h-8 flex items-center justify-center mr-4 shrink-0">
                      {option.label}
                    </span>
                    <span
                      className={cn(
                        "text-sm font-medium truncate",
                        selectedOption === option.id
                          ? "text-white"
                          : "group-hover:text-white"
                      )}
                    >
                      {option.text}
                    </span>
                  </Button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </CardContent>

        <CardFooter className="p-6 bg-white/80 backdrop-blur-sm border-t flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Progress
              indicatorClassName="bg-primary"
              value={
                ((quiz?.currentQuizIndex ? quiz.currentQuizIndex + 1 : 0) /
                  (currentSession?.totalQuestions ?? 0)) *
                100
              }
              className="h-2 w-32 bg-gray-200"
            />
            <span className="text-sm text-gray-600">
              {quiz?.currentQuizIndex ? quiz.currentQuizIndex + 1 : 0} /{" "}
              {currentSession?.totalQuestions}
            </span>
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={onContinue}
              disabled={!selectedOption || loading}
              className="bg-primary text-white px-6 py-2 rounded-md hover:from-[#5A4BCF] hover:to-[#3B2DBA] transition-all"
            >
              {loading ? "Submitting..." : "Next"}
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PlayQuiz;
