
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  Clock,
  ShoppingCart,
  MapPin,
  BellRing,
  CheckCircle,
  AlertCircle,
  Battery,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

// Mock cart data
const mockCarts = [
  {
    id: "CART-123",
    customer: "John Doe",
    status: "active",
    items: 5,
    location: "Aisle 3",
    lastActive: new Date(Date.now() - 2 * 60 * 1000), // 2 minutes ago
    battery: 85,
  },
  {
    id: "CART-456",
    customer: "Jane Smith",
    status: "active",
    items: 12,
    location: "Aisle 7",
    lastActive: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
    battery: 72,
  },
  {
    id: "CART-789",
    customer: "Sam Wilson",
    status: "idle",
    items: 3,
    location: "Aisle 2",
    lastActive: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
    battery: 65,
  },
  {
    id: "CART-235",
    customer: "Maria Garcia",
    status: "active",
    items: 8,
    location: "Produce Section",
    lastActive: new Date(),
    battery: 90,
  },
  {
    id: "CART-567",
    customer: "David Lee",
    status: "assistance",
    items: 6,
    location: "Dairy Section",
    lastActive: new Date(Date.now() - 1 * 60 * 1000), // 1 minute ago
    battery: 78,
  },
  {
    id: "CART-890",
    customer: null,
    status: "charging",
    items: 0,
    location: "Charging Station",
    lastActive: new Date(Date.now() - 120 * 60 * 1000), // 2 hours ago
    battery: 30,
  },
];

const CartMonitor: React.FC = () => {
  const navigate = useNavigate();
  const [carts, setCarts] = useState(mockCarts);
  const [filter, setFilter] = useState<string>("all");

  const filteredCarts = carts.filter((cart) => {
    if (filter === "all") return true;
    return cart.status === filter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <ShoppingCart className="h-4 w-4 text-green-500" />;
      case "idle":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "assistance":
        return <BellRing className="h-4 w-4 text-red-500" />;
      case "charging":
        return <Battery className="h-4 w-4 text-blue-500" />;
      default:
        return <CheckCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const getBatteryColor = (level: number) => {
    if (level > 70) return "bg-green-500";
    if (level > 30) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-light">
      <header className="bg-neutral-dark text-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-6 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/admin/dashboard")}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold">Cart Monitor</h1>
        </div>
      </header>

      <main className="flex-1 p-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
          <h2 className="text-2xl font-bold">Active Carts</h2>
          
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => setFilter("all")}
            >
              All
            </Button>
            <Button
              size="sm"
              variant={filter === "active" ? "default" : "outline"}
              onClick={() => setFilter("active")}
            >
              Active
            </Button>
            <Button
              size="sm"
              variant={filter === "idle" ? "default" : "outline"}
              onClick={() => setFilter("idle")}
            >
              Idle
            </Button>
            <Button
              size="sm"
              variant={filter === "assistance" ? "default" : "outline"}
              onClick={() => setFilter("assistance")}
            >
              Needs Help
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-light">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cart ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Location
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Active
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Battery
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCarts.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                      No carts matching the selected filter
                    </td>
                  </tr>
                ) : (
                  filteredCarts.map((cart) => (
                    <tr key={cart.id} className={cart.status === "assistance" ? "bg-red-50" : ""}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {cart.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {cart.customer || "—"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          {getStatusIcon(cart.status)}
                          <span className="ml-2 capitalize">
                            {cart.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {cart.items}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm flex items-center">
                        <MapPin className="h-3 w-3 mr-1 text-gray-400" />
                        {cart.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDistanceToNow(cart.lastActive, { addSuffix: true })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center">
                          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-full ${getBatteryColor(cart.battery)}`}
                              style={{ width: `${cart.battery}%` }}
                            />
                          </div>
                          <span className="ml-2 text-xs">{cart.battery}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                        <Button size="sm" variant="outline">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartMonitor;
