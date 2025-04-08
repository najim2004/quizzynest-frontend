"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { ClassNameValue } from "tailwind-merge";

interface NavLinkProps {
  children: React.ReactNode;
  className?: string;
  href: string;
  activeClassName?: ClassNameValue;
}

export const NavLink: FC<NavLinkProps> = ({
  children,
  className,
  href,
  activeClassName,
  ...props
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        "text-gray-600 hover:text-gray-900 transition-colors",
        className,
        isActive ? activeClassName : ""
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
