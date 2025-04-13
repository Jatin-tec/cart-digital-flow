
import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import RemoveItemModal from "./RemoveItemModal";

interface CartItemListProps {
  viewOnly?: boolean;
}

const CartItemList: React.FC<CartItemListProps> = ({ viewOnly = false }) => {
  const { items, removeItem, updateQuantity, removeMode } = useCart();
  const [itemToRemove, setItemToRemove] = useState<{id: string, name: string} | null>(null);

  const handleRemoveClick = (id: string, name: string) => {
    setItemToRemove({ id, name });
  };

  const handleConfirmRemove = () => {
    if (itemToRemove) {
      removeItem(itemToRemove.id);
      setItemToRemove(null);
    }
  };

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-4 text-neutral text-4xl">🛒</div>
        <h3 className="text-lg font-medium">Your cart is empty</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Scan items to add them to your cart
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-12 gap-2 px-4 py-2 bg-neutral-light/50 text-sm font-medium rounded-t-md">
        <div className="col-span-5">Item</div>
        <div className="col-span-3 text-right">Price</div>
        <div className="col-span-2 text-center">Qty</div>
        <div className="col-span-2 text-right">Total</div>
      </div>

      <div className="divide-y">
        {items.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-2 px-4 py-3 items-center"
          >
            <div className="col-span-5 flex items-center">
              <div className="text-sm font-medium">{item.name}</div>
            </div>
            <div className="col-span-3 text-right">
              {formatCurrency(item.price)}
            </div>
            <div className="col-span-2 flex justify-center items-center space-x-1">
              {!viewOnly && (
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={removeMode}
                  className="w-6 h-6 flex items-center justify-center rounded border"
                >
                  -
                </button>
              )}
              <span className="w-6 text-center">{item.quantity}</span>
              {!viewOnly && (
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  disabled={removeMode}
                  className="w-6 h-6 flex items-center justify-center rounded border"
                >
                  +
                </button>
              )}
            </div>
            <div className="col-span-2 flex items-center justify-end space-x-2">
              <span className="font-medium">
                {formatCurrency(item.price * item.quantity)}
              </span>
              
              {!viewOnly && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full text-error"
                  onClick={() => handleRemoveClick(item.id, item.name)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {itemToRemove && (
        <RemoveItemModal
          isOpen={itemToRemove !== null}
          onClose={() => setItemToRemove(null)}
          onConfirmRemove={handleConfirmRemove}
          productId={itemToRemove.id}
          productName={itemToRemove.name}
        />
      )}
    </div>
  );
};

export default CartItemList;
