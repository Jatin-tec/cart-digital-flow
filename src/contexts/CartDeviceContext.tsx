
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { toast } from "sonner";

export interface CartDeviceItem {
  id: string;
  barcode: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartDeviceContextType {
  items: CartDeviceItem[];
  addItem: (barcode: string, quantity: number) => Promise<boolean>;
  removeItem: (barcode: string) => Promise<boolean>;
  totalItems: number;
  totalPrice: number;
  refreshCartItems: () => Promise<void>;
  loading: boolean;
  cartSessionId: number | null;
  setCartSessionId: (sessionId: number | null) => void;
}

const CartDeviceContext = createContext<CartDeviceContextType | undefined>(undefined);

export const CartDeviceProvider = ({ children }: { children: ReactNode }) => {
  const [cartSessionId, setCartSessionId] = useState<number | null>(null);
  const [items, setItems] = useState<CartDeviceItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Poll for items when session is set (simulate interval polling)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (cartSessionId) {
      refreshCartItems(); // Initial load
      interval = setInterval(() => {
        refreshCartItems();
      }, 10000);
    }
    return () => interval && clearInterval(interval);
    // eslint-disable-next-line
  }, [cartSessionId]);

  const refreshCartItems = async () => {
    if (!cartSessionId) return;
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_API_HOST}/api/cart/cart/session/${cartSessionId}/`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch cart items");
      const session = await response.json();
      const sessionItems = session.items || [];
      // IMPORTANT: sessionItems is a list of { product, quantity }
      setItems(sessionItems.map((item: any) => ({
        id: item.product.barcode.toString(),
        barcode: item.product.barcode.toString(),
        name: item.product.name,
        price: parseFloat(item.product.price),
        quantity: item.quantity,
        image: item.product.image,
      })));
    } catch (err) {
      toast.error("Failed to refresh cart (cart device)");
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (barcode: string, quantity: number = 1) => {
    if (!cartSessionId) {
      toast.error("No cart session found");
      return false;
    }
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_API_HOST}/api/cart/cart/session/${cartSessionId}/add/`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ barcode, quantity }),
      });
      if (!response.ok) {
        toast.error("Failed to add item (cart)");
        return false;
      }
      await refreshCartItems();
      toast.success("Item added (cart)");
      return true;
    } catch (err) {
      toast.error("Failed to add item (cart)");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (barcode: string) => {
    if (!cartSessionId) {
      toast.error("No cart session found");
      return false;
    }
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_API_HOST}/api/cart/cart/session/${cartSessionId}/remove/`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ barcode }),
      });
      if (!response.ok) {
        toast.error("Failed to remove item (cart)");
        return false;
      }
      await refreshCartItems();
      toast.success("Item removed (cart)");
      return true;
    } catch (err) {
      toast.error("Failed to remove item (cart)");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const value = {
    items,
    addItem,
    removeItem,
    totalItems,
    totalPrice,
    refreshCartItems,
    loading,
    cartSessionId,
    setCartSessionId,
  };

  return <CartDeviceContext.Provider value={value}>{children}</CartDeviceContext.Provider>;
};

export const useCartDevice = () => {
  const ctx = useContext(CartDeviceContext);
  if (!ctx) throw new Error("useCartDevice must be used within a CartDeviceProvider");
  return ctx;
};
