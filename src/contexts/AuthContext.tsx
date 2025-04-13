
import { createContext, useContext, useState, ReactNode } from "react";

// Define user roles
export type UserRole = "customer" | "admin" | "none";

// Define user interface
interface User {
  id: string;
  name: string;
  role: UserRole;
  cartId?: string;
}

// Define context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (role: UserRole, name?: string, cartId?: string) => void;
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (role: UserRole, name: string = "Guest", cartId?: string) => {
    const userId = Math.random().toString(36).substring(2, 9);
    setUser({
      id: userId,
      name,
      role,
      cartId,
    });
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
