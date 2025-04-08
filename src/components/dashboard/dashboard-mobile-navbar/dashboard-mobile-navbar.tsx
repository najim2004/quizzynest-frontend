"use client";
import {
  // History,
  Home,
  // Medal,
  ShoppingCart,
  Ticket,
} from "lucide-react";
import { MdCategory, MdOutlineLeaderboard } from "react-icons/md";
import { FaQuestion } from "react-icons/fa";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { cn } from "@/lib/utils";
import { NavLink } from "@/components/navlink/navlink";
import useAuthStore from "@/stores/authStore";

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
    accessOnly: "ALLUSER",
  },
  {
    title: "Play Quiz",
    url: "/dashboard/quiz",
    icon: IoExtensionPuzzleOutline,
    accessOnly: "USER",
  },
  {
    title: "Leaderboard",
    url: "/dashboard/leaderboard",
    icon: MdOutlineLeaderboard,
    accessOnly: "USER",
  },
  // {
  //   title: "History",
  //   url: "/dashboard/history",
  //   icon: History,
  //   accessOnly: "USER",
  // },
  // {
  //   title: "Achievements",
  //   url: "/dashboard/achievements",
  //   icon: Medal,
  //   accessOnly: "USER",
  // },
  {
    title: "Shop",
    url: "/dashboard/shop",
    icon: ShoppingCart,
    accessOnly: "USER",
  },
  {
    title: "Categories",
    url: "/dashboard/categories",
    icon: MdCategory,
    accessOnly: "ADMIN",
  },
  {
    title: "Questions",
    url: "/dashboard/questions",
    icon: FaQuestion,
    accessOnly: "ADMIN",
  },
  {
    title: "Vouchers",
    url: "/dashboard/vouchers",
    icon: Ticket,
    accessOnly: "USER",
  },
];
export function DashboardMobileNavbar() {
  const { user } = useAuthStore();
  return (
    <nav className="fixed lg:hidden bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-around px-4">
        {items.map(
          (item) =>
            (item.accessOnly === user?.role ||
              item.accessOnly === "ALLUSER") && (
              <NavLink
                key={item.title}
                href={item.url}
                activeClassName="text-primary font-bold"
                className={cn(
                  "flex flex-col items-center justify-center gap-1 text-xs",
                  "transition-colors hover:text-primary"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span className="sr-only xs:not-sr-only">{item.title}</span>
              </NavLink>
            )
        )}
      </div>
    </nav>
  );
}
