"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Moon, Sun, Menu, LogOut, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";

export function Navbar() {
  const { setTheme, theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [navBg, setNavBg] = useState("bg-transparent");

  const isLoggedIn = false; // Authentication Status (Change accordingly)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setNavBg("bg-white/90 dark:bg-gray-900/90 backdrop-blur-md");
      } else {
        setNavBg("bg-transparent");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navBg}`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 font-bold text-xl text-gray-900 dark:text-white"
          >
            <Brain />
            <span>QuizzyNest</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center justify-center flex-1 px-4">
            <div className="flex gap-8">
              {["Home", "About Us", "Contact"].map((name, index) => (
                <Link
                  key={index}
                  href={`/${name.toLowerCase().replace(" ", "-")}`}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* User Authentication */}
            <div className="hidden md:flex">
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full ring-2 ring-gray-400 dark:ring-gray-700 hover:ring-gray-600 dark:hover:ring-gray-500"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/avatars/01.png" alt="@username" />
                        <AvatarFallback className="bg-gray-800 text-gray-200">
                          UN
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-56 bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-200"
                    align="end"
                  >
                    <DropdownMenuItem asChild>
                      <Link href="/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-400 hover:text-red-300">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <div className="flex items-center gap-4">
                  <Link
                    href="/login"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    Login
                  </Link>
                  <Button
                    asChild
                    variant="secondary"
                    className="bg-gray-700 text-white hover:bg-gray-800 transition-colors"
                  >
                    <Link href="/signup">Sign up</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white md:hidden"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300 p-4"
              >
                <div className="flex flex-col gap-6 mt-6">
                  {["Home", "About Us", "Contact"].map((name, index) => (
                    <Link
                      key={index}
                      href={`/${name.toLowerCase().replace(" ", "-")}`}
                      onClick={() => setIsOpen(false)}
                      className="text-base font-medium hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {name}
                    </Link>
                  ))}
                  <div className="flex flex-col gap-4 pt-6 border-t border-gray-300 dark:border-gray-700">
                    {isLoggedIn ? (
                      <>
                        <Link
                          href="/dashboard"
                          className="text-base font-medium hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          Dashboard
                        </Link>
                        <Link
                          href="/profile"
                          className="text-base font-medium hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          Profile
                        </Link>
                        <button className="text-base font-medium text-red-400 hover:text-red-300 text-left">
                          Log out
                        </button>
                      </>
                    ) : (
                      <>
                        <Button
                          asChild
                          variant="secondary"
                          className="bg-gray-700 text-white hover:bg-gray-800"
                        >
                          <Link href="/login">Login</Link>
                        </Button>
                        <Button
                          asChild
                          variant="secondary"
                          className="bg-gray-700 text-white hover:bg-gray-800"
                        >
                          <Link href="/signup">Sign up</Link>
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}
