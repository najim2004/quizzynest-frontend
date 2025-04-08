"use client";
import QuizCategories from "@/components/dashboard/categories/categories";
import CategoryCreateButton from "@/components/dashboard/categories/category-create-button";
import { Input } from "@/components/ui/input";
import { useCategoryStore } from "@/stores/categoryStore";
import React, { useState } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import PrivateRoute from "@/components/private-route/private-route";

const CategoriesPage = () => {
  const { categories, loading, error, deleteCategory } = useCategoryStore();

  const [filters, setFilters] = useState({
    search: "",
    page: 1,
    limit: 10,
  });

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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full p-4"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between mb-4"
      >
        <Input
          name="search"
          type="search"
          placeholder="Search categories..."
          className="mr-2 w-min focus-visible:ring-0"
          value={filters.search}
          onChange={handleSearchChange}
        />

        <CategoryCreateButton />
      </motion.div>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.p
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            Loading categories...
          </motion.p>
        )}

        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="text-red-500 text-center"
          >
            {error}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="underline"
            >
              Retry
            </motion.button>
          </motion.div>
        )}

        {!loading && !error && (
          <motion.div
            key="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <QuizCategories
              categories={categories}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function Page() {
  return (
    <PrivateRoute roles={["ADMIN"]}>
      <CategoriesPage />
    </PrivateRoute>
  );
}
