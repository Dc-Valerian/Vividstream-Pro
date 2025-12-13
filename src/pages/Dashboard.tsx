import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ChatWidget } from "@/components/ChatWidget";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/components/ThemeProvider";
import vividstreamLogoDark from "@/assets/vividstream-logo-dark-mode.png";
import vividstreamLogoLight from "@/assets/vividstream-logo-light-mode.png";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
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

  const quickActions = [
    { title: "Redeem Ticket", icon: Ticket, href: "/dashboard/redeem" },
    { title: "Apply for Visa", icon: Plane, href: "/dashboard/visa" },
    { title: "World Cup Bets", icon: Trophy, href: "/dashboard/world-cup" },
    { title: "Book Hotel", icon: Hotel, href: "/dashboard/hotels" },
  ];

  const subNavItems = [
    { title: "Redeem Ticket", icon: Ticket, href: "/dashboard/redeem" },
    { title: "Visa Application", icon: Plane, href: "/dashboard/visa" },
    { title: "Hotels", icon: Hotel, href: "/dashboard/hotels" },
    { title: "World Cup", icon: Trophy, href: "/dashboard/world-cup" },
  ];

  const statusCards = [
    {
      title: "Ticket Status",
      value: "No Ticket",
      icon: Ticket,
      status: "neutral",
      action: null,
    },
    {
      title: "Visa Application",
      value: "Not Started",
      icon: Plane,
      status: "info",
      action: { label: "Manage Application", href: "/dashboard/visa" },
    },
    {
      title: "Hotel Booking",
      value: "Locked",
      icon: Hotel,
      status: "locked",
      subtitle: "Requires Visa Approval",
    },
    {
      title: "Vividstream Wallet",
      value: "2,500",
      icon: Wallet,
      status: "success",
      isHighlight: true,
    },
  ];

  const recentActivity = [
    {
      icon: Ticket,
      title: "Ticket Redeemed",
      description: "Code: WIN-2024-X",
      time: "2 hours ago",
    },
    {
      icon: User,
      title: "Profile Updated",
      description: "Added bio-data information",
      time: "1 day ago",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "border-primary/50 bg-primary/5";
      case "info":
        return "border-info/50 bg-info/5";
      case "locked":
        return "border-muted-foreground/30 bg-muted/20";
      default:
        return "border-border bg-card";
    }
  };

  const getIconBg = (status: string) => {
    switch (status) {
      case "success":
        return "text-primary";
      case "info":
        return "text-info";
      case "locked":
        return "text-muted-foreground";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-border bg-card/50 backdrop-blur-sm hidden lg:block">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <img src={logo} alt="Vividstream Pro" className="h-10 w-auto" />
          </div>

          <nav className="space-y-1">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium"
            >
              <Wallet className="w-5 h-5" />
              Dashboard
            </Link>
            
            {/* Sublinks */}
            <div className="ml-4 pl-4 border-l border-border space-y-1">
              {subNavItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                >
                  <item.icon className="w-4 h-4" />
                  {item.title}
                </Link>
              ))}
            </div>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user?.name || "User"}</p>
              <p className="text-xs text-muted-foreground truncate">{user?.email || "user@example.com"}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="flex-1">
              <Settings className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="icon" className="flex-1" onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 border-b border-border bg-card/80 backdrop-blur-sm z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-72 p-0">
              <div className="flex flex-col h-full">
                {/* Sidebar Header */}
                <div className="p-6 border-b border-border">
                  <img src={logo} alt="Vividstream Pro" className="h-10 w-auto" />
                </div>

                <div className="flex-1 p-4 overflow-y-auto">
                  <nav className="space-y-1 mb-6">
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl bg-primary/10 text-primary font-medium"
                    >
                      <Wallet className="w-5 h-5" />
                      Dashboard
                    </Link>
                    
                    {/* Sublinks */}
                    <div className="ml-4 pl-4 border-l border-border space-y-1">
                      {subNavItems.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
                        >
                          <item.icon className="w-4 h-4" />
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </nav>

                  {/* Quick Actions */}
                  <div className="border-t border-border pt-4">
                    <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions.map((action) => (
                        <Link
                          key={action.href}
                          to={action.href}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Button variant="outline" className="w-full h-auto py-3 flex-col gap-1.5 text-xs">
                            <action.icon className="w-5 h-5" />
                            <span className="text-[10px]">{action.title}</span>
                          </Button>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                {/* User Section */}
                <div className="p-4 border-t border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{user?.name || "User"}</p>
                      <p className="text-xs text-muted-foreground truncate">{user?.email || "user@example.com"}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="flex-1">
                      <Settings className="w-4 h-4 mr-2" />
                      Settings
                    </Button>
                    <Button variant="ghost" size="sm" className="flex-1" onClick={handleLogout}>
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <img src={logo} alt="Vividstream Pro" className="h-8 w-auto" />
        </div>
        <ThemeToggle />
      </header>

      {/* Main Content */}
      <main className="lg:ml-64 pt-20 lg:pt-8 pb-8 px-4 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-1">Welcome back, {user?.name || "User"}</h1>
              <p className="text-muted-foreground">Here's what's happening with your account.</p>
            </div>
            <div className="hidden lg:block">
              <ThemeToggle />
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {statusCards.map((card, index) => (
              <div
                key={index}
                className={`p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg ${getStatusColor(card.status)}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-sm text-muted-foreground">{card.title}</span>
                  <card.icon className={`w-5 h-5 ${getIconBg(card.status)}`} />
                </div>
                <div className={`text-xl font-bold mb-1 ${card.isHighlight ? "text-primary" : ""}`}>
                  {card.value}
                </div>
                {card.subtitle && (
                  <p className="text-xs text-muted-foreground">{card.subtitle}</p>
                )}
                {card.action && (
                  <Link
                    to={card.action.href}
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-2"
                  >
                    {card.action.label}
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <div className="p-6 rounded-2xl border border-border bg-card">
              <h2 className="font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
                      <activity.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pending Actions */}
            <div className="p-6 rounded-2xl border border-accent/50 gradient-accent">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-accent-foreground" />
                <h2 className="font-semibold text-accent-foreground">Pending Actions</h2>
              </div>
              <div className="bg-card/20 backdrop-blur-sm rounded-xl p-4">
                <h3 className="font-medium text-accent-foreground mb-2">
                  Complete Visa Application
                </h3>
                <p className="text-sm text-accent-foreground/80 mb-4">
                  You need to submit your passport details to proceed with travel arrangements.
                </p>
                <Link to="/dashboard/visa">
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Start Application
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Quick Actions - Hidden on mobile (available in sidebar) */}
          <div className="hidden sm:block mt-8 p-6 rounded-2xl border border-border bg-card">
            <h2 className="font-semibold mb-4">Quick Actions</h2>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link to="/dashboard/redeem">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                  <Ticket className="w-6 h-6" />
                  <span>Redeem Ticket</span>
                </Button>
              </Link>
              <Link to="/dashboard/visa">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
                  <Plane className="w-6 h-6" />
                  <span>Apply for Visa</span>
                </Button>
              </Link>
              <Link to="/dashboard/world-cup">
                <Button variant="outline" className="w-full h-auto py-4 flex-col gap-2">
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
