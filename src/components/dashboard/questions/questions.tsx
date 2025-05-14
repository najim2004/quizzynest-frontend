"use client";
import { Category } from "@/stores/categoryStore";
import { ClientQuiz } from "@/stores/quizStore";
import QuestionCard from "./QuestionCard";

export default function QuizQuestions({
  questions,
  categories,
  onDelete,
  onEdit,
}: {
  questions: ClientQuiz[];
  categories: Category[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4">
      {questions.map((question, index) => (
        <QuestionCard
          key={question.id}
          question={question}
          index={index}
          categories={categories}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
