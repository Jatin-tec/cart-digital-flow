
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QrCode, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import QRScanner from "@/components/shared/QRScanner";
import { toast } from "sonner";

const extractCartId = (scanResult: string): string | null => {
  // Accepts just a cart code (CART-XXX) or a URL with /cart/startup/CART-XXX
  let match;
  // If it's a URL containing the cart code, match it
  match = scanResult.match(/cart\/startup\/(CART-\d+)/i);
  if (match) {
    return match[1];
  }
  // If it's just the plain cart code
  match = scanResult.match(/CART-\d+/i);
  if (match) {
    return match[0];
  }
  return null;
};

const Welcome: React.FC = () => {
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const navigate = useNavigate();
  const { startCartSession } = useAuth();

  const handleScanComplete = async (cartId: string) => {
    setIsQrScannerOpen(false);
    setIsConnecting(true);

    if (!cartId) {
      toast.error("Invalid QR code: could not extract cart ID");
      setIsConnecting(false);
      return;
    }

    try {
      // Start a cart session
      const sessionResult = await startCartSession(cartId);

      if (sessionResult) {
        toast.success(`You are now connected to ${cartId}`);
        navigate("/customer/connected", {
          state: {
            cartId: sessionResult.cartId,
            sessionId: sessionResult.sessionId
          }
        });
      } else {
        toast.error("Failed to connect to cart");
      }
    } catch (error) {
      console.error("Error connecting to cart:", error);
      toast.error("Failed to connect to cart");
    } finally {
      setIsConnecting(false);
    }
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

