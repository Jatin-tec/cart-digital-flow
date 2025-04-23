
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { QrCode } from "lucide-react";
import { QRCodeSVG } from 'qrcode.react';

// Utility function to check for an active cart session
const checkActiveSession = async (cartId: string) => {
  const url = `${import.meta.env.VITE_API_HOST}/api/cart/active-session/${cartId}/`;
  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) return null;
    const data = await response.json();
    // Assume the backend returns: { id: number, ... } or null if no active session
    return data && data.id ? data : null;
  } catch (err) {
    console.error("Error checking for active session:", err);
    return null;
  }
};

const CartStartup: React.FC = () => {
  const { cart_id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (cart_id) {
      // Poll for an active session every 2 seconds
      intervalId = setInterval(async () => {
        const session = await checkActiveSession(cart_id);
        if (session && session.id) {
          // Navigate to CartLoggedIn with session state (sessionId and cartId)
          navigate("/cart/logged-in", { state: { sessionId: session.id, cartId: cart_id } });
        }
      }, 2000);
    }
    return () => intervalId && clearInterval(intervalId);
  }, [cart_id, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-neutral-dark text-white">
      <header className="bg-primary shadow py-4">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold text-center">Qout</h1>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-neutral-dark text-center">
          <div className="flex flex-col items-center space-y-6">
            <div className="p-4 bg-neutral-light rounded-full">
              <QrCode className="h-12 w-12 text-primary" />
            </div>

            <div>
              <h2 className="text-2xl font-bold">Scan to Begin Shopping</h2>
              <p className="mt-2 text-gray-600">
                Open the Smart Cart app and scan this QR code
              </p>
            </div>

            <div className="w-64 h-64 border-2 border-primary-light rounded-lg flex items-center justify-center">
              <div className="text-lg font-bold">
                <QRCodeSVG value={cart_id} size={200} />
              </div>
            </div>

            <div className="w-full pt-4 border-t">
              <p className="text-sm text-gray-600">
                Cart ID: {cart_id}
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-primary py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <p className="text-sm">Smart Cart System v1.0</p>
        </div>
      </footer>
    </div>
  );
};

export default CartStartup;

