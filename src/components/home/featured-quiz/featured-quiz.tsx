import type React from "react";
import { Brain, GraduationCap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeaturedQuiz {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  textColor: string;
}

export default function FeaturedQuizzes() {
  const quizzes: FeaturedQuiz[] = [
    {
      id: "test-iq",
      title: "Test your IQ",
      description: "Challenge your intelligence with our IQ tests.",
      icon: <Brain className="h-8 w-8 sm:h-6 sm:w-6" />,
      gradient:
        "bg-gradient-to-br from-purple-500 to-purple-700 dark:from-purple-700/30 dark:to-purple-900/30",
      textColor: "text-white dark:text-gray-200",
    },
    {
      id: "learn-earn",
      title: "Learn & Earn",
      description: "Learn new topics and earn rewards while doing it.",
      icon: <GraduationCap className="h-8 w-8 sm:h-6 sm:w-6" />,
      gradient:
        "bg-gradient-to-br from-blue-500 to-blue-700 dark:from-blue-700/30 dark:to-blue-900/30",
      textColor: "text-white dark:text-gray-200",
    },
    {
      id: "best-before-play",
      title: "Best before Play",
      description: "Practice rounds before the main competition.",
      icon: <Star className="h-8 w-8 sm:h-6 sm:w-6" />,
      gradient:
        "bg-gradient-to-br from-pink-500 to-red-600 dark:from-pink-700/30 dark:to-red-900/30",
      textColor: "text-white dark:text-gray-200",
    },
  ];

  return (
    <section className="w-full dark:bg-gray-900 mt-12 sm:mt-16 lg:mt-40 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 sm:mb-10 text-center text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          Featured Quizzes
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {quizzes.map((quiz) => (
            <div
              key={quiz.id}
              className={`${quiz.gradient} rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102 hover:-translate-y-1 backdrop-blur-sm`}
            >
              <div className="mb-4 sm:mb-6">
                <div className="p-2 inline-block text-white rounded-lg bg-white/10 dark:bg-white/20">
                  {quiz.icon}
                </div>
              </div>
              <h3
                className={`mb-2 sm:mb-3 text-base sm:text-lg font-semibold ${quiz.textColor}`}
              >
                {quiz.title}
              </h3>
              <p
                className={`mb-4 sm:mb-6 text-xs sm:text-sm ${quiz.textColor} opacity-90`}
              >
                {quiz.description}
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="w-full sm:w-auto rounded-full bg-white/10 dark:bg-white/20 text-white dark:text-gray-900 hover:bg-white/20 dark:hover:bg-white/30 border border-white/20"
              >
                Start Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
