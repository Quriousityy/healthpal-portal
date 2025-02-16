
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement actual registration
    toast({
      title: "Success",
      description: "Account created successfully",
    });
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-sage-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-8">
        <h1 className="text-2xl font-semibold text-center mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-1">
                First Name
              </label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-1">
                Last Name
              </label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                required
              />
            </div>
          </div>
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
            Sign Up
          </Button>
          <p className="text-center text-sm">
            Already have an account?{" "}
            <Link to="/signin" className="text-sage-600 hover:underline">
              Sign In
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default SignUp;
