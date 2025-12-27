import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ChatWidget } from "@/components/ChatWidget";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/components/ThemeProvider";
import vividstreamLogoDark from "@/assets/vividstream-logo-dark-mode.png";
import vividstreamLogoLight from "@/assets/vividstream-logo-light-mode.png";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Ticket,
  Plane,
  Hotel,
  Wallet,
  Clock,
  User,
  Settings,
  LogOut,
  ExternalLink,
  Trophy,
  Menu,
  ChevronDown,
} from "lucide-react";
import Sidebar from "./DashboardPages/SideBar/Sidebar";
import { subNavItems } from "@/types/types";
import MobileHeader from "./DashboardPages/MobileHeader/MobileHeader";
import DashboardHeader from "./DashboardPages/DashBoardHeader/DashboardHeader";
import StatusCards from "./DashboardPages/StatusCards/StatusCards";
import ContentGrid from "./DashboardPages/ContentGrid/ContentGrid";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const logo = theme === "light" ? vividstreamLogoLight : vividstreamLogoDark;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Mobile Header */}
      <MobileHeader />

      {/* Main Content */}
      <main className="lg:ml-64 pt-20 lg:pt-8 pb-8 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <DashboardHeader />

          {/* Status Cards */}
          <StatusCards />

          {/* Content Grid */}
          <ContentGrid />

          {/* Quick Actions - Hidden on mobile (available in sidebar) */}
          <div className="hidden sm:block mt-8 p-6 rounded-2xl border border-border bg-card">
            <h2 className="font-semibold mb-4">Quick Actions</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link to="/dashboard/redeem">
                <Button
                  variant="outline"
                  className="w-full h-auto py-4 flex-col gap-2"
                >
                  <Ticket className="w-6 h-6" />
                  <span>Redeem Ticket</span>
                </Button>
              </Link>
              <Link to="/dashboard/visa">
                <Button
                  variant="outline"
                  className="w-full h-auto py-4 flex-col gap-2"
                >
                  <Plane className="w-6 h-6" />
                  <span>Apply for Visa</span>
                </Button>
              </Link>
              <Link to="/dashboard/world-cup">
                <Button
                  variant="outline"
                  className="w-full h-auto py-4 flex-col gap-2"
                >
                  <Trophy className="w-6 h-6" />
                  <span>World Cup Bets</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <ChatWidget />
    </div>
  );
};

export default Dashboard;
