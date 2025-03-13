"use client"
import { usePathname } from "next/navigation";
import React from "react";

interface HiderProps {
  pathnames: string[];
  children: React.ReactNode;
}

const Hider: React.FC<HiderProps> = ({ pathnames, children }) => {
  const pathname = usePathname();

  if (pathnames && pathnames.some((p) => pathname.includes(p))) {
    return null;
  }

  return <>{children}</>;
};

export default Hider;
