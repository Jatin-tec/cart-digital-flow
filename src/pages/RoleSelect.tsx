
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Smartphone, ShoppingCart, LayoutDashboard } from "lucide-react";

const RoleSelect: React.FC = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role: UserRole) => {
    switch (role) {
      case "customer":
        navigate("/login");
        break;
      case "admin":
        navigate("/login");
        break;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-neutral-light">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900 text-center">
            Smart Cart System
          </h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Select Role</h2>
            <p className="mt-2 text-gray-600">
              Choose which interface you want to access
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Button
              onClick={() => handleRoleSelect("customer")}
              variant="outline"
              className="h-auto flex flex-col items-center p-6 border-2 hover:border-primary"
            >
              <Smartphone className="h-10 w-10 mb-3" />
              <div>
                <h3 className="text-lg font-medium">Customer App</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Shop using the mobile PWA
                </p>
              </div>
            </Button>

            <Button
              onClick={() => handleRoleSelect("customer")}
              variant="outline"
              className="h-auto flex flex-col items-center p-6 border-2 hover:border-primary"
            >
              <ShoppingCart className="h-10 w-10 mb-3" />
              <div>
                <h3 className="text-lg font-medium">Smart Cart Display</h3>
                <p className="text-sm text-gray-600 mt-1">
                  View the cart's touch display interface
                </p>
              </div>
            </Button>

            <Button
              onClick={() => handleRoleSelect("admin")}
              variant="outline"
              className="h-auto flex flex-col items-center p-6 border-2 hover:border-primary"
            >
              <LayoutDashboard className="h-10 w-10 mb-3" />
              <div>
                <h3 className="text-lg font-medium">Store Admin</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Manage carts, inventory, and staff
                </p>
              </div>
            </Button>
          </div>
        </div>
      </main>

      <footer className="py-6">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          Smart Cart System · Demo Version
        </div>
      </footer>
    </div>
  );
};

export default RoleSelect;
