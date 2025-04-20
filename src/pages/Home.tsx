
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Smartphone, ShoppingCart, LayoutDashboard } from "lucide-react";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-neutral-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">
            Qout Smart Cart
          </h1>
          <div>
            <Button onClick={() => navigate("/login")} variant="outline" className="mr-2">
              Log in
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Shop Smarter, Shop Faster
            </h2>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
              Revolutionary smart cart technology for a seamless shopping experience
            </p>
            <div className="mt-8 flex justify-center">
              <Button onClick={() => navigate("/login")} size="lg" className="px-8">
                Get Started
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900">
                Smart Cart Features
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center p-6 bg-neutral-50 rounded-lg shadow-sm">
                <Smartphone className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-medium text-gray-900">Customer App</h3>
                <p className="mt-2 text-center text-gray-500">
                  Scan products, track your cart, and checkout seamlessly
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-neutral-50 rounded-lg shadow-sm">
                <ShoppingCart className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-medium text-gray-900">Smart Cart</h3>
                <p className="mt-2 text-center text-gray-500">
                  Intelligent carts with real-time item tracking and weighing
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-neutral-50 rounded-lg shadow-sm">
                <LayoutDashboard className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-medium text-gray-900">Admin Dashboard</h3>
                <p className="mt-2 text-center text-gray-500">
                  Monitor carts, manage inventory, and analyze store data
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-between">
                <div className="bg-white px-4 flex flex-col items-center">
                  <div className="flex h-12 w-12 rounded-full bg-primary text-white items-center justify-center text-xl font-bold">1</div>
                  <h3 className="mt-3 text-lg font-medium">Scan QR Code</h3>
                </div>
                <div className="bg-white px-4 flex flex-col items-center">
                  <div className="flex h-12 w-12 rounded-full bg-primary text-white items-center justify-center text-xl font-bold">2</div>
                  <h3 className="mt-3 text-lg font-medium">Add Items</h3>
                </div>
                <div className="bg-white px-4 flex flex-col items-center">
                  <div className="flex h-12 w-12 rounded-full bg-primary text-white items-center justify-center text-xl font-bold">3</div>
                  <h3 className="mt-3 text-lg font-medium">Review Cart</h3>
                </div>
                <div className="bg-white px-4 flex flex-col items-center">
                  <div className="flex h-12 w-12 rounded-full bg-primary text-white items-center justify-center text-xl font-bold">4</div>
                  <h3 className="mt-3 text-lg font-medium">Checkout</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p>© 2025 Qout Smart Cart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
