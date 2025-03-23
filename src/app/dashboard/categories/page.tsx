import QuizCategories from "@/components/dashboard/categories/categories";
import CategoryCreateButton from "@/components/dashboard/categories/category-create-button";
import { Input } from "@/components/ui/input";
import React from "react";

const CategoriesPage = () => {
  return (
    <div className="relative h-full w-full p-0.5">
      <div className="flex items-center justify-between mb-4">
        <Input
          name="search"
          type="search"
          placeholder="Search"
          className="mr-2 w-min focus-visible:ring-0"
        />

        <CategoryCreateButton/>
      </div>
      <QuizCategories />
    </div>
  );
};

export default CategoriesPage;
