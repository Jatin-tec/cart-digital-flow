
import React, { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { Trash2, Image, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import RemoveItemModal from "./RemoveItemModal";

interface CartItemListProps {
  viewOnly?: boolean;
}

const CartItemList: React.FC<CartItemListProps> = ({ viewOnly = false }) => {
  const { items, removeItem, updateQuantity, removeMode, loading } = useCart();
  const [itemToRemove, setItemToRemove] = useState<{id: string, name: string, barcode: string} | null>(null);
  const [removingItemId, setRemovingItemId] = useState<string | null>(null);

  const handleRemoveClick = (id: string, name: string, barcode: string) => {
    setItemToRemove({ id, name, barcode });
  };

  const handleConfirmRemove = async () => {
    if (itemToRemove) {
      setRemovingItemId(itemToRemove.id);
      const success = await removeItem(itemToRemove.barcode);
      if (success) {
        setItemToRemove(null);
      }
      setRemovingItemId(null);
    }
  };

  if (loading && items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
        <h3 className="text-lg font-medium">Loading cart...</h3>
      </div>
    );
  }

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
            <div className="col-span-5 flex items-center space-x-3">
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-12 h-12 object-cover rounded-md"
                />
              ) : (
                <div className="w-12 h-12 bg-neutral-light flex items-center justify-center rounded-md">
                  <Image className="text-gray-400" />
                </div>
              )}
              <div className="text-sm font-medium">{item.name}</div>
            </div>
            <div className="col-span-3 text-right">
              {typeof item.price === 'number'
                ? formatCurrency(item.price)
                : formatCurrency(parseFloat(item.price.toString()))}
            </div>
            <div className="col-span-2 flex justify-center items-center space-x-1">
              <span className="w-6 text-center">{item.quantity}</span>
            </div>
            <div className="col-span-2 flex items-center justify-end space-x-2">
              <span className="font-medium">
                {typeof item.price === 'number'
                  ? formatCurrency(item.price * item.quantity)
                  : formatCurrency(parseFloat(item.price.toString()) * item.quantity)}
              </span>
              
              {!viewOnly && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-full text-error"
                  onClick={() => handleRemoveClick(item.id, item.name, item.barcode)}
                  disabled={loading || removingItemId === item.id}
                >
                  {removingItemId === item.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
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
