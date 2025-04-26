"use client";
import useAuthStore from "@/stores/authStore";
import { useCategoryStore } from "@/stores/categoryStore";
import React, { FC, useEffect, useCallback } from "react";

interface InitialFetcherProps {
  children: React.ReactNode;
}

const InitialFetcher: FC<InitialFetcherProps> = React.memo(({ children }) => {
  // Memoize selectors to prevent infinite loops
  const getUser = useAuthStore(useCallback((state) => state.getUser, []));
  const user = useAuthStore(useCallback((state) => state.user, []));

  const fetchCategories = useCategoryStore(
    useCallback((state) => state.fetchCategories, [])
  );

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [getUser, user]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return <>{children}</>;
});

InitialFetcher.displayName = "InitialFetcher";

export default InitialFetcher;
