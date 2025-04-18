
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Clock,
  BellRing,
  Map,
  LogOut,
  ShoppingBag,
  Users,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useAssistance } from "@/contexts/AssistanceContext";
import Chart from "./Chart";
import Pchart from "./Pchart";


const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { requests } = useAssistance();

  const activeRequests = requests.filter((req) => !req.resolved);

  // Mock data for dashboard
  const activeCarts = 12;
  const idleCarts = 3;
  const totalCustomers = 15;

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-light">
      <header className="bg-neutral-dark text-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-6 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Qout Admin</h1>
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Active Carts</p>
                <p className="text-3xl font-bold mt-2">{activeCarts}</p>
              </div>
              <div className="bg-primary-light p-3 rounded-full">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <span className="text-green-600 font-medium">+5% </span>
              from yesterday
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Idle Carts</p>
                <p className="text-3xl font-bold mt-2">{idleCarts}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <span className="text-red-600 font-medium">+2 </span>
              in last hour
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Assistance Calls</p>
                <p className="text-3xl font-bold mt-2">{activeRequests.length}</p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <BellRing className="h-6 w-6 text-red-500" />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <Button
                size="sm"
                variant="link"
                className="p-0 h-auto"
                onClick={() => navigate("/admin/assistance")}
              >
                View all requests
              </Button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-gray-500">Total Customers</p>
                <p className="text-3xl font-bold mt-2">{totalCustomers}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <span className="text-green-600 font-medium">+12% </span>
              from last week
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <Pchart/>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="font-medium mb-4 flex items-center">
              <ShoppingBag className="mr-2 h-5 w-5 text-primary" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Button
                className="w-full justify-start"
                onClick={() => navigate("/admin/carts")}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                View All Carts
              </Button>
              <Button
                className="w-full justify-start"
                onClick={() => navigate("/admin/inventory")}
              >
                <ShoppingBag className="mr-2 h-4 w-4" />
                Inventory Management
              </Button>
              <Button
                className="w-full justify-start"
                onClick={() => navigate("/admin/assistance")}
              >
                <BellRing className="mr-2 h-4 w-4" />
                Assistance Requests
                {activeRequests.length > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {activeRequests.length}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        <div className="py-3 w-full">
          <Chart />
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
