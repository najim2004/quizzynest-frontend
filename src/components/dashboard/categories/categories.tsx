import { CategoryQuizCard } from "./category-card";
import { Category } from "@/stores/categoryStore";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    }
  },
};

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
    <motion.section 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
    >
      {categories.map((quiz) => (
        <motion.div
          key={quiz.id}
          variants={itemVariants}
          layout
          layoutId={`category-${quiz.id}`}
        >
          <CategoryQuizCard
            id={quiz.id}
            onDelete={onDelete}
            onEdit={onEdit}
            icon={quiz?.icon || "https://www.svgrepo.com/show/445599/category.svg"}
            color={quiz.color || "white"}
            questionCount={quiz._count.quizzes}
            name={quiz.name}
            description={quiz.description || ""}
            isAdmin={true}
          />
        </motion.div>
      ))}
    </motion.section>
  );
}
