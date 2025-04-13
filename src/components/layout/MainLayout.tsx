
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
import { UserRole } from "@/contexts/AuthContext";

interface MainLayoutProps {
  requiredRole?: UserRole | UserRole[];
}

const MainLayout: React.FC<MainLayoutProps> = ({ requiredRole }) => {
  const { user, isAuthenticated } = useAuth();

  // If no role is required, render the outlet
  if (!requiredRole) {
    return <Outlet />;
  }

  // Check if user is authenticated
  if (!isAuthenticated || !user) {
    return <Navigate to="/" />;
  }

  // Check if user has required role
  const hasRequiredRole = Array.isArray(requiredRole) 
    ? requiredRole.includes(user.role)
    : user.role === requiredRole;

  if (!hasRequiredRole) {
    // Redirect to appropriate page based on user role
    switch (user.role) {
      case "customer":
        return <Navigate to="/customer" />;
      case "cart":
        return <Navigate to="/cart" />;
      case "admin":
        return <Navigate to="/admin" />;
      default:
        return <Navigate to="/" />;
    }
  }

  return <Outlet />;
};

export default MainLayout;
