
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const SignIn = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual authentication
    toast({
      title: "Success",
      description: "Signed in successfully",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sage-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
            />
          </div>
          <Button type="submit" className="w-full bg-sage-600 hover:bg-sage-700">
            Sign In
          </Button>
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-sage-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default SignIn;
