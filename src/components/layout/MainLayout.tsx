
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Outlet, Navigate } from "react-router-dom";
import { UserRole } from "@/contexts/AuthContext";

interface MainLayoutProps {
  requiredRole?: UserRole | UserRole[];
}

const MainLayout: React.FC<MainLayoutProps> = ({ requiredRole }) => {
  const { user, isAuthenticated, login } = useAuth();

  // For development purposes, auto-login based on the URL path
  React.useEffect(() => {
    // If not authenticated and we're trying to access a protected route
    if (!isAuthenticated && requiredRole) {
      const path = window.location.pathname;
      
      // Auto-login based on the path (but only for cart and admin, not customer)
      if (path.startsWith('/cart')) {
        login("cart", "Cart Screen", `CART-${Math.floor(100 + Math.random() * 900)}`);
      } else if (path.startsWith('/admin')) {
        login("admin", "Admin User");
      }
      // Customer role now uses the login page
    }
  }, [isAuthenticated, requiredRole, login]);

  // If no role is required, render the outlet
  if (!requiredRole) {
    return <Outlet />;
  }

  // Check if user is authenticated after the auto-login effect
  if (!isAuthenticated || !user) {
    console.log("User not authenticated, should have auto-logged in by now");
    // If customer role, redirect to login page
    if (typeof requiredRole === 'string' && requiredRole === 'customer') {
      return <Navigate to="/login" />;
    }
    return <Navigate to="/" />;
  }

  // Check if user has required role
  const hasRequiredRole = Array.isArray(requiredRole) 
    ? requiredRole.includes(user.role)
    : user.role === requiredRole;

  if (!hasRequiredRole) {
    // Redirect to appropriate page based on user role
    console.log(`User role ${user.role} doesn't match required role ${requiredRole}`);
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
