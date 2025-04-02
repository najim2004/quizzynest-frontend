import { QuizCard } from "./category-card";
import { Category } from "@/stores/categoryStore";

export default function QuizCategories({
  categories = [],
  onDelete,
  onEdit,
}: {
  categories: Category[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {categories.map((quiz, index) => (
        <QuizCard
          id={quiz.id}
          onDelete={onDelete}
          onEdit={onEdit}
          key={index}
          imageUrl={
            quiz?.icon || "https://www.svgrepo.com/show/445599/category.svg"
          }
          bgColor={quiz.color || "white"}
          questionCount={quiz._count.quizzes}
          title={quiz.name}
          description={quiz.description || ""}
          isAdmin={true}
        />
      ))}
    </section>
  );
}
