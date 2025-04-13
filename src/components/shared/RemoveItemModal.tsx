
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Barcode } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RemoveItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmRemove: () => void;
  productId: string;
  productName: string;
}

const RemoveItemModal: React.FC<RemoveItemModalProps> = ({
  isOpen,
  onClose,
  onConfirmRemove,
  productId,
  productName,
}) => {
  const [isScanning, setIsScanning] = useState(false);
  const [scannedId, setScannedId] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock scanning process
  useEffect(() => {
    if (!isOpen || !isScanning) return;

    const timer = setTimeout(() => {
      // Simulate successful scan by returning the same product ID
      setScannedId(productId);
      setIsScanning(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, [isOpen, isScanning, productId]);

  // Check if the scanned item matches the one to be removed
  useEffect(() => {
    if (scannedId && scannedId === productId) {
      onConfirmRemove();
      toast({
        title: "Item removed",
        description: `${productName} has been removed from your cart`,
      });
      resetAndClose();
    } else if (scannedId) {
      toast({
        title: "Incorrect item",
        description: "The scanned item doesn't match the one you want to remove",
        variant: "destructive",
      });
      setScannedId(null);
    }
  }, [scannedId, productId, productName, onConfirmRemove, toast]);

  const startScanning = () => {
    setIsScanning(true);
  };

  const resetAndClose = () => {
    setIsScanning(false);
    setScannedId(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetAndClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Confirm Item Removal</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col space-y-4">
          <p className="text-center">
            To remove <span className="font-semibold">{productName}</span>, please scan the item again.
          </p>

          {isScanning ? (
            <div className="relative h-64 w-full bg-black rounded overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <Barcode className="h-16 w-16 text-white opacity-30" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-8 w-64 border-2 border-red-500">
                  <div className="h-full w-1 bg-red-500 animate-pulse" style={{ marginLeft: '50%' }} />
                </div>
              </div>
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <p className="text-white">Scanning...</p>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <Button onClick={startScanning} className="w-full sm:w-auto">
                Start Scanning
              </Button>
            </div>
          )}

          {isScanning && (
            <div className="flex items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              <span>Waiting for scan...</span>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={resetAndClose}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RemoveItemModal;
