import { useContext, useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { useCartDevice } from "@/contexts/CartDeviceContext";

const useCartOperations = (isCartDisplay: boolean, location: any) => {
  const [cart, setCart] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  let addItem: (barcode: string, quantity: number) => Promise<boolean>;
  let removeItem: (barcode: string) => Promise<boolean>;
  let refreshCartItems: () => Promise<void>;
  let setCartSessionId: (sessionId: number | null) => void;

  if (isCartDisplay) {
    const device = useCartDevice();
    addItem = device.addItem;
    removeItem = device.removeItem;
    refreshCartItems = device.refreshCartItems;
    setCartSessionId = device.setCartSessionId;

    useEffect(() => {
      setCart(location.state?.cartId || device.cartSessionId || "Unknown");
      setCartItems(device.items);
      setTotalItems(device.totalItems);
      setTotalPrice(device.totalPrice);
      setLoading(device.loading);
    }, [device, location.state?.cartId]);
  } else {
    const customer = useCart();
    addItem = customer.addItem;
    removeItem = customer.removeItem;
    refreshCartItems = customer.refreshCartItems;

    useEffect(() => {
      setCart(customer.cartId || location.state?.cartId || "Unknown");
      setCartItems(customer.items);
      setTotalItems(customer.totalItems);
      setTotalPrice(customer.totalPrice);
      setLoading(customer.loading);
    }, [customer, location.state?.cartId]);
  }

  return {
    cart,
    cartItems,
    totalItems,
    totalPrice,
    loading,
    addItem,
    removeItem,
    refreshCartItems,
    setCartSessionId,
  };
};

export default useCartOperations;