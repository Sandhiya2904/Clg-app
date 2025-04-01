
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import Logo from "@/components/Logo";
import { Sparkles } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // In a real app, this would be an API call to authenticate
    setTimeout(() => {
      setIsLoading(false);
      if (email.endsWith(".edu") && password.length >= 6) {
        // Mock successful login
        const user = {
          id: "1",
          name: "Student Demo",
          email,
          college: "Demo University",
          department: "Computer Science",
        };
        localStorage.setItem("user", JSON.stringify(user));
        toast({
          title: "Login successful",
          description: "Welcome back to LearnLight!",
        });
        navigate("/home");
      } else {
        toast({
          title: "Login failed",
          description: "Please use a valid college email (.edu) and password (6+ chars)",
          variant: "destructive",
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-2">
            <Sparkles className="h-12 w-12 text-primary animate-pulse-glow" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gradient">LearnLight</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Your college learning companion</p>
        </div>

        <Card className="w-full glassmorphism animate-fade-in">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
            <CardDescription>Enter your college credentials to access LearnLight</CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">College Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.name@college.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <a href="#" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              
              <p className="text-sm text-center text-gray-500 dark:text-gray-400">
                Demo login: any email ending with .edu and password with 6+ characters
              </p>
            </CardFooter>
          </form>
        </Card>

        <div className="mt-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gradient">
            Learn Smarter, Not Harder
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Access lecture notes, books, and simplified learning materials for your college courses
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
