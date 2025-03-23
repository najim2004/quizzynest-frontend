import { QuizCard } from "@/components/dashboard/categories/category-card";
import { Code, Leaf, Settings } from "lucide-react";

export default function QuizCategories() {
  const quizzes = [
    {
      icon: <Code className="h-5 w-5 text-red-500" />,
      iconBgColor: "red-50",
      questionCount: 15,
      title: "JavaScript Basics",
      description: "Test your knowledge of JavaScript fundamentals",
      gradientBg: "from-red-50/50 to-red-50/80",
    },
    {
      icon: <Leaf className="h-5 w-5 text-green-500" />,
      iconBgColor: "green-50",
      questionCount: 20,
      title: "Environmental Science",
      description: "Explore nature and environmental concepts",
      gradientBg: "from-green-50/50 to-green-50/80",
    },

    {
      icon: <Code className="h-5 w-5 text-red-500" />,
      iconBgColor: "red-50",
      questionCount: 15,
      title: "JavaScript Basics",
      description: "Test your knowledge of JavaScript fundamentals",
      gradientBg: "from-red-50/50 to-red-50/80",
    },
    {
      icon: <Settings className="h-5 w-5 text-blue-500" />,
      iconBgColor: "blue-50",
      questionCount: 25,
      title: "Physics Quiz",
      description: "Challenge yourself with physics problems",
      gradientBg: "from-blue-50/50 to-blue-50/80",
    },
    {
      icon: <Code className="h-5 w-5 text-red-500" />,
      iconBgColor: "red-50",
      questionCount: 15,
      title: "JavaScript Basics",
      description: "Test your knowledge of JavaScript fundamentals",
      gradientBg: "from-red-50/50 to-red-50/80",
    },
    {
      icon: <Leaf className="h-5 w-5 text-green-500" />,
      iconBgColor: "green-50",
      questionCount: 20,
      title: "Environmental Science",
      description: "Explore nature and environmental concepts",
      gradientBg: "from-green-50/50 to-green-50/80",
    },

    {
      icon: <Settings className="h-5 w-5 text-blue-500" />,
      iconBgColor: "blue-50",
      questionCount: 25,
      title: "Physics Quiz",
      description: "Challenge yourself with physics problems",
      gradientBg: "from-blue-50/50 to-blue-50/80",
    },
    {
      icon: <Leaf className="h-5 w-5 text-green-500" />,
      iconBgColor: "green-50",
      questionCount: 20,
      title: "Environmental Science",
      description: "Explore nature and environmental concepts",
      gradientBg: "from-green-50/50 to-green-50/80",
    },
    {
      icon: <Settings className="h-5 w-5 text-blue-500" />,
      iconBgColor: "blue-50",
      questionCount: 25,
      title: "Physics Quiz",
      description: "Challenge yourself with physics problems",
      gradientBg: "from-blue-50/50 to-blue-50/80",
    },
  ];

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {quizzes.map((quiz, index) => (
        <QuizCard
          key={index}
          icon={quiz.icon}
          iconBgColor={quiz.iconBgColor}
          questionCount={quiz.questionCount}
          title={quiz.title}
          description={quiz.description}
          gradientBg={quiz.gradientBg}
          isAdmin={false}
        />
      ))}
    </section>
  );
}
