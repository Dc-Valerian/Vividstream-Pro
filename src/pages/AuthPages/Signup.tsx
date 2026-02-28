import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ThemeToggle } from "@/components/ThemeToggle";
import vividstreamLogoDark from "@/assets/vividstream-logo-dark-mode.png";
import { Lock, Eye, EyeOff, ArrowRight, User, Mail } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { signup, isAuthenticated } = useAuth();
  const logo = vividstreamLogoDark;
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Clear errors when user starts typing
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  // Redirect if already authenticated
  if (isAuthenticated) {
    navigate("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("🔒 Password mismatch", {
        description: "Please make sure both passwords match",
        duration: 4000,
      });
      return;
    }

    if (formData.password.length < 6) {
      toast.error("🔐 Password too short", {
        description: "Password must be at least 6 characters long",
        duration: 4000,
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await signup(
        formData.name,
        formData.email,
        formData.password,
      );
      if (result.success) {
        toast.success("🎉 Account created successfully!", {
          description:
            "Welcome to Vividstream Pro! Redirecting to dashboard...",
          duration: 3000,
        });
        navigate("/dashboard");
      } else {
        // Enhanced error messages with icons and better descriptions
        const errorMessage = result.error || "Signup failed";
        // let description = "Please check your information and try again";

        if (errorMessage.includes("already exists")) {
          toast.error("👤 Email already registered", {
            description: "An account with this email already exists",
            duration: 4000,
            action: {
              label: "Login instead",
              onClick: () => navigate("/login"),
            },
          });
        } else if (errorMessage.includes("required")) {
          toast.error("📝 Missing information", {
            description: "Please fill in all required fields",
            duration: 4000,
          });
        } else if (errorMessage.includes("Network")) {
          toast.error("🌐 Connection error", {
            description: "Please check your internet connection",
            duration: 4000,
          });
        } else {
          toast.error("⚠️ Registration failed", {
            description: errorMessage,
            duration: 4000,
          });
        }
      }
    } catch (error) {
      toast.error("🚨 Unexpected error", {
        description: "Something went wrong. Please try again later",
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side - Fixed Visual */}
      <div className="hidden lg:flex fixed left-0 top-0 h-screen w-1/2 gradient-hero items-center justify-center p-16 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" />

        <div className="relative z-10 text-center max-w-md">
          <Link to="/" className="flex items-center justify-center">
            <div className="w-48 h-24 rounded-3xl flex items-center justify-center animate-pulse-slow">
              <img src={logo} alt="Vividstream Pro" className="h-36 w-40" />
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-primary-foreground mb-2">
            Start Your Journey Today
          </h2>
          <p className="text-primary">
            Join thousands of users who trust Vividstream Pro for their event
            ticketing and travel needs.
          </p>
        </div>
      </div>

      {/* Right Side - Scrollable Form */}
      <div className="flex-1 lg:ml-[50%] h-screen overflow-y-auto flex flex-col justify-center px-8 py-12 lg:px-16 relative">
        <div className="absolute top-6 right-6">
          <ThemeToggle />
        </div>

        <div className="mx-auto w-full max-w-lg ">
          <div className="mb-8 mt-40 lg:mt-16">
            <h1 className="text-3xl font-bold mb-2">Get Your Ticket</h1>
            <p className="text-muted-foreground">
              Access to Vividstream Pro requires a stadium ticket. Once you
              purchase a ticket, your account will be automatically set up for
              you.
            </p>
          </div>

          <div className="space-y-5">
            <div className="p-6 bg-secondary/50 border border-border rounded-xl">
              <h3 className="font-semibold mb-2 text-lg">Ticket Required</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Vividstream Pro is an exclusive platform for ticket holders.
                Purchasing a stadium ticket grants you full access to dashboard
                services including visa applications, hotel bookings, and other
                premium tools.
              </p>
              <Button
                type="button"
                variant="gradient"
                size="lg"
                className="w-full"
                onClick={() => navigate("/")}
              >
                Browse Stadium Tickets
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
