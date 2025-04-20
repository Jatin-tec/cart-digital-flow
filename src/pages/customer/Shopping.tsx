
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Barcode,
  Bell,
  Camera,
  Trash2,
  CreditCard,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import CartItemList from "@/components/shared/CartItemList";
import BarcodeScanner from "@/components/shared/BarcodeScanner";
import ItemDetailsModal from "@/components/shared/ItemDetailsModal";
import AssistanceRequestModal from "@/components/shared/AssistanceRequestModal";
import { getProductByBarcode } from "@/services/productService";
import { Product } from "@/services/productService";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

const Shopping: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { 
    totalItems, 
    totalPrice, 
    removeMode, 
    toggleRemoveMode, 
    addItem,
    refreshCartItems,
    loading: cartLoading 
  } = useCart();
  
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isAssistanceModalOpen, setIsAssistanceModalOpen] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Initial cart refresh when component mounts
  useEffect(() => {
    const loadCartData = async () => {
      setIsRefreshing(true);
      try {
        await refreshCartItems();
      } catch (error) {
        console.error("Error refreshing cart data:", error);
      } finally {
        setIsRefreshing(false);
      }
    };

    loadCartData();
  }, []);

  const handleScan = async (barcode: string) => {
    setIsScannerOpen(false);
    
    try {
      // First, try to add the item directly to cart
      const added = await addItem(barcode, 1);
      
      if (added) {
        // If successful, no need to show product details
        return;
      }
      
      // If adding to cart failed, try to get product details to show modal
      const product = await getProductByBarcode(barcode);
      if (product) {
        setScannedProduct(product);
        setIsProductModalOpen(true);
      } else {
        toast.error("Product not found");
      }
    } catch (error) {
      console.error("Error scanning product:", error);
      toast.error("Error scanning product");
    }
  };

  const handleCheckout = () => {
    navigate("/customer/checkout");
  };

  const cartId = user?.cart?.cartId || "Unknown";

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-900">Qout</h1>
          <div className="text-sm text-gray-600">Cart #{cartId}</div>
        </div>
      </header>

      <main className="flex-1 flex flex-col bg-neutral-light">
        <div className="flex-1 max-w-2xl w-full mx-auto p-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-primary text-white flex justify-between items-center">
              <div className="flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                <span className="font-medium">Your Cart</span>
              </div>
              <div className="flex items-center">
                {(isRefreshing || cartLoading) && (
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                )}
                <span className="text-sm">{totalItems} items</span>
              </div>
            </div>

            <div className="divide-y">
              <CartItemList />
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
          <div className="max-w-2xl w-full mx-auto p-4 grid grid-cols-3 gap-3">
            <Button
              variant={removeMode ? "destructive" : "outline"}
              className="flex flex-col items-center justify-center h-16"
              onClick={toggleRemoveMode}
            >
              <Trash2 className="h-6 w-6 mb-1" />
              <span className="text-xs">{removeMode ? "Cancel" : "Remove"}</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-16"
              onClick={() => setIsAssistanceModalOpen(true)}
            >
              <Bell className="h-6 w-6 mb-1" />
              <span className="text-xs">Assistance</span>
            </Button>
            
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-16"
              disabled={true} // This would be connected to a real camera API
            >
              <Camera className="h-6 w-6 mb-1" />
              <span className="text-xs">Cart View</span>
            </Button>
          </div>
          
          <div className="max-w-2xl w-full mx-auto p-4 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              className="flex items-center justify-center h-12"
              onClick={() => setIsScannerOpen(true)}
              disabled={cartLoading}
            >
              <Barcode className="mr-2 h-5 w-5" />
              Scan Item
            </Button>
            
            <Button
              className="flex items-center justify-center h-12"
              onClick={handleCheckout}
              disabled={totalItems === 0 || cartLoading}
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

      <ItemDetailsModal
        product={scannedProduct}
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
      />

      <AssistanceRequestModal
        isOpen={isAssistanceModalOpen}
        onClose={() => setIsAssistanceModalOpen(false)}
      />
    </div>
  );
};

export default Shopping;
