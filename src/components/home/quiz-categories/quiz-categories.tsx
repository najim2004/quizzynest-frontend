import type React from "react";
import { BookOpen, Trophy, Crown } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface QuizCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  iconColor: string;
  iconBgColor: string;
  gradient: string;
}

export default function QuizCategories() {
  const categories: QuizCategory[] = [
    {
      id: "daily-trivia",
      title: "Daily Trivia",
      description: "Test your knowledge with new questions every day",
      icon: <BookOpen className="h-5 w-5 sm:h-6 sm:w-6" />,
      iconColor: "text-blue-500 dark:text-blue-400",
      iconBgColor: "bg-blue-100 dark:bg-blue-950/50",
      gradient:
        "from-blue-300/30 to-blue-600/30 dark:from-blue-500/20 dark:to-blue-900/20",
    },
    {
      id: "daily-play-win",
      title: "Daily Play & Win",
      description: "Complete challenges and earn amazing rewards",
      icon: <Trophy className="h-5 w-5 sm:h-6 sm:w-6" />,
      iconColor: "text-amber-500 dark:text-amber-400",
      iconBgColor: "bg-amber-100 dark:bg-amber-950/50",
      gradient:
        "from-amber-300/30 to-amber-600/30 dark:from-amber-500/20 dark:to-amber-900/20",
    },
    {
      id: "play-like-king",
      title: "Play Like King",
      description: "Premium quizzes with exclusive rewards",
      icon: <Crown className="h-5 w-5 sm:h-6 sm:w-6" />,
      iconColor: "text-purple-500 dark:text-purple-400",
      iconBgColor: "bg-purple-100 dark:bg-purple-950/50",
      gradient:
        "from-purple-300/30 to-purple-600/30 dark:from-purple-500/20 dark:to-purple-900/20",
    },
  ];

  return (
    <section className="w-full dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 sm:mb-10 lg:mb-12 text-center text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
          Popular Quiz Categories
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`group relative overflow-hidden border-0 bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur-sm
                transition-all duration-300 hover:scale-102 hover:-translate-y-1
                hover:bg-gray-300/70 dark:hover:bg-gray-800/70 bg-gradient-to-br ${category.gradient}`}
            >
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity" />
              <CardHeader className="pb-2 pt-6">
                <div className="flex items-center">
                  <div
                    className={`flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl ${category.iconBgColor} ${category.iconColor}`}
                  >
                    {category.icon}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                  {category.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-400">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
