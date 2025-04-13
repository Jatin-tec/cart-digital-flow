
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Barcode, XCircle } from "lucide-react";

interface BarcodeScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (result: string) => void;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ isOpen, onClose, onScan }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [manualCodeValue, setManualCodeValue] = useState("");

  // Mock barcode scan - in a real app, we would use a library like react-barcode-reader
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
      // Simulated successful scan with a random barcode from our products
      const barcodes = ["7890123456", "7890123457", "7890123458", "7890123459", "7890123460"];
      const randomBarcode = barcodes[Math.floor(Math.random() * barcodes.length)];
      onScan(randomBarcode);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isOpen, hasPermission, onScan]);

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualCodeValue.trim()) {
      onScan(manualCodeValue);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scan Product Barcode</DialogTitle>
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
                {/* This would be the barcode scanner view */}
                <Barcode className="h-16 w-16 text-white opacity-30" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-64 border-2 border-red-500">
                  <div className="h-full w-1 bg-red-500 animate-pulse" style={{ marginLeft: '50%' }} />
                </div>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleManualSubmit} className="space-y-2">
          <p className="text-center text-sm text-muted-foreground">
            Having trouble? Enter the barcode manually:
          </p>
          <div className="flex space-x-2">
            <input
              type="text"
              value={manualCodeValue}
              onChange={(e) => setManualCodeValue(e.target.value)}
              placeholder="Enter barcode number"
              className="flex-1 rounded border px-3 py-2 text-sm"
            />
            <Button type="submit">Add Item</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BarcodeScanner;
