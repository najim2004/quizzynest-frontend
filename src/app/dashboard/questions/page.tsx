"use client";
import QuestionCreateButton from "@/components/dashboard/questions/question-create-button";
import QuizQuestions from "@/components/dashboard/questions/questions";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCategoryStore } from "@/stores/categoryStore";
import useQuizStore from "@/stores/quizStore";
import React, { useEffect, useState, useCallback } from "react";
import debounce from "lodash/debounce"; // lodash থেকে debounce ইমপোর্ট করা
import { toast } from "sonner";
import PrivateRoute from "@/components/private-route/private-route";

const DashboardQuestions = () => {
  const {
    quizzes,
    getQuizzesForAdmin,
    loading,
    error,
    clearError,
    deleteQuiz,
  } = useQuizStore();
  const { categories } = useCategoryStore();

  // ফিল্টারগুলোর জন্য স্টেট
  const [filters, setFilters] = useState({
    search: "",
    categoryId: undefined as number | undefined,
    difficulty: undefined as "EASY" | "MEDIUM" | "HARD" | undefined,
    page: 1,
    limit: 10,
  });

  // ডিবাউন্সড ফেচ ফাংশন
  const debouncedFetchQuizzes = useCallback(
    debounce((newFilters) => {
      getQuizzesForAdmin(newFilters);
    }, 500),
    [getQuizzesForAdmin]
  );

  // ফিল্টার পরিবর্তন হলে কুইজ ফেচ করা
  useEffect(() => {
    debouncedFetchQuizzes(filters);
  }, [filters, debouncedFetchQuizzes]);

  // ফিল্টার হ্যান্ডলার
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }));
  };

  const handleCategoryChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      categoryId: value ? parseInt(value) : undefined,
      page: 1,
    }));
  };

  const handleDifficultyChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      difficulty: value as "EASY" | "MEDIUM" | "HARD" | undefined,
      page: 1,
    }));
  };

  const onDelete = async (id: number) => {
    try {
      const response = await deleteQuiz(id);
      if (response?.success)
        throw new Error(response.message || "Failed to delete this question");
      toast.success(response.message || "Question deleted successfully");
    } catch (error) {
      console.log("[Question Error]", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete this question"
      );
    }
  };

  const onEdit = (id: number) => {
    console.log(id);
    // Handle edit logic here
  };

  return (
    <div className="max-h-full overflow-y-auto w-full p-4">
      <div className="flex items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2 flex-1">
          <Input
            name="search"
            type="search"
            placeholder="Search questions..."
            className="focus-visible:ring-0"
            value={filters.search}
            onChange={handleSearchChange}
          />

          <Select
            value={filters.categoryId?.toString()}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.difficulty}
            onValueChange={handleDifficultyChange}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={"all"}>All</SelectItem>
              <SelectItem value="EASY">Easy</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HARD">Hard</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <QuestionCreateButton />
      </div>

      {/* লোডিং এবং এরর হ্যান্ডলিং */}
      {loading && <p className="text-center">Loading quizzes...</p>}
      {error && (
        <div className="text-red-500 text-center">
          {error}{" "}
          <button onClick={clearError} className="underline">
            Retry
          </button>
        </div>
      )}

      {/* কুইজ প্রদর্শন */}
      {!loading && !error && (
        <QuizQuestions
          questions={quizzes}
          categories={categories}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
    </div>
  );
};

export default function Page() {
  return (
    <PrivateRoute roles={["ADMIN"]}>
      <DashboardQuestions />
    </PrivateRoute>
  );
}
