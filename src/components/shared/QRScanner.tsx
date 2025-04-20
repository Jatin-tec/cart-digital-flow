
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Camera, XCircle } from "lucide-react";

interface QRScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (result: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ isOpen, onClose, onScan }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [manualCodeValue, setManualCodeValue] = useState("");

  // Mock QR scan - in a real app, we would use a library like react-qr-reader
  useEffect(() => {
    if (!isOpen) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
      setHasPermission(true);
    }, 1500);

    return () => {
      clearTimeout(timer);
      setIsLoading(true);
    };
  }, [isOpen]);

  // Mock successful scan after a few seconds
  useEffect(() => {
    if (!isOpen || !hasPermission) return;

    const timer = setTimeout(() => {
      // Simulated successful scan
      const mockQRCode = "CART-" + Math.floor(100 + Math.random() * 900);
      onScan(mockQRCode);
    }, 5000);

    return () => clearTimeout(timer);
  }, [isOpen, hasPermission, onScan]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // get the value from the input
    const inputValue = (e.target as HTMLFormElement).elements[0].value;
    console.log("Manual input value:", inputValue);

    if (inputValue.trim()) {
      onScan(inputValue);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan QR Code</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center space-y-4 p-2">
          {isLoading ? (
            <div className="flex flex-col items-center py-8">
              <Loader2 className="h-16 w-16 animate-spin text-primary" />
              <p className="mt-4 text-sm text-neutral">Accessing camera...</p>
            </div>
          ) : !hasPermission ? (
            <div className="flex flex-col items-center py-8">
              <XCircle className="h-16 w-16 text-error" />
              <p className="mt-4 text-sm text-neutral">Camera access denied</p>
            </div>
          ) : (
            <div className="relative h-64 w-full bg-black rounded overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* This would be the QR scanner view */}
                <Camera className="h-16 w-16 text-white opacity-30" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-40 w-40 border-2 border-highlight rounded-lg" />
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleManualSubmit} className="space-y-2">
          <p className="text-center text-sm text-muted-foreground">
            Having trouble? Enter the cart code manually:
          </p>
          <div className="flex space-x-2">
            <input
              type="text"
              value={manualCodeValue}
              onChange={(e) => setManualCodeValue(e.target.value)}
              placeholder="Enter cart code"
              className="flex-1 rounded border px-3 py-2 text-sm"
            />
            <Button type="submit">Connect</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QRScanner;
