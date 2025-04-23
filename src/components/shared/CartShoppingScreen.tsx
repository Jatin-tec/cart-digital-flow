
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart as ShoppingCartIcon,
  Barcode,
  Bell,
  Camera,
  Trash2,
  CreditCard,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useCartDevice } from "@/contexts/CartDeviceContext";
import CartItemList from "@/components/shared/CartItemList";
import BarcodeScanner from "@/components/shared/BarcodeScanner";
import ItemDetailsModal from "@/components/shared/ItemDetailsModal";
import AssistanceRequestModal from "@/components/shared/AssistanceRequestModal";
import { getProductByBarcode } from "@/services/productService";
import { Product } from "@/services/productService";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

interface CartShoppingScreenProps {
  isCartDisplay?: boolean;
}

const CartShoppingScreen: React.FC<CartShoppingScreenProps> = ({ isCartDisplay = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  let cart, addItem, removeItem, totalItems, totalPrice, refreshCartItems, loading;
  let setCartSessionId;
  let cartSessionId = null;
  let cartItems = [];

  // Select the correct context depending on mode
  if (isCartDisplay) {
    // Cart Device UI
    const device = useCartDevice();
    console.log(device)
    addItem = device.addItem;
    removeItem = device.removeItem;
    totalItems = device.totalItems;
    totalPrice = device.totalPrice;
    refreshCartItems = device.refreshCartItems;
    loading = device.loading;
    setCartSessionId = device.setCartSessionId;
    cartSessionId = device.cartSessionId;
    cart = location.state?.cartId || device.cartSessionId || "Unknown";
    cartItems = device.items;
  } else {
    // Customer/mobile UI
    const customer = useCart();
    addItem = customer.addItem;
    removeItem = customer.removeItem;
    totalItems = customer.totalItems;
    totalPrice = customer.totalPrice;
    refreshCartItems = customer.refreshCartItems;
    loading = customer.loading;
    cart = user?.cart?.cartId || location.state?.cartId || "Unknown";
    cartItems = customer.items;
  }

  // Set cart session id for CartDevice context from navigation.state
  useEffect(() => {
    if (isCartDisplay && setCartSessionId && location.state?.sessionId) {
      setCartSessionId(location.state.sessionId);
    }
    // Only want to do this once on mount or if sessionId changes
    // eslint-disable-next-line
  }, [isCartDisplay, location.state?.sessionId]);


  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isAssistanceModalOpen, setIsAssistanceModalOpen] = useState(false);
  const [scannedProduct, setScannedProduct] = useState<Product | null>(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const handleScan = async (barcode: string) => {
    setIsScannerOpen(false);
    try {
      let added: boolean = false;
      // Both contexts return boolean
      added = await addItem(barcode, 1);
      if (added) return;
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
                {loading && (
                  <span className="animate-spin h-4 w-4 mr-2">⏳</span>
                )}
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
          <div className="max-w-2xl w-full mx-auto p-4 grid grid-cols-3 gap-3">
            <Button
              variant="destructive"
              className="flex flex-col items-center justify-center h-16"
              onClick={() => {}} // Optionally support remove mode
              disabled={false}
            >
              <span>Remove Mode</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-16"
              onClick={() => setIsAssistanceModalOpen(true)}
            >
              <span>Assistance</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-16"
              disabled={true}
            >
              <span>Cart View</span>
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

export default CartShoppingScreen;
