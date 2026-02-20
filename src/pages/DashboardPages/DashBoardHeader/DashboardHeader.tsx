import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import React from "react";

const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    if (window.confirm("Are you sure you want to log out?")) {
      try {
        await logout();
        toast.success("👋 Logged out successfully", {
          description: "See you next time!",
          duration: 2000,
        });
        navigate("/");
      } catch (error) {
        toast.error("⚠️ Logout error", {
          description: "There was an issue logging out",
          duration: 3000,
        });
      }
    }
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold mb-1">
          Welcome back, {user?.name || "User"}
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your account.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden lg:block">
          <ThemeToggle />
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
          className="flex items-center gap-2">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
