import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, ShoppingBag, Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useAssistance } from "@/contexts/AssistanceContext";
import Chart from "./Chart";
import Pchart from "./Pchart";
import { DashboardMetrics, startRealtimeUpdates } from "@/services/dashboardService";
import TopSellingItems from "./components/TopSellingItems";
import QuickStats from "./components/QuickStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart } from "lucide-react";

const categoryPerformance = {
  "Electronics": { growth: 15.2, revenue: 45000 },
  "Fashion": { growth: -2.8, revenue: 32000 },
  "Home & Garden": { growth: 8.4, revenue: 28000 },
  "Sports": { growth: 5.1, revenue: 21000 },
  "Books": { growth: 1.2, revenue: 18000 }
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { requests } = useAssistance();
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);

  const activeRequests = requests.filter((req) => !req.resolved);

  useEffect(() => {
    const cleanup = startRealtimeUpdates((newMetrics) => {
      setMetrics(newMetrics);
    });

    return () => cleanup();
  }, []);

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
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <div className="text-sm text-muted-foreground">
              Last updated: {metrics?.timestamp ? new Date(metrics.timestamp).toLocaleTimeString() : 'Loading...'}
            </div>
          </div>

          {/* Quick Actions Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Button
              className="flex items-center justify-center gap-2 h-auto py-4"
              onClick={() => navigate("/admin/carts")}
            >
              <ShoppingBag className="h-5 w-5" />
              View All Carts
            </Button>
            <Button
              className="flex items-center justify-center gap-2 h-auto py-4"
              onClick={() => navigate("/admin/inventory")}
            >
              <ShoppingBag className="h-5 w-5" />
              Inventory Management
            </Button>
            <Button
              className="flex items-center justify-center gap-2 h-auto py-4 relative"
              onClick={() => navigate("/admin/assistance")}
            >
              <Users className="h-5 w-5" />
              Assistance Requests
              {activeRequests.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {activeRequests.length}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mb-8">
          <QuickStats metrics={metrics} activeRequests={activeRequests.length} />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sales Overview Chart */}
          <div className="lg:col-span-2">
            <Chart />
          </div>
          
          {/* Top Selling Items */}
          <div>
            <TopSellingItems />
          </div>

          {/* Sales Distribution Chart */}
          <div className="lg:col-span-2">
            <Pchart />
          </div>

          {/* Additional Stats Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <PieChart className="h-5 w-5" />
                Category Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(categoryPerformance).map(([category, { growth, revenue }]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{category}</p>
                      <p className="text-xs text-muted-foreground">
                        ${revenue.toLocaleString()} revenue
                      </p>
                    </div>
                    <div className={`text-sm ${growth >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {growth > 0 ? '+' : ''}{growth}%
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
