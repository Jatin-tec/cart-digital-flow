
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuth, CartSession, CartSessionItem } from "@/contexts/AuthContext";
import { toast } from "sonner";

// Define cart item interface
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  barcode: string;
}

// Define context interface
interface CartContextType {
  items: CartItem[];
  addItem: (barcode: string, quantity: number) => Promise<boolean>;
  removeItem: (barcode: string) => Promise<boolean>;
  updateQuantity: (barcode: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  removeMode: boolean;
  toggleRemoveMode: () => void;
  refreshCartItems: () => Promise<void>;
  checkout: () => Promise<boolean>;
  loading: boolean;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const { user, getCurrentSession } = useAuth();
  const [items, setItems] = useState<CartItem[]>([]);
  const [removeMode, setRemoveMode] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch cart items when user or session changes
  useEffect(() => {
    if (user?.cart?.sessionId) {
      refreshCartItems();
    }
  }, [user?.cart?.sessionId]);

  // Refresh cart items from the API
  const refreshCartItems = async () => {
    if (!user?.cart?.sessionId) return;
    
    setLoading(true);
    try {
      const session = await getCurrentSession();
      if (session) {
        const cartItems = mapSessionItemsToCartItems(session.items);
        setItems(cartItems);
      }
    } catch (error) {
      console.error("Error refreshing cart:", error);
      toast.error("Failed to refresh cart items");
    } finally {
      setLoading(false);
    }
  };

  // Map API session items to cart items
  const mapSessionItemsToCartItems = (sessionItems: CartSessionItem[]): CartItem[] => {
    return sessionItems.map(item => ({
      id: item.product.barcode.toString(),
      barcode: item.product.barcode.toString(),
      name: item.product.name,
      price: parseFloat(item.product.price),
      quantity: item.quantity,
      image: item.product.image || undefined
    }));
  };

  // Add item to cart
  const addItem = async (barcode: string, quantity: number = 1): Promise<boolean> => {
    if (!user?.cart?.sessionId) {
      toast.error("No active cart session");
      return false;
    }
    
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_API_HOST}/api/cart/session/${user.cart.sessionId}/add/`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.tokens.access}`
        },
        body: JSON.stringify({ barcode, quantity })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        toast.error(errorData?.detail || "Failed to add item to cart");
        return false;
      }
      
      await refreshCartItems();
      toast.success("Item added to cart");
      return true;
    } catch (error) {
      console.error("Error adding item to cart:", error);
      toast.error("Failed to add item to cart");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Remove item from cart
  const removeItem = async (barcode: string): Promise<boolean> => {
    if (!user?.cart?.sessionId) {
      toast.error("No active cart session");
      return false;
    }
    
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_API_HOST}/api/cart/session/${user.cart.sessionId}/remove/`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.tokens.access}`
        },
        body: JSON.stringify({ barcode })
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        toast.error(errorData?.detail || "Failed to remove item from cart");
        return false;
      }
      
      await refreshCartItems();
      toast.success("Item removed from cart");
      return true;
    } catch (error) {
      console.error("Error removing item from cart:", error);
      toast.error("Failed to remove item from cart");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update quantity locally (will be replaced with API call when available)
  const updateQuantity = (barcode: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(barcode);
      return;
    }
    
    // This is a local update only until we have an API endpoint for quantity updates
    setItems(prevItems => 
      prevItems.map(item => 
        item.barcode === barcode 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const checkout = async () => {
    if (!user?.cart?.sessionId) {
      toast.error("No active cart session");
      return false;
    }
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_API_HOST}/api/cart/session/${user.cart.sessionId}/checkout/`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.tokens.access}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        toast.error(errorData?.detail || "Failed to checkout");
        return false;
      }
      
      toast.success("Checkout successful");
      return true;
    } catch (error) {
      console.error("Error during checkout:", error);
      toast.error("Failed to checkout");
      return false;
    } finally {
      setLoading(false);
    }
  }

  const clearCart = () => {
    setItems([]);
  };

  const toggleRemoveMode = () => {
    setRemoveMode(prev => !prev);
  };

  // Calculate totals
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    checkout,
    clearCart,
    totalItems,
    totalPrice,
    removeMode,
    toggleRemoveMode,
    refreshCartItems,
    loading
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
