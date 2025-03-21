import DashboardSidebar from "@/components/dashboard/dashboard-sidebar/dashboard-sidebar";
import { ReactNode } from "react";

// Simulated authentication check (replace with your auth logic)
const checkAuth = () => {
  const isAuthenticated = true; // Replace with real auth check
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    if (typeof window !== "undefined") {
      window.location.href = "/login";
    }
    return null;
  }
  return true;
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  if (!checkAuth()) return null;

  return (
    <div className="h-screen py-8 bg-gray-50">
      <div className="h-full flex border overflow-hidden rounded-4xl bg-white container mx-auto">
        <DashboardSidebar />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
