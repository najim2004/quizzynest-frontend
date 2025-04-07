"use client";
import QuizCategories from "@/components/dashboard/categories/categories";
import CategoryCreateButton from "@/components/dashboard/categories/category-create-button";
import { Input } from "@/components/ui/input";
import { useCategoryStore } from "@/stores/categoryStore";
import React, { useEffect, useState, useCallback } from "react";
import debounce from "lodash/debounce"; // lodash থেকে debounce ইমপোর্ট
import { toast } from "sonner";

const CategoriesPage = () => {
  const { categories, fetchCategories, loading, error, deleteCategory } =
    useCategoryStore();

  // ফিল্টারের জন্য স্টেট
  const [filters, setFilters] = useState({
    search: "",
    page: 1,
    limit: 10,
  });

  // ডিবাউন্সড ফেচ ফাংশন
  const debouncedFetchCategories = useCallback(
    debounce((newFilters) => {
      console.log(newFilters);
      fetchCategories();
    }, 500),
    [fetchCategories]
  );

  useEffect(() => {
    debouncedFetchCategories(filters);
  }, [filters, debouncedFetchCategories]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: e.target.value, page: 1 }));
  };
  const onDelete = async (id: number) => {
    try {
      const response = await deleteCategory(id);
      if (response?.success)
        throw new Error(response.message || "Faild to delete category");
      toast.success(response.message || "Category deleted successfully");
    } catch (error) {
      console.log("[Category Error]", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete category"
      );
    }
  };
  const onEdit = (id: number) => {
    console.log(id);
  };
  return (
    <div className="relative h-full w-full p-4">
      <div className="flex items-center justify-between mb-4">
        <Input
          name="search"
          type="search"
          placeholder="Search categories..."
          className="mr-2 w-min focus-visible:ring-0"
          value={filters.search}
          onChange={handleSearchChange}
        />

        <CategoryCreateButton />
      </div>
      {loading && <p className="text-center">Loading categories...</p>}
      {error && (
        <div className="text-red-500 text-center">
          {error} <button className="underline">Retry</button>
        </div>
      )}
      {!loading && !error && (
        <QuizCategories
          categories={categories}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      )}
    </div>
  );
};

export default CategoriesPage;
