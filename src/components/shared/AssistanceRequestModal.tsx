
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAssistance } from "@/contexts/AssistanceContext";
import { useAuth } from "@/contexts/AuthContext";
import { BellRing, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AssistanceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AssistanceRequestModal: React.FC<AssistanceRequestModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { user } = useAuth();
  const { callAssistance, cancelRequest, activeRequest } = useAssistance();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleRequestAssistance = () => {
    if (!user || !user.cartId) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      callAssistance(user.cartId!, user.name);
      setIsSubmitting(false);
      setIsSuccess(true);

      toast({
        title: "Assistance requested",
        description: "A store assistant will be with you shortly",
      });

      // Reset success state after a delay
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  const handleCancelRequest = () => {
    if (!user || !user.cartId) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      cancelRequest(user.cartId!);
      setIsSubmitting(false);

      toast({
        title: "Request cancelled",
        description: "Your assistance request has been cancelled",
      });

      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Assistance</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center py-6 space-y-4">
          {activeRequest ? (
            <>
              <div className="p-4 bg-success-light rounded-full">
                <CheckCircle className="h-12 w-12 text-success" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium">Assistance is on the way</h3>
                <p className="text-sm text-muted-foreground">
                  A store assistant has been notified and will be with you shortly
                </p>
              </div>
            </>
          ) : isSubmitting ? (
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          ) : isSuccess ? (
            <CheckCircle className="h-12 w-12 text-success" />
          ) : (
            <>
              <div className="p-4 bg-primary-light rounded-full">
                <BellRing className="h-12 w-12 text-primary" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium">Need help?</h3>
                <p className="text-sm text-muted-foreground">
                  Request assistance from a store associate
                </p>
              </div>
            </>
          )}
        </div>

        <DialogFooter className="sm:justify-center">
          {activeRequest ? (
            <Button
              variant="destructive"
              onClick={handleCancelRequest}
              disabled={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? "Cancelling..." : "Cancel Request"}
            </Button>
          ) : (
            <>
              <Button
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting || isSuccess}
                className="w-full sm:w-auto"
              >
                Go Back
              </Button>
              <Button
                onClick={handleRequestAssistance}
                disabled={isSubmitting || isSuccess}
                className="w-full sm:w-auto"
              >
                {isSubmitting
                  ? "Requesting..."
                  : isSuccess
                  ? "Requested"
                  : "Request Assistance"}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssistanceRequestModal;
