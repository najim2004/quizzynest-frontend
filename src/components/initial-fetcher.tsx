"use client";
import useAuthStore from "@/stores/authStore";
import { useCategoryStore } from "@/stores/categoryStore";
import React, { FC, useEffect } from "react";

interface InitialFetcherProps {
  children: React.ReactNode;
}

const InitialFetcher: FC<InitialFetcherProps> = ({ children }) => {
  const { getUser, user } = useAuthStore();
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    if (!user) getUser();
  }, [getUser, user]);

  useEffect(() => {
    if (!categories.length) fetchCategories();
  }, [categories, fetchCategories]);
  return <>{children}</>;
};

export default InitialFetcher;
