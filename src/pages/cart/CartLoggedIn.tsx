
import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useAssistance } from "@/contexts/AssistanceContext";
import CartItemList from "@/components/shared/CartItemList";
import { formatCurrency } from "@/lib/utils";
import { Clock, BellRing } from "lucide-react";

const CartLoggedIn: React.FC = () => {
  const { user } = useAuth();
  const { items, totalItems, totalPrice } = useCart();
  const { activeRequest } = useAssistance();
  const [isIdle, setIsIdle] = useState(false);
  const [idleTime, setIdleTime] = useState(0);
  const idleTimeout = 60; // seconds before cart is considered idle
  
  const tax = totalPrice * 0.1;
  const total = totalPrice + tax;
  
  // Idle timer
  useEffect(() => {
    let interval: number | undefined;
    
    if (user) {
      interval = window.setInterval(() => {
        setIdleTime(prev => {
          const newTime = prev + 1;
          if (newTime >= idleTimeout && !isIdle) {
            setIsIdle(true);
          }
          return newTime;
        });
      }, 1000);
    }
    
    // Reset idle time on user activity
    const resetIdleTime = () => {
      setIdleTime(0);
      setIsIdle(false);
    };
    
    window.addEventListener("mousemove", resetIdleTime);
    window.addEventListener("keypress", resetIdleTime);
    window.addEventListener("touchstart", resetIdleTime);
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
      window.removeEventListener("mousemove", resetIdleTime);
      window.removeEventListener("keypress", resetIdleTime);
      window.removeEventListener("touchstart", resetIdleTime);
    };
  }, [user, isIdle]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-dark text-white">
      <header className="bg-primary shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold">Smart Cart</h1>
            <span className="ml-2 text-sm opacity-80">#{user?.cartId}</span>
          </div>
          <div className="text-sm">
            {user?.name ? `Welcome, ${user.name}` : "Welcome!"}
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col p-6">
        {activeRequest && (
          <div className="bg-secondary text-white p-4 mb-6 rounded-lg flex items-center animate-pulse">
            <BellRing className="h-5 w-5 mr-2" />
            <span>An associate is on the way to assist you</span>
          </div>
        )}
        
        {isIdle && (
          <div className="bg-yellow-500 text-white p-4 mb-6 rounded-lg flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            <span>Cart inactive. Touch screen to continue shopping.</span>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden text-neutral-dark mb-6 flex-1">
          <div className="p-4 bg-primary text-white flex justify-between items-center">
            <div className="flex items-center">
              <span className="font-medium">Your Cart</span>
            </div>
            <div className="text-sm">{totalItems} items</div>
          </div>

          {items.length > 0 ? (
            <>
              <div className="overflow-y-auto max-h-[calc(100vh-300px)]">
                <CartItemList viewOnly />
              </div>
              
              <div className="p-4 bg-neutral-light border-t">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Subtotal</span>
                  <span className="font-medium">{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-600">Tax (10%)</span>
                  <span className="font-medium">{formatCurrency(tax)}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <div className="mb-4 text-neutral text-4xl">🛒</div>
              <h3 className="text-lg font-medium">Your cart is empty</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Scan items to add them to your cart
              </p>
            </div>
          )}
        </div>
        
        <div className="bg-white rounded-lg text-neutral-dark p-4">
          <div className="text-center text-sm">
            <p className="font-medium">Need assistance?</p>
            <p>Use your phone app to call for help</p>
          </div>
        </div>
      </main>
      
      <footer className="bg-primary py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <div className="text-xs opacity-80">
            Smart Cart System
          </div>
          <div className="text-xs">
            Cart ID: {user?.cartId}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CartLoggedIn;
