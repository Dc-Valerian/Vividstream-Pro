import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import React from "react";

const DashboardHeader = () => {
  const { user, logout } = useAuth();
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
      <div className="hidden lg:block">
        <ThemeToggle />
      </div>
    </div>
  );
};

export default DashboardHeader;
