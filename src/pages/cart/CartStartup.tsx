import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { QrCode } from "lucide-react";
import {QRCodeSVG} from 'qrcode.react';

const uniqueId = Math.floor(100 + Math.random() * 900);

const CartStartup: React.FC = () => {

  const { cart_id } = useParams();

  console.log(cart_id)

  // const [qrCode, setQrCode] = useState<string>("");

  // In a real app, this would generate an actual QR code
  // For this demo, we'll just show the cart ID

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
              {/* This would be a real QR code in production */}
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
