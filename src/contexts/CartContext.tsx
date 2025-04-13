
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define cart item interface
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

// Define context interface
interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  removeMode: boolean;
  toggleRemoveMode: () => void;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Sample dummy data for testing
const dummyCartItems: CartItem[] = [
  {
    id: "1",
    name: "Organic Bananas",
    price: 1.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1543218024-57a70143c369?q=80&w=200",
  },
  {
    id: "2",
    name: "Whole Milk",
    price: 3.49,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?q=80&w=200",
  },
  {
    id: "3",
    name: "Wheat Bread",
    price: 2.29,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc7b?q=80&w=200",
  },
  {
    id: "4",
    name: "Avocado",
    price: 1.49,
    quantity: 3,
    image: "https://images.unsplash.com/photo-1601039641847-7857b994d704?q=80&w=200",
  },
];

// Create provider component
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(dummyCartItems); // Initialize with dummy data
  const [removeMode, setRemoveMode] = useState(false);

  const addItem = (newItem: CartItem) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === newItem.id);
      
      if (existingItem) {
        // Update quantity if item already exists
        return prevItems.map(item => 
          item.id === newItem.id 
            ? { ...item, quantity: item.quantity + newItem.quantity } 
            : item
        );
      } else {
        // Add new item
        return [...prevItems, newItem];
      }
    });
  };

  const removeItem = (itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === itemId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

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
    clearCart,
    totalItems,
    totalPrice,
    removeMode,
    toggleRemoveMode,
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
