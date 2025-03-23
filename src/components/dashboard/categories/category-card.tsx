import type React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ActionMenu from "../action-menu/action-menu";

interface QuizCardProps {
  icon: React.ReactNode;
  iconBgColor: string;
  questionCount: number;
  title: string;
  description: string;
  gradientBg: string;
  isAdmin: boolean;
}

export const QuizCard = ({
  icon,
  iconBgColor,
  questionCount,
  title,
  description,
  gradientBg,
  isAdmin = false,
}: QuizCardProps) => {
  return (
    <Card className={`bg-gradient-to-br ${gradientBg} border-none shadow-sm gap-2`}>
      <CardHeader className="py-0">
        <div className="flex justify-between items-center">
          <div className="flex-1 flex justify-between items-center">
            <div className={`bg-${iconBgColor} p-3 rounded-md`}>{icon}</div>

            <span className="text-sm text-gray-500">
              {questionCount} questions
            </span>
          </div>
          <ActionMenu />
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-medium text-lg mb-1">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </CardContent>
      {!isAdmin && (
        <CardFooter>
          <Button className="w-full bg-white/50 hover:bg-white/70 text-gray-500">
            Start Quiz
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
