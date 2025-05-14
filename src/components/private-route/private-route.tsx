"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/authStore";

interface PrivateRouteProps {
  children: React.ReactNode;
  roles?: string[];
}

const PrivateRoute = ({ children, roles = [] }: PrivateRouteProps) => {
  const router = useRouter();
  const { user, isAuthenticated, accessToken, loading, logout } =
    useAuthStore();
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    setIsPageLoading(false);
  }, []);

  useEffect(() => {
    // Check authentication
    if (loading || isPageLoading) return; // Wait for session check

    try {
      if (!isAuthenticated || !accessToken) {
        logout();
        router.push(
          `/login?returnUrl=${encodeURIComponent(window.location.pathname)}`
        );
        return;
      }

      // Check role-based access
      if (roles.length && !roles.includes(user?.role as string)) {
        logout();
        router.push(
          `/login?returnUrl=${encodeURIComponent(window.location.pathname)}`
        );
        return;
      }
    } catch {
      router.push("/");
    }
  }, [
    isAuthenticated,
    accessToken,
    router,
    roles,
    loading,
    user,
    logout,
    isPageLoading,
  ]);

  // Show loading state while checking session
  if (loading || isPageLoading) {
    return (
      <div className="absolute inset-0 flex justify-center items-center bg-white">
        Loading...
      </div>
    );
  }

  // Show children only if authenticated and authorized
  if (
    isAuthenticated &&
    (!roles.length || roles.includes(user?.role as string))
  ) {
    return <>{children}</>;
  }
  return null;
};

export default PrivateRoute;
