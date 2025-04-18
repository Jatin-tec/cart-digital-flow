import { createContext, useContext, useState, ReactNode, useEffect } from "react";

// Define user roles
export type UserRole = "customer" | "admin";

// Define user interface
interface User {
  user: {
    email: string,
    role: UserRole
  }
  tokens: {
    access: string,
    refresh: string
  }
}

// Define context interface
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User | null>
  logout: () => void;
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log(storedUser, 'storedUser')
    if (storedUser) setUser(JSON.parse(storedUser));
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const url = `${import.meta.env.VITE_API_HOST}/api/user/login/`
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      localStorage.setItem('user', JSON.stringify(data))
      setUser(data)
      return data
    } catch {
      return null
    }
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
