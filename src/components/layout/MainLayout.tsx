
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
import { UserRole } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";

interface MainLayoutProps {
  requiredRole?: UserRole | UserRole[];
}

const MainLayout: React.FC<MainLayoutProps> = ({ requiredRole }) => {
  const { user, isAuthenticated, loading } = useAuth();

  // Wait for the loading state to complete before rendering
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  // If no role is required, render the outlet
  if (!requiredRole) return <Outlet />;

  // Check if user is authenticated after the auto-login effect
  if (!user || !isAuthenticated) return <Navigate to="/login" />;

  // Check if user has required role
  const hasRequiredRole = Array.isArray(requiredRole)
    ? requiredRole.includes(user?.user?.role)
    : user?.user?.role === requiredRole;

  if (!hasRequiredRole) {
    // Redirect to appropriate page based on user role
    switch (user?.user?.role) {
      case "customer":
        return <Navigate to="/customer" />;
      case "manager":
        return <Navigate to="/admin" />;
      default:
        return <Navigate to="/login" />;
    }
  }

  return <Outlet />;
};

export default MainLayout;
