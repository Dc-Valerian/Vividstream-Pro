import { useState } from "react";
import vividstreamLogoDark from "@/assets/vividstream-logo-dark-mode.png";
import vividstreamLogoLight from "@/assets/vividstream-logo-light-mode.png";
import { useTheme } from "@/components/ThemeProvider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Wallet,
  User,
  Settings,
  LogOut,
  Menu,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { quickActions, subNavItems } from "@/types/types";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";

const MobileHeader = () => {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const logo = theme === "light" ? vividstreamLogoLight : vividstreamLogoDark;

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
      navigate("/");
    }
  };
  return (
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
                  <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-4">
                    Quick Actions
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action) => (
                      <Link
                        key={action.href}
                        to={action.href}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <Button
                          variant="outline"
                          className="w-full h-auto py-3 flex-col gap-1.5 text-xs"
                        >
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
                    <p className="font-medium truncate">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user?.email || "user@example.com"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex-1"
                    onClick={handleLogout}
                  >
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
  );
};

export default MobileHeader;
