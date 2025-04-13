
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Download, Mail, Home, CheckCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { formatCurrency } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const Confirmation: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const { toast } = useToast();
  
  const tax = totalPrice * 0.1;
  const total = totalPrice + tax;
  const orderNumber = Math.floor(10000 + Math.random() * 90000);
  const cartId = user?.cartId || "Unknown";
  
  const handleDownloadReceipt = () => {
    toast({
      title: "Receipt downloaded",
      description: "Your receipt has been downloaded successfully",
    });
  };
  
  const handleEmailReceipt = () => {
    toast({
      title: "Receipt sent",
      description: "Your receipt has been emailed to you",
    });
  };
  
  const handleFinish = () => {
    clearCart();
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col bg-neutral-light">
        <div className="flex-1 max-w-2xl w-full mx-auto p-4 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-8 text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-success-light rounded-full">
                <CheckCircle className="h-12 w-12 text-success" />
              </div>
            </div>
            
            <h1 className="text-2xl font-bold">Thank You!</h1>
            <p className="text-gray-600">
              Your order has been successfully processed
            </p>
            
            <div className="py-3 border-t border-b">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">Order Number:</span>
                <span>#{orderNumber}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Cart ID:</span>
                <span>{cartId}</span>
              </div>
            </div>
            
            <div className="space-y-1 text-sm text-left">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal:</span>
                <span>{formatCurrency(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (10%):</span>
                <span>{formatCurrency(tax)}</span>
              </div>
              <div className="flex justify-between font-bold mt-2">
                <span>Total:</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
            
            <div className="pt-4 grid grid-cols-2 gap-3">
              <Button variant="outline" onClick={handleDownloadReceipt} className="flex items-center justify-center">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" onClick={handleEmailReceipt} className="flex items-center justify-center">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-4">
            <p className="text-center mb-4">
              Your items are ready to be picked up at the counter. 
              Please show your order number to the cashier.
            </p>
            <Button onClick={handleFinish} className="w-full flex items-center justify-center">
              <Home className="mr-2 h-4 w-4" />
              Finish Shopping
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Confirmation;
