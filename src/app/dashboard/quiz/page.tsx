"use client"
import { QuizCard } from "@/components/dashboard/categories/category-card";
import { useCategoryStore } from "@/stores/categoryStore";

export default function QuizCategories() {
  const { categories } = useCategoryStore();

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((quiz, index) => (
        <QuizCard
          id={quiz.id}
          key={index}
          imageUrl={
            quiz?.icon || "https://www.svgrepo.com/show/445599/category.svg"
          }
          bgColor={quiz.color || "white"}
          questionCount={quiz._count.quizzes}
          title={quiz.name}
          description={quiz.description || ""}
          isAdmin={false}
        />
      ))}
    </section>
  );
}
