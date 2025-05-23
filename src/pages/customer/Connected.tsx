
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShoppingCart, CheckCircle, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Connected: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, getCurrentSession } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  
  const cartId = user?.cart?.cartId || location.state?.cartId || "Unknown";
  const sessionId = user?.cart?.sessionId || location.state?.sessionId;

  useEffect(() => {
    // Verify connection on component mount
    const verifyConnection = async () => {
      if (sessionId) {
        setIsLoading(true);
        try {
          const session = await getCurrentSession();
          if (!session) {
            toast.error("Unable to verify cart connection");
          }
        } catch (error) {
          console.error("Error verifying cart connection:", error);
          toast.error("Failed to verify cart connection");
        } finally {
          setIsLoading(false);
        }
      }
    };

    verifyConnection();
  }, [sessionId]);

  const handleStartShopping = () => {
    navigate("/customer/shopping");
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
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 animate-scale-in">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="p-4 bg-success-light rounded-full">
              <CheckCircle className="h-12 w-12 text-success" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Successfully Connected!</h2>
              <p className="mt-2 text-gray-600">
                You're now connected to Cart #{cartId}
              </p>
              {sessionId && (
                <p className="mt-1 text-sm text-gray-500">
                  Session ID: {sessionId}
                </p>
              )}
            </div>
            <div className="w-full">
              <Button 
                onClick={handleStartShopping} 
                size="lg" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying connection...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Start Shopping
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Connected;
