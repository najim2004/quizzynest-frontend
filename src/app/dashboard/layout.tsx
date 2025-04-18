import { DashboardMobileNavbar } from "@/components/dashboard/dashboard-mobile-navbar/dashboard-mobile-navbar";
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
    <div className="lg:h-screen lg:py-8 lg:bg-gray-50">
      <div className="h-full flex lg:border lg:rounded-3xl bg-white container mx-auto p-0 overflow-hidden">
        <DashboardSidebar />
        <main className="flex-1 overflow-hidden overflow-y-auto relative">
          {children}
        </main>
      </div>
      <DashboardMobileNavbar />
    </div>
  );
}
