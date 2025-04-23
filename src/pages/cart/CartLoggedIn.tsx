
import React from "react";
import { CartDeviceProvider } from "@/contexts/CartDeviceContext";
import CartShoppingScreen from "@/components/shared/CartShoppingScreen";

// Cart display uses the same interactive shopping screen but can pass isCartDisplay for future customizations
const CartLoggedIn: React.FC = () => {
  return (
    <CartDeviceProvider>
      <CartShoppingScreen isCartDisplay />
    </CartDeviceProvider>
  );
};

export default CartLoggedIn;
