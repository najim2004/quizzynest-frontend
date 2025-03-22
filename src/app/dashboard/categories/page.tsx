import QuizCategories from "@/components/dashboard/categories/categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import React from "react";

const CategoriesPage = () => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Input
          name="search"
          type="search"
          placeholder="Search"
          className="mr-2 w-min focus-visible:ring-0"
        />

        <Button variant="outline" size="icon">
          <Plus className="h-4 w-4" />
          <span className="text-gray-500 sr-only">Add Category</span>
        </Button>
      </div>
      <QuizCategories />
    </div>
  );
};

export default CategoriesPage;
