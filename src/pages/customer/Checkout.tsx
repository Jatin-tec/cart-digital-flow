
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import CartItemList from "@/components/shared/CartItemList";
import { formatCurrency } from "@/lib/utils";

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { totalPrice, items } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBackToShopping = () => {
    navigate("/customer/shopping");
  };

  const handleConfirmCheckout = () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      navigate("/customer/confirmation");
    }, 2000);
  };

  const tax = totalPrice * 0.1;
  const total = totalPrice + tax;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleBackToShopping}
            className="mr-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-xl font-semibold text-gray-900">Checkout</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col bg-neutral-light">
        <div className="flex-1 max-w-2xl w-full mx-auto p-4 space-y-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-primary text-white">
              <h2 className="font-medium">Order Summary</h2>
            </div>

            <div className="divide-y">
              <CartItemList viewOnly />
            </div>

            <div className="p-4 bg-neutral-light border-t space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="font-medium">{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Tax (10%)</span>
                <span className="font-medium">{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold pt-2 border-t">
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4">
            <h3 className="font-medium mb-4">Payment Method</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 border rounded-md bg-neutral-light">
                <input
                  type="radio"
                  id="pay-in-store"
                  name="payment"
                  checked
                  readOnly
                  className="h-4 w-4 text-primary"
                />
                <label
                  htmlFor="pay-in-store"
                  className="flex-1 flex justify-between"
                >
                  <span>Pay in store</span>
                  <span className="text-sm text-gray-600">Recommended</span>
                </label>
              </div>
              
              <div className="flex items-center space-x-3 p-3 border rounded-md text-gray-400">
                <input
                  type="radio"
                  id="pay-online"
                  name="payment"
                  disabled
                  className="h-4 w-4"
                />
                <label
                  htmlFor="pay-online"
                  className="flex-1 flex justify-between"
                >
                  <span>Pay online</span>
                  <span className="text-sm">(Coming soon)</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="max-w-2xl w-full mx-auto p-4 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleBackToShopping}
              disabled={isProcessing}
            >
              Continue Shopping
            </Button>
            <Button onClick={handleConfirmCheckout} disabled={isProcessing || items.length === 0}>
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Confirm Checkout"
              )}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
