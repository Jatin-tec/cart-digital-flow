
import React from "react";
import CartShoppingScreen from "@/components/shared/CartShoppingScreen";

// Cart display uses the same interactive shopping screen but can pass isCartDisplay for future customizations
const CartLoggedIn: React.FC = () => {
  return <CartShoppingScreen isCartDisplay />;
};

export default CartLoggedIn;
