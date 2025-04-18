
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
import { UserRole } from "@/contexts/AuthContext";

interface MainLayoutProps {
  requiredRole?: UserRole | UserRole[];
}

const MainLayout: React.FC<MainLayoutProps> = ({ requiredRole }) => {
  // const { user, isAuthenticated } = useAuth();

  // console.log(user, isAuthenticated, "main layout")

  // // If no role is required, render the outlet
  // if (!requiredRole) return <Outlet />;

  // // Check if user is authenticated after the auto-login effect
  // if (!user || !isAuthenticated) return <Navigate to="/login" />;

  // // Check if user has required role
  // const hasRequiredRole = Array.isArray(requiredRole)
  //   ? requiredRole.includes(user.user.role)
  //   : user.user.role === requiredRole;

  // if (!hasRequiredRole) {
  //   // Redirect to appropriate page based on user role
  //   console.log(`User role ${user.user.role} doesn't match required role ${requiredRole}`);
  //   switch (user.user.role) {
  //     case "customer":
  //       // if (user.cartId) return <Navigate to="/cart" />;
  //       return <Navigate to="/customer" />;
  //     case "admin":
  //       return <Navigate to="/admin" />;
  //     default:
  //       return <Navigate to="/login" />;
  //   }
  // }

  return <Outlet />;
};

export default MainLayout;
