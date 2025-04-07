"use client";

import {
  Home,
  Ticket,
  ShoppingCart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MdOutlineLeaderboard } from "react-icons/md";
import { IoExtensionPuzzleOutline } from "react-icons/io5";
import { NavLink } from "@/components/navlink/navlink";

const items = [
  {
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Play Quiz",
    url: "/dashboard/quiz",
    icon: IoExtensionPuzzleOutline,
  },
  {
    title: "Leaderboard",
    url: "/dashboard/leaderboard",
    icon: MdOutlineLeaderboard,
  },
  {
    title: "Shop",
    url: "/dashboard/shop",
    icon: ShoppingCart,
  },
  {
    title: "Vouchers",
    url: "/dashboard/vouchers",
    icon: Ticket,
  },
];

export function DashboardMobileNavbar() {
  return (
<nav className="fixed lg:hidden bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center justify-around px-4">
        {items.map((item) => (
          <NavLink
            key={item.title}
            href={item.url}
            className={cn(
              "flex flex-col items-center justify-center gap-1 text-xs",
              "transition-colors hover:text-primary"
            )}
          >
            <item.icon className="h-5 w-5" />
            <span className="sr-only xs:not-sr-only">{item.title}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
