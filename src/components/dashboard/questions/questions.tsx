"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Check, X } from "lucide-react";
import ActionMenu from "../action-menu/action-menu";
import { Quiz } from "@/stores/quizStore";
import { Category } from "@/stores/categoryStore";

export default function QuizQuestions({
  questions,
  categories,
}: {
  questions: Quiz[];
  categories: Category[];
}) {
  // const [questions] = useState<QuizQuestion[]>([
  //   {
  //     id: 1,
  //     text: "What is the capital of France?",
  //     category: "Geography",
  //     difficulty: "Easy",
  //     options: [
  //       { id: 1, label: "A", text: "Paris", isCorrect: true },
  //       { id: 2, label: "B", text: "Berlin", isCorrect: false },
  //       { id: 3, label: "C", text: "London", isCorrect: false },
  //       { id: 4, label: "D", text: "Madrid", isCorrect: false },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     text: "What is the largest planet in our solar system?",
  //     category: "Science",
  //     difficulty: "Medium",
  //     options: [
  //       { id: 1, label: "A", text: "Jupiter", isCorrect: true },
  //       { id: 2, label: "B", text: "Mars", isCorrect: false },
  //       { id: 3, label: "C", text: "Saturn", isCorrect: false },
  //       { id: 4, label: "D", text: "Neptune", isCorrect: false },
  //     ],
  //   },
  // ]);
  return (
    <div className="grid grid-cols-1 gap-4">
      {questions.map((question) => (
        <Card key={question.id} className="w-full">
          <CardContent>
            <div className="space-y-4">
              {/* Question Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-base font-medium">
                  <span>Question {question.id}: </span>
                  {question.question}
                </h3>
                <div className="flex items-center space-x-2">
                  <ActionMenu onDelete={() => {}} onEdit={() => {}} />
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant="outline"
                  className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                >
                  {
                    categories.find((cat) => cat.id === question.categoryId)
                      ?.name
                  }
                </Badge>
                <Badge
                  variant="outline"
                  className={`
                      ${
                        question.difficulty === "EASY"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : ""
                      }
                      ${
                        question.difficulty === "MEDIUM"
                          ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                          : ""
                      }
                      ${
                        question.difficulty === "HARD"
                          ? "bg-red-100 text-red-800 hover:bg-red-100"
                          : ""
                      }
                    `}
                >
                  {question.difficulty}
                </Badge>
              </div>

              {/* Options */}
              <div className="grid grid-cols-2 gap-2">
                {question.answers.map((option) => (
                  <div
                    key={option.id}
                    className="flex items-center p-3 rounded-md border border-gray-200"
                  >
                    <span className="font-medium mr-2">{option?.label}.</span>
                    {option?.isCorrect ? (
                      <Check className="h-4 w-4 text-green-600 mr-2" />
                    ) : (
                      <X className="h-4 w-4 text-red-600 mr-2" />
                    )}
                    <span>{option.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
