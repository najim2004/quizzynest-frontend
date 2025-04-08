"use client";
import { NavLink } from "@/components/navlink/navlink";
import {
  Brain,
  History,
  Home,
  Medal,
  Settings,
  ShoppingCart,
  Ticket,
} from "lucide-react";
import { MdCategory, MdOutlineLeaderboard } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";

import { IoExtensionPuzzleOutline } from "react-icons/io5";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaQuestion } from "react-icons/fa";
import useAuthStore from "@/stores/authStore";
import { Button } from "@/components/ui/button";

// Menu items.
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
    accessOnly:"USER"
  },
  {
    title: "Leaderboard",
    url: "/dashboard/leaderboard",
    icon: MdOutlineLeaderboard,
    accessOnly: "USER",
  },
  {
    title: "History",
    url: "/dashboard/history",
    icon: History,
    accessOnly: "USER",
  },
  {
    title: "Achievements",
    url: "/dashboard/achievements",
    icon: Medal,
    accessOnly: "USER",
  },
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
  {
    title: "Settings",
    url: "/dashboard/#",
    icon: Settings,
    accessOnly: "USER",
  },
];

export default function DashboardSidebar() {
  const { user, logout } = useAuthStore();
  return (
    <div className="hidden lg:flex flex-col w-64 h-full shadow-lg">
      <h1 className="text-lg font-bold p-4 mb-14">
        <Link
          href="/dashboard"
          className="flex items-center space-x-2 font-bold text-xl text-black"
        >
          <Brain className="h-6 w-6 text-[#6C5CE7]" />
          <span>QuizzyNest</span>
        </Link>
      </h1>
      <ul className="flex-grow space-y-3">
        {items.map(
          (item) =>
            (item.accessOnly === user?.role ||
              item.accessOnly === "ALLUSER") && (
              <li key={item.title} className="group px-2">
                <NavLink
                  href={item.url}
                  activeClassName="text-primary border border-primary rounded-lg"
                  className="flex items-center gap-4 px-4 py-3 hover:text-primary transition-colors"
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                </NavLink>
              </li>
            )
        )}
      </ul>
      <div className="flex items-center px-4 h-16 gap-4">
        <Avatar>
          <AvatarImage
            src={
              user?.profile?.profilePic ||
              "https://img.icons8.com/officel/100/user.png"
            }
            className="object-cover"
            alt="User Avatar"
          />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <span className="font-medium text-sm">{user?.fullName}</span>
        <Button
          variant="outline"
          size="icon"
          onClick={logout}
          className="flex items-center text-red-400 hover:text-red-300"
        >
          <RiLogoutCircleRLine className="w-5 h-5" />
          <span className="sr-only">Log out</span>
        </Button>
      </div>
    </div>
  );
}
