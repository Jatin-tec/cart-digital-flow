
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, AlertCircle } from "lucide-react";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    const response = await login(email, password);
    console.log(response)
    if (response) {
      switch (response.user.role) {
        case "customer":
          // if (user.cartId) {
          //   navigate("/cart")
          //   break
          // };
          navigate("/customer")
          break;
        case "manager":
          console.log(response.user.role);
          navigate("/admin/dashboard");
          break;
      }
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-neutral-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Smart Cart Login</CardTitle>
          <CardDescription>
            Sign in to access your Smart Cart experience
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="text-sm text-gray-500 mt-2">
              <p>Demo Credentials:</p>
              <ul className="list-disc pl-5">
                <li>Customer: customer@example.com / customer</li>
                <li>Cart: customercart@example.com / cart</li>
                <li>Admin: admin@example.com / admin</li>
              </ul>
            </div>
          </form>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
