import { NavLink } from "@/components/navlink/navlink";
import { Brain, Home, PuzzleIcon, Settings, ShoppingCart, Ticket } from "lucide-react";
import { MdCategory, MdOutlineLeaderboard } from "react-icons/md";
import { RiLogoutCircleRLine } from "react-icons/ri";

import { IoExtensionPuzzleOutline } from "react-icons/io5";


import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Menu items.
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
    title:"Categories",
    url:"/dashboard/categories",
    icon:MdCategory
  },
  {
    title:"Quizzes",
    url:"/dashboard/quizzes",
    icon: PuzzleIcon
  },
  {
    title:"Vouchers",
    url:"/dashboard/vouchers",
    icon: Ticket
  },
  {
    title: "Settings",
    url: "/dashboard/#",
    icon: Settings,
  },
];

export default function DashboardSidebar() {
  return (
    <div className="hidden lg:flex flex-col w-64 h-full shadow-lg">
      <h1 className="text-lg font-bold p-4 mb-14">
        
        <Link
          href="/dashboard"
          className="flex items-center justify-center space-x-2 font-bold text-xl text-black"
        >
          <Brain className="h-6 w-6 text-[#6C5CE7]" />
          <span>QuizzyNest</span>
        </Link>
      </h1>
      <ul className="flex-grow">
        {items.map((item) => (
          <li key={item.title} className="group">
            <NavLink
              href={item.url}
              activeClassName="text-[#6C5CE7]"
              className="flex items-center gap-4 p-4 hover:text-[#6C5CE7] transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span>{item.title}</span>
            </NavLink>
          </li>
        ))}
      </ul>
      <div className="flex items-center px-4 h-16 gap-4">
        <Avatar>
          <AvatarImage src="/path/to/avatar.jpg" alt="User Avatar" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <span className="font-medium text-sm">Username</span>
        <button className="flex items-center text-red-400 hover:text-red-300">
          <RiLogoutCircleRLine className="w-5 h-5" />
          <span className="sr-only">Log out</span>
        </button>
      </div>
    </div>
  );
}
