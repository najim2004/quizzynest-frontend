"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { FC } from "react";

interface NavLinkProps {
  children: React.ReactNode;
  className?: string;
  href: string;
  activeClassName?: string;
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
        {
          [activeClassName || ""]: isActive,
        }
      )}
      {...props}
    >
      {children}
    </Link>
  );
};
