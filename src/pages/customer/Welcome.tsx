
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QrCode, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import QRScanner from "@/components/shared/QRScanner";
import { useToast } from "@/hooks/use-toast";

const Welcome: React.FC = () => {
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();

  const handleScanComplete = (result: string) => {
    setIsQrScannerOpen(false);
    setIsConnecting(true);

    // Simulate connection process
    setTimeout(() => {
      // Get cart ID from the QR code (format: CART-123)
      const cartId = result;
      // Show success toast
      toast({
        title: "Connected successfully",
        description: `You are now connected to ${cartId}`,
      });

      // Navigate to the cart connected screen
      navigate("/customer/connected", { state: { cartId } });
      
      setIsConnecting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-2xl font-bold text-gray-900 text-center">
            Smart Cart
          </h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6 bg-neutral-light">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 animate-fade-in">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="p-4 bg-primary-light rounded-full">
              <QrCode className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Welcome to Smart Cart</h2>
              <p className="mt-2 text-gray-600">
                Scan the QR code on your cart to begin shopping
              </p>
            </div>
            <Button
              onClick={() => setIsQrScannerOpen(true)}
              size="lg"
              className="w-full"
              disabled={isConnecting}
            >
              {isConnecting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connecting...
                </>
              ) : (
                "Scan QR Code"
              )}
            </Button>
          </div>
        </div>
      </main>

      <QRScanner
        isOpen={isQrScannerOpen}
        onClose={() => setIsQrScannerOpen(false)}
        onScan={handleScanComplete}
      />
    </div>
  );
};

export default Welcome;
