
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Camera, XCircle } from "lucide-react";
import { Scanner } from '@yudiel/react-qr-scanner';


interface QRScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (result: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ isOpen, onClose, onScan }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasPermission, setHasPermission] = useState(false);
  const [manualCodeValue, setManualCodeValue] = useState("");

  const handleScan = (result) => {
    
  }

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
          <Scanner onScan={handleScan} />;
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
