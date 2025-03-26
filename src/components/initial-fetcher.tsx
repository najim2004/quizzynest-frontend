"use client";
import useAuthStore from "@/stores/authStore";
import React, { FC, useEffect } from "react";

interface InitialFetcherProps {
  children: React.ReactNode;
}

const InitialFetcher: FC<InitialFetcherProps> = ({ children }) => {
  const { getUser, user } = useAuthStore();
  useEffect(() => {
    if (!user) getUser();
  }, [getUser, user]);
  return <>{children}</>;
};

export default InitialFetcher;
