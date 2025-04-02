import type React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ActionMenu from "../action-menu/action-menu";
import Image from "next/image";
import Link from "next/link";

interface QuizCardProps {
  id: number;
  imageUrl: string;
  bgColor: string;
  questionCount: number;
  title: string;
  description: string;
  isAdmin: boolean;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
}

export const QuizCard = ({
  id,
  imageUrl,
  bgColor,
  questionCount,
  title,
  description,
  onDelete,
  onEdit,
  isAdmin = false,
}: QuizCardProps) => {
  const cardStyle = {
    background: `linear-gradient(to bottom right, ${bgColor}40, ${bgColor}70)`,
    border: "none",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
  };

  const imageBgStyle = {
    backgroundColor: `${bgColor}70`,
  };

  return (
    <Card className="gap-2" style={cardStyle}>
      <CardHeader className="py-0">
        <div className="flex justify-between items-center">
          <div className="flex-1 flex justify-between items-center">
            <div
              className="p-3 rounded-md flex items-center justify-center w-12 h-12"
              style={imageBgStyle}
            >
              <Image
                src={imageUrl}
                alt={`${title} image`}
                width={20}
                height={20}
                className="object-cover rounded"
              />
            </div>

            <span className="text-sm text-gray-500">
              {questionCount} questions
            </span>
          </div>
          {isAdmin && (
            <ActionMenu
              onDelete={() => onDelete(id)}
              onEdit={() => onEdit(id)}
            />
          )}
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-medium text-lg mb-1">{title}</h3>
        <p className="text-gray-500 text-sm">{description}</p>
      </CardContent>
      {!isAdmin && (
        <CardFooter>
          <Button className="w-full bg-white/50 hover:bg-white/70 text-gray-500">
            <Link href={`/dashboard/quiz/${id}`}>Start Quiz</Link>
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
