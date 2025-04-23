import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart as ShoppingCartIcon,
  Barcode,
  CreditCard,
  Loader2,
} from "lucide-react";
import CartItemList from "@/components/shared/CartItemList";
import BarcodeScanner from "@/components/shared/BarcodeScanner";
import AssistanceRequestModal from "@/components/shared/AssistanceRequestModal";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";
import useCartOperations from "@/hooks/useCartOperations";

interface CartShoppingScreenProps {
  isCartDisplay?: boolean;
}

const CartShoppingScreen: React.FC<CartShoppingScreenProps> = ({ isCartDisplay = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    cart,
    cartItems,
    totalItems,
    totalPrice,
    loading,
    addItem,
    removeItem,
    refreshCartItems,
    setCartSessionId,
  } = useCartOperations(isCartDisplay, location);

  useEffect(() => {
    if (isCartDisplay && setCartSessionId && location.state?.sessionId) {
      setCartSessionId(location.state.sessionId);
    }
  }, [isCartDisplay, location.state?.sessionId, setCartSessionId]);

  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isAssistanceModalOpen, setIsAssistanceModalOpen] = useState(false);

  const handleScan = async (barcode: string) => {
    setIsScannerOpen(false);
    try {
      const added = await addItem(barcode, 1);
      if (!added) toast.error("Something went wrong");
    } catch (error) {
      console.error("Error scanning product:", error);
      toast.error("Error scanning product");
    }
  };

  const handleCheckout = () => {
    if (isCartDisplay) {
      toast.info("Checkout only available from customer app.");
    } else {
      navigate("/customer/checkout");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Smart Cart</h1>
          <div className="text-sm text-gray-600">Cart #{cart}</div>
        </div>
      </header>
      <main className="flex-1 flex flex-col bg-neutral-light">
        <div className="flex-1 max-w-2xl w-full mx-auto p-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-primary text-white flex justify-between items-center">
              <div className="flex items-center">
                <ShoppingCartIcon className="mr-2 h-5 w-5" />
                <span className="font-medium">Your Cart</span>
              </div>
              <div className="flex items-center">
                {loading && <Loader2 className="animate-spin h-4 w-4 mr-2" />}
                <span className="text-sm">{totalItems} items</span>
              </div>
            </div>
            <div className="divide-y">
              <CartItemList
                viewOnly={false}
                items={cartItems}
                removeItem={removeItem}
                loading={loading}
              />
            </div>
            <div className="p-4 bg-neutral-light border-t">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Subtotal</span>
                <span className="font-medium">{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600">Tax (10%)</span>
                <span className="font-medium">{formatCurrency(totalPrice * 0.1)}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total</span>
                <span>{formatCurrency(totalPrice * 1.1)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
          <div className="max-w-2xl w-full mx-auto p-4 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-16"
              onClick={() => setIsAssistanceModalOpen(true)}
            >
              Assistance
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-16"
              disabled
            >
              Cart View
            </Button>
          </div>
          <div className="max-w-2xl w-full mx-auto p-4 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="flex items-center justify-center h-12"
              onClick={() => setIsScannerOpen(true)}
              disabled={loading}
            >
              <Barcode className="mr-2 h-5 w-5" />
              Scan Item
            </Button>
            <Button
              className="flex items-center justify-center h-12"
              onClick={handleCheckout}
              disabled={totalItems === 0 || loading}
            >
              <CreditCard className="mr-2 h-5 w-5" />
              Checkout
            </Button>
          </div>
        </div>
      </main>
      <BarcodeScanner
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScan={handleScan}
      />
      <AssistanceRequestModal
        isOpen={isAssistanceModalOpen}
        onClose={() => setIsAssistanceModalOpen(false)}
      />
    </div>
  );
};

export default CartShoppingScreen;
