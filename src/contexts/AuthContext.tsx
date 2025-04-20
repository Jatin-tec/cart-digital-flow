
import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define user roles
export type UserRole = "customer" | "admin" | "manager";

// Define cart session interface
export interface CartSession {
  id: number;
  cart: string;
  started_at: string;
  ended_at: string | null;
  is_checked_out: boolean;
  items: CartSessionItem[];
}

export interface CartSessionItem {
  cart_id: string;
  product: {
    barcode: number;
    name: string;
    price: string;
    weight: string;
    image: string | null;
  };
  store: string;
  quantity: number;
  scanned_at: string;
}

// Define user interface
interface User {
  user: {
    email: string;
    role: UserRole;
  }
  tokens: {
    access: string;
    refresh: string;
  }
  cart?: {
    cartId: string;
    sessionId?: number;
  }
}

// Define context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
  loading: boolean;
  startCartSession: (cartId: string) => Promise<{ cartId: string, sessionId: number } | null>;
  getCurrentSession: () => Promise<CartSession | null>;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user data", error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false); // Set loading to false after checking local storage
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const url = `${import.meta.env.VITE_API_HOST}/api/user/login/`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        console.error("Login failed:", errorData || response.statusText);
        return null;
      }
      
      const data = await response.json();
      const userData = {
        ...data,
        cart: data.cart || undefined
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return userData;
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  };

  const startCartSession = async (cartId: string) => {
    if (!user) return null;
    
    try {
      const url = `${import.meta.env.VITE_API_HOST}/api/cart/start/${cartId}/`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.tokens.access}`
        }
      });
      
      if (!response.ok) {
        console.error("Failed to start cart session:", response.statusText);
        return null;
      }
      
      const data = await response.json();
      // Update the user state with the cart session info
      const updatedUser = {
        ...user,
        cart: {
          cartId,
          sessionId: data.id
        }
      };
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      return {
        cartId,
        sessionId: data.id
      };
    } catch (error) {
      console.error("Error starting cart session:", error);
      return null;
    }
  };

  const getCurrentSession = async () => {
    if (!user?.cart?.sessionId) return null;
    
    try {
      const url = `${import.meta.env.VITE_API_HOST}/api/cart/session/${user.cart.sessionId}/`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.tokens.access}`
        }
      });
      
      if (!response.ok) {
        console.error("Failed to get session:", response.statusText);
        return null;
      }
      
      return await response.json();
    } catch (error) {
      console.error("Error getting session:", error);
      return null;
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
    loading,
    startCartSession,
    getCurrentSession
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
