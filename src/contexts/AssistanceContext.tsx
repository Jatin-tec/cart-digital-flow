
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define assistance request interface
export interface AssistanceRequest {
  id: string;
  cartId: string;
  customerName: string;
  timestamp: Date;
  resolved: boolean;
  assignedTo?: string;
}

// Define context interface
interface AssistanceContextType {
  requests: AssistanceRequest[];
  callAssistance: (cartId: string, customerName: string) => void;
  cancelRequest: (cartId: string) => void;
  resolveRequest: (requestId: string) => void;
  assignRequest: (requestId: string, staffName: string) => void;
  activeRequest: AssistanceRequest | null;
}

// Create context
const AssistanceContext = createContext<AssistanceContextType | undefined>(undefined);

// Create provider component
export const AssistanceProvider = ({ children }: { children: ReactNode }) => {
  const [requests, setRequests] = useState<AssistanceRequest[]>([]);

  const callAssistance = (cartId: string, customerName: string) => {
    const newRequest: AssistanceRequest = {
      id: Math.random().toString(36).substring(2, 9),
      cartId,
      customerName,
      timestamp: new Date(),
      resolved: false,
    };
    
    setRequests(prev => [...prev, newRequest]);
  };

  const cancelRequest = (cartId: string) => {
    setRequests(prev => prev.filter(req => req.cartId !== cartId));
  };

  const resolveRequest = (requestId: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, resolved: true } 
          : req
      )
    );
  };

  const assignRequest = (requestId: string, staffName: string) => {
    setRequests(prev => 
      prev.map(req => 
        req.id === requestId 
          ? { ...req, assignedTo: staffName } 
          : req
      )
    );
  };

  // Find active request for current cart
  const activeRequest = requests.find(req => !req.resolved) || null;

  const value = {
    requests,
    callAssistance,
    cancelRequest,
    resolveRequest,
    assignRequest,
    activeRequest,
  };

  return <AssistanceContext.Provider value={value}>{children}</AssistanceContext.Provider>;
};

// Custom hook to use assistance context
export const useAssistance = () => {
  const context = useContext(AssistanceContext);
  if (context === undefined) {
    throw new Error("useAssistance must be used within an AssistanceProvider");
  }
  return context;
};
