
import React from "react";
import { Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";

// Customer PWA screens
import Login from "@/pages/Login"; // Add the login page
import Welcome from "@/pages/customer/Welcome";
import Connected from "@/pages/customer/Connected";
import Shopping from "@/pages/customer/Shopping";
import Checkout from "@/pages/customer/Checkout";
import Confirmation from "@/pages/customer/Confirmation";

// Cart Interface screens
import CartStartup from "@/pages/cart/CartStartup";
import CartLoggedIn from "@/pages/cart/CartLoggedIn";

// Admin Dashboard screens
import Dashboard from "@/pages/admin/Dashboard";
import CartMonitor from "@/pages/admin/CartMonitor";
import InventoryManagement from "@/pages/admin/InventoryManagement";
import AssistanceRequests from "@/pages/admin/AssistanceRequests";

// Role selection screen
import RoleSelect from "@/pages/RoleSelect";

const Routes: React.FC = () => {
  return (
    <RouterRoutes>
      {/* Role selection (for demo purposes) */}
      <Route path="/" element={<RoleSelect />} />
      
      {/* Customer Login Page */}
      <Route path="/login" element={<Login />} />
      
      {/* Customer PWA routes */}
      <Route path="customer" element={<MainLayout requiredRole="customer" />}>
        <Route index element={<Navigate to="/customer/welcome" />} />
        <Route path="welcome" element={<Welcome />} />
        <Route path="connected" element={<Connected />} />
        <Route path="shopping" element={<Shopping />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="confirmation" element={<Confirmation />} />
      </Route>
      
      {/* Cart Interface routes */}
      <Route path="cart" element={<MainLayout />}>
        <Route index element={<Navigate to="/cart/startup" />} />
        <Route path="startup" element={<CartStartup />} />
        <Route path="logged-in" element={<CartLoggedIn />} />
      </Route>
      
      {/* Admin Dashboard routes */}
      <Route path="admin" element={<MainLayout requiredRole="admin" />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="carts" element={<CartMonitor />} />
        <Route path="inventory" element={<InventoryManagement />} />
        <Route path="assistance" element={<AssistanceRequests />} />
      </Route>
      
      {/* Fallback route for any other paths */}
      <Route path="*" element={<Navigate to="/" />} />
    </RouterRoutes>
  );
};

export default Routes;
