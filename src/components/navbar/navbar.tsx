"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
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
import useAuthStore from "@/stores/authStore";
import { cn } from "@/lib/utils";

// Constants
const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Contact", href: "/contact" },
] as const;

type NavLink = (typeof NAV_LINKS)[number];
export function Navbar() {
  const { setTheme, theme } = useTheme();
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [navBackground, setNavBackground] = useState("bg-transparent");
  const { isAuthenticated } = useAuthStore();

  const isHomePage = pathname === "/";
  const isLgHide: boolean =
    pathname.includes("dashboard") || pathname.includes("quiz");

  // Handle scroll effect for background
  useEffect(() => {
    const updateBackground = () => {
      if (window.scrollY > 100) {
        setNavBackground(
          "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        );
      } else {
        setNavBackground("bg-transparent");
      }
    };

    if (!isHomePage) {
      setNavBackground(
        "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      );
    } else {
      updateBackground();
      window.addEventListener("scroll", updateBackground);
    }

    return () => {
      window.removeEventListener("scroll", updateBackground);
    };
  }, [isHomePage]);

  // Toggle theme between light and dark
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header
      className={cn(
        "sticky top-0 left-0 w-full z-50 transition-all duration-500",
        `${navBackground} ${isLgHide ? "lg:hidden" : ""}`
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex h-16 items-center justify-between">
          {/* Brand Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 font-bold text-xl text-foreground hover:text-foreground/80"
          >
            <Brain className="h-6 w-6" />
            <span>QuizzyNest</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex gap-8">
              {NAV_LINKS.map((link) => (
                <NavItem key={link.href} link={link} />
              ))}
            </div>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            {/* User Menu */}
            <div className="hidden md:block">
              {isAuthenticated ? <UserDropdown /> : <AuthLinks />}
            </div>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-gray-300 hover:text-white"
                >
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300"
              >
                <MobileMenu
                  isAuthenticated={isAuthenticated}
                  onClose={() => setIsMobileMenuOpen(false)}
                />
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  );
}

// Navigation Item Component
function NavItem({ link }: { link: NavLink }) {
  return (
    <Link
      href={link.href}
      className="text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
    >
      {link.name}
    </Link>
  );
}

// Theme Toggle Component
function ThemeToggle({
  theme,
  toggleTheme,
}: {
  theme?: string;
  toggleTheme: () => void;
}) {
  return (
    <Button
      variant="ghost"
      size="lg"
      onClick={toggleTheme}
      className="text-foreground/60 hover:text-foreground hover:bg-accent"
    >
      {theme === "dark" ? (
        <Sun className="size-6" />
      ) : (
        <Moon className="size-6" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

// User Dropdown Component
function UserDropdown() {
  const { user, logout } = useAuthStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full ring-2 ring-border hover:ring-border/80"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.profile?.profilePic}
              alt={`${user?.fullName}'s avatar`}
            />
            <AvatarFallback className="dark:bg-gray-800 dark:text-gray-200">
              {user?.fullName?.charAt(0)?.toUpperCase() || "UN"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-56 bg-popover border-border"
        align="end"
      >
        <DropdownMenuItem asChild>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-400 hover:text-red-300"
          onClick={logout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Authentication Links Component
function AuthLinks() {
  return (
    <div className="flex items-center gap-4">
      <Link
        href="/login"
        className="text-sm font-medium text-foreground/60 hover:text-foreground"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="text-sm font-medium text-foreground/60 hover:text-foreground"
      >
        Sign up
      </Link>
    </div>
  );
}

// Mobile Menu Component
function MobileMenu({
  isAuthenticated,
  onClose,
}: {
  isAuthenticated: boolean;
  onClose: () => void;
}) {
  const { logout } = useAuthStore();

  return (
    <div className="flex flex-col gap-6 mt-6 p-4">
      {NAV_LINKS.map((link: { name: string; href: string }) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onClose}
          className="text-base font-medium text-foreground/60 hover:text-foreground"
        >
          {link.name}
        </Link>
      ))}
      <div className="flex flex-col gap-4 pt-6 border-t border-border">
        {isAuthenticated ? (
          <>
            <Link
              href="/dashboard"
              onClick={onClose}
              className="text-base font-medium hover:text-gray-900 dark:hover:text-white"
            >
              Dashboard
            </Link>
            <Link
              href="/profile"
              onClick={onClose}
              className="text-base font-medium hover:text-gray-900 dark:hover:text-white"
            >
              Profile
            </Link>
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="text-base font-medium text-red-400 hover:text-red-300 text-left"
            >
              Log out
            </button>
          </>
        ) : (
          <>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/login" onClick={onClose}>
                Login
              </Link>
            </Button>
            <Button asChild variant="secondary" className="w-full">
              <Link href="/signup" onClick={onClose}>
                Sign up
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
