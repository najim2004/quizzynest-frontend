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
}

export default function QuizCategories() {
  const categories: QuizCategory[] = [
    {
      id: "daily-trivia",
      title: "Daily Trivia",
      description: "Test your knowledge with new questions every day",
      icon: <BookOpen className="h-6 w-6" />,
      iconColor: "text-blue-500",
      iconBgColor: "bg-blue-100",
    },
    {
      id: "daily-play-win",
      title: "Daily Play & Win",
      description: "Complete challenge and earn amazing rewards",
      icon: <Trophy className="h-6 w-6" />,
      iconColor: "text-amber-500",
      iconBgColor: "bg-amber-100",
    },
    {
      id: "play-like-king",
      title: "Play Like King",
      description: "Premium quizzes with exclusive rewards",
      icon: <Crown className="h-6 w-6" />,
      iconColor: "text-purple-500",
      iconBgColor: "bg-purple-100",
    },
  ];

  return (
    <section className="container mx-auto px-4 lg:px-0">
      <h2 className="mb-10 text-center text-2xl font-bold dark:text-white text-black md:text-3xl">
        Popular Quiz Categories
      </h2>
      <div className="grid grid-cols-1 gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="overflow-hidden border shadow-lg transition-transform duration-300 hover:scale-105"
          >
            <CardHeader className="pb-2 pt-6">
              <div className="flex items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-md ${category.iconBgColor} ${category.iconColor}`}
                >
                  {category.icon}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <h3 className="mb-2 text-lg font-semibold">{category.title}</h3>
              <p className="text-sm text-muted-foreground">
                {category.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
