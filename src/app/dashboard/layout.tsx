import { DashboardMobileNavbar } from "@/components/dashboard/dashboard-mobile-navbar/dashboard-mobile-navbar";
import DashboardSidebar from "@/components/dashboard/dashboard-sidebar/dashboard-sidebar";
import PrivateRoute from "@/components/private-route/private-route";
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <PrivateRoute>
      <div className="lg:h-screen lg:py-8 lg:bg-gray-50">
        <div className="h-full flex flex-col lg:flex-row lg:border lg:rounded-3xl bg-white container mx-auto p-0 overflow-hidden">
          <DashboardSidebar />
          <main className="flex-1 overflow-hidden overflow-y-auto relative">
            {children}
          </main>
        </div>
        <div className="h-16 lg:hidden" />
        <DashboardMobileNavbar />
      </div>
    </PrivateRoute>
  );
}
