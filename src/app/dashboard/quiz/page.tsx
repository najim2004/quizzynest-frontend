"use client";
import { CategoryQuizCard } from "@/components/dashboard/categories/category-card";
import NewQuizPage from "@/components/dashboard/quiz/new-quiz";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useCategoryStore } from "@/stores/categoryStore";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

export default function QuizCategories() {
  const { categories } = useCategoryStore();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );
  const onStart = async (id: number) => {
    setSelectedCategoryId(id);
  };
  return (
    <>
      <div className="w-full p-4">
        <div className="mb-4">
          <Input
            name="search"
            type="search"
            placeholder="Search questions..."
            className="focus-visible:ring-0 md:w-min"
          />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {categories.map((category) => (
            <CategoryQuizCard
              key={category.id}
              id={category.id}
              icon={category.icon}
              color={category.color ?? "white"}
              questionCount={category._count.quizzes}
              name={category.name}
              description={category.description || ""}
              onDelete={() => {}}
              onEdit={() => {}}
              onStart={onStart}
            />
          ))}
        </div>
      </div>
      <div
        className={`absolute z-[200] transform top-0 duration-700 w-full lg:p-4 ${
          selectedCategoryId ? "translate-x-0" : "translate-x-[100vw]"
        }`}
      >
        <div className="relative">
          <Button
            onClick={() => setSelectedCategoryId(null)}
            size="icon"
            variant="outline"
            className="absolute top-0.5 left-0.5"
          >
            <ArrowLeft />
          </Button>
          <NewQuizPage categoryId={selectedCategoryId} />
        </div>
      </div>
    </>
  );
}
