import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { ViewModal } from "@/components/admin/ViewModal";
import { EditModal } from "@/components/admin/EditModal";
import { DeleteModal } from "@/components/admin/DeleteModal";
import {
  Ticket,
  Users,
  Trophy,
  Plane,
  CreditCard,
  BarChart3,
  Search,
  Settings,
  LogOut,
  TrendingUp,
  TrendingDown,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

const AdminDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("tickets");
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Modal states
  const [viewModal, setViewModal] = useState<{
    open: boolean;
    title: string;
    data: Record<string, any> | null;
  }>({
    open: false,
    title: "",
    data: null,
  });
  const [editModal, setEditModal] = useState<{
    open: boolean;
    title: string;
    data: Record<string, any> | null;
    type: string;
  }>({
    open: false,
    title: "",
    data: null,
    type: "",
  });
  const [deleteModal, setDeleteModal] = useState<{
    open: boolean;
    title: string;
    id: string | number | null;
    type: string;
  }>({
    open: false,
    title: "",
    id: null,
    type: "",
  });

  // Data states
  const [tickets, setTickets] = useState([
    {
      id: "TKT-001",
      user: "John Doe",
      code: "WIN-2024-X",
      status: "Redeemed",
      date: "2024-03-15",
    },
    {
      id: "TKT-002",
      user: "Jane Smith",
      code: "WIN-2024-Y",
      status: "Pending",
      date: "2024-03-14",
    },
    {
      id: "TKT-003",
      user: "Mike Johnson",
      code: "WIN-2024-Z",
      status: "Expired",
      date: "2024-03-13",
    },
  ]);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      status: "Active",
      wallet: "2,500",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      status: "Active",
      wallet: "1,200",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      status: "Suspended",
      wallet: "0",
    },
  ]);

  const [bets, setBets] = useState([
    {
      id: "BET-001",
      user: "John Doe",
      match: "USA vs Brazil",
      prediction: "USA",
      stake: "500",
      status: "Open",
    },
    {
      id: "BET-002",
      user: "Jane Smith",
      match: "Germany vs France",
      prediction: "Draw",
      stake: "300",
      status: "Won",
    },
    {
      id: "BET-003",
      user: "Mike Johnson",
      match: "Spain vs Italy",
      prediction: "Spain",
      stake: "200",
      status: "Lost",
    },
  ]);

  const [visaApplications, setVisaApplications] = useState([
    {
      id: "VISA-001",
      user: "John Doe",
      destination: "USA",
      status: "Under Review",
      submitted: "2024-03-10",
    },
    {
      id: "VISA-002",
      user: "Jane Smith",
      destination: "UK",
      status: "Approved",
      submitted: "2024-03-08",
    },
    {
      id: "VISA-003",
      user: "Mike Johnson",
      destination: "France",
      status: "Pending Documents",
      submitted: "2024-03-12",
    },
  ]);

  const [payments, setPayments] = useState([
    {
      id: "PAY-001",
      user: "John Doe",
      amount: "$250",
      method: "Crypto",
      status: "Completed",
      date: "2024-03-15",
    },
    {
      id: "PAY-002",
      user: "Jane Smith",
      amount: "$150",
      method: "Card",
      status: "Completed",
      date: "2024-03-14",
    },
    {
      id: "PAY-003",
      user: "Mike Johnson",
      amount: "$300",
      method: "Crypto",
      status: "Pending",
      date: "2024-03-13",
    },
  ]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const stats = [
    {
      title: "Total Users",
      value: "12,847",
      change: "+12%",
      trend: "up",
      icon: Users,
    },
    {
      title: "Tickets Redeemed",
      value: "3,421",
      change: "+8%",
      trend: "up",
      icon: Ticket,
    },
    {
      title: "Visa Applications",
      value: "892",
      change: "+23%",
      trend: "up",
      icon: Plane,
    },
    {
      title: "Revenue",
      value: "$128,450",
      change: "-3%",
      trend: "down",
      icon: CreditCard,
    },
  ];

  const sidebarLinks = [
    { id: "analytics", label: "Analytics", icon: BarChart3, tab: null },
    { id: "tickets", label: "Tickets", icon: Ticket, tab: "tickets" },
    { id: "users", label: "Users", icon: Users, tab: "users" },
    { id: "betting", label: "Betting", icon: Trophy, tab: "betting" },
    { id: "visa", label: "Visa Reviews", icon: Plane, tab: "visa" },
    { id: "payments", label: "Payments", icon: CreditCard, tab: "payments" },
  ];

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      Redeemed: "bg-success/20 text-success",
      Pending: "bg-warning/20 text-warning",
      Expired: "bg-destructive/20 text-destructive",
      Active: "bg-success/20 text-success",
      Suspended: "bg-destructive/20 text-destructive",
      Open: "bg-info/20 text-info",
      Won: "bg-success/20 text-success",
      Lost: "bg-destructive/20 text-destructive",
      "Under Review": "bg-warning/20 text-warning",
      Approved: "bg-success/20 text-success",
      "Pending Documents": "bg-info/20 text-info",
      Completed: "bg-success/20 text-success",
    };
    return styles[status] || "bg-secondary text-secondary-foreground";
  };

  const handleNavClick = (tab: string | null) => {
    if (tab) {
      setActiveTab(tab);
    }
  };

  // View handlers
  const handleView = (title: string, data: Record<string, string>) => {
    setViewModal({ open: true, title, data });
  };

  // Edit handlers
  const handleEdit = (
    title: string,
    data: Record<string, string>,
    type: string
  ) => {
    setEditModal({ open: true, title, data, type });
  };

  const handleSaveEdit = (updatedData: Record<string, string>) => {
    switch (editModal.type) {
      case "ticket":
        setTickets((prev) =>
          prev.map((t) =>
            t.id === updatedData.id ? (updatedData as typeof t) : t
          )
        );
        break;
      case "user":
        setUsers((prev) =>
          prev.map((u) =>
            u.id === updatedData.id ? (updatedData as typeof u) : u
          )
        );
        break;
      case "bet":
        setBets((prev) =>
          prev.map((b) =>
            b.id === updatedData.id ? (updatedData as typeof b) : b
          )
        );
        break;
      case "visa":
        setVisaApplications((prev) =>
          prev.map((v) =>
            v.id === updatedData.id ? (updatedData as typeof v) : v
          )
        );
        break;
      case "payment":
        setPayments((prev) =>
          prev.map((p) =>
            p.id === updatedData.id ? (updatedData as typeof p) : p
          )
        );
        break;
    }
  };

  // Delete handlers
  const handleDelete = (title: string, id: string | number, type: string) => {
    setDeleteModal({ open: true, title, id, type });
  };

  const handleConfirmDelete = (id: string | number) => {
    switch (deleteModal.type) {
      case "ticket":
        setTickets((prev) => prev.filter((t) => t.id !== id));
        break;
      case "user":
        setUsers((prev) => prev.filter((u) => u.id !== id));
        break;
      case "bet":
        setBets((prev) => prev.filter((b) => b.id !== id));
        break;
      case "visa":
        setVisaApplications((prev) => prev.filter((v) => v.id !== id));
        break;
      case "payment":
        setPayments((prev) => prev.filter((p) => p.id !== id));
        break;
    }
  };

  // Get status options based on type
  const getStatusOptions = (type: string) => {
    switch (type) {
      case "ticket":
        return ["Redeemed", "Pending", "Expired"];
      case "user":
        return ["Active", "Suspended"];
      case "bet":
        return ["Open", "Won", "Lost"];
      case "visa":
        return ["Under Review", "Approved", "Pending Documents", "Rejected"];
      case "payment":
        return ["Completed", "Pending", "Failed"];
      default:
        return ["Active", "Pending", "Completed"];
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Modals */}
      <ViewModal
        open={viewModal.open}
        onOpenChange={(open) => setViewModal((prev) => ({ ...prev, open }))}
        title={viewModal.title}
        data={viewModal.data}
      />
      <EditModal
        open={editModal.open}
        onOpenChange={(open) => setEditModal((prev) => ({ ...prev, open }))}
        title={editModal.title}
        data={editModal.data}
        onSave={handleSaveEdit}
        statusOptions={getStatusOptions(editModal.type)}
      />
      <DeleteModal
        open={deleteModal.open}
        onOpenChange={(open) => setDeleteModal((prev) => ({ ...prev, open }))}
        title={deleteModal.title}
        itemId={deleteModal.id}
        onConfirm={handleConfirmDelete}
      />

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 border-r border-border bg-card/50 backdrop-blur-sm hidden lg:block">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl gradient-accent flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-accent-foreground" />
            </div>
            <span className="text-xl font-bold">Admin</span>
          </div>

          <nav className="space-y-2">
            {sidebarLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.tab)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  link.tab === activeTab ||
                  (link.id === "analytics" && !activeTab)
                    ? "bg-accent/10 text-accent font-medium"
                    : "text-muted-foreground hover:bg-secondary"
                }`}>
                <link.icon className="w-5 h-5" />
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border">
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="flex-1">
              <Settings className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="flex-1"
              onClick={handleLogout}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 pt-8 pb-8 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold mb-1">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground">
                Monitor and manage your platform.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
              <ThemeToggle />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-5 rounded-2xl border border-border bg-card">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">
                    {stat.title}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                <div
                  className={`flex items-center gap-1 text-sm ${
                    stat.trend === "up" ? "text-success" : "text-destructive"
                  }`}>
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  {stat.change} from last month
                </div>
              </div>
            ))}
          </div>

          {/* Tabs for Different Sections */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6">
            <TabsList className="bg-secondary/50 p-1 rounded-xl">
              <TabsTrigger value="tickets" className="rounded-lg">
                Tickets
              </TabsTrigger>
              <TabsTrigger value="users" className="rounded-lg">
                Users
              </TabsTrigger>
              <TabsTrigger value="betting" className="rounded-lg">
                Betting
              </TabsTrigger>
              <TabsTrigger value="visa" className="rounded-lg">
                Visa
              </TabsTrigger>
              <TabsTrigger value="payments" className="rounded-lg">
                Payments
              </TabsTrigger>
            </TabsList>

            {/* Tickets Tab */}
            <TabsContent value="tickets">
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-semibold">Ticket Management</h3>
                  <Button size="sm" variant="gradient">
                    Add Ticket
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          ID
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          User
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Code
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Status
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Date
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {tickets.map((ticket) => (
                        <tr
                          key={ticket.id}
                          className="border-t border-border hover:bg-secondary/30 transition-colors">
                          <td className="p-4 font-mono text-sm">{ticket.id}</td>
                          <td className="p-4">{ticket.user}</td>
                          <td className="p-4 font-mono text-sm">
                            {ticket.code}
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                ticket.status
                              )}`}>
                              {ticket.status}
                            </span>
                          </td>
                          <td className="p-4 text-muted-foreground">
                            {ticket.date}
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={() =>
                                  handleView("Ticket Details", ticket)
                                }>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={() =>
                                  handleEdit("Ticket", ticket, "ticket")
                                }>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-destructive"
                                onClick={() =>
                                  handleDelete("Ticket", ticket.id, "ticket")
                                }>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users">
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-semibold">User Management</h3>
                  <Button size="sm" variant="gradient">
                    Add User
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          ID
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Name
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Email
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Status
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Wallet
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr
                          key={user.id}
                          className="border-t border-border hover:bg-secondary/30 transition-colors">
                          <td className="p-4 font-mono text-sm">{user.id}</td>
                          <td className="p-4">{user.name}</td>
                          <td className="p-4 text-muted-foreground">
                            {user.email}
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                user.status
                              )}`}>
                              {user.status}
                            </span>
                          </td>
                          <td className="p-4 font-medium text-primary">
                            {user.wallet}
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={() =>
                                  handleView("User Details", user)
                                }>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={() =>
                                  handleEdit("User", user, "user")
                                }>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-destructive"
                                onClick={() =>
                                  handleDelete("User", user.id, "user")
                                }>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Betting Tab */}
            <TabsContent value="betting">
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-semibold">Betting Management</h3>
                  <Button size="sm" variant="gradient">
                    Add Match
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          ID
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          User
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Match
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Prediction
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Stake
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Status
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {bets.map((bet) => (
                        <tr
                          key={bet.id}
                          className="border-t border-border hover:bg-secondary/30 transition-colors">
                          <td className="p-4 font-mono text-sm">{bet.id}</td>
                          <td className="p-4">{bet.user}</td>
                          <td className="p-4">{bet.match}</td>
                          <td className="p-4">{bet.prediction}</td>
                          <td className="p-4 font-medium text-primary">
                            {bet.stake}
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                bet.status
                              )}`}>
                              {bet.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={() => handleView("Bet Details", bet)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={() => handleEdit("Bet", bet, "bet")}>
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Visa Tab */}
            <TabsContent value="visa">
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-semibold">Visa Application Reviews</h3>
                  <Button size="sm" variant="gradient">
                    Export
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          ID
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          User
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Destination
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Status
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Submitted
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {visaApplications.map((visa) => (
                        <tr
                          key={visa.id}
                          className="border-t border-border hover:bg-secondary/30 transition-colors">
                          <td className="p-4 font-mono text-sm">{visa.id}</td>
                          <td className="p-4">{visa.user}</td>
                          <td className="p-4">{visa.destination}</td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                visa.status
                              )}`}>
                              {visa.status}
                            </span>
                          </td>
                          <td className="p-4 text-muted-foreground">
                            {visa.submitted}
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={() =>
                                  handleView("Visa Application Details", visa)
                                }>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={() =>
                                  handleEdit("Visa Application", visa, "visa")
                                }>
                                <Edit className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Payments Tab */}
            <TabsContent value="payments">
              <div className="rounded-2xl border border-border bg-card overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between">
                  <h3 className="font-semibold">Payment Transactions</h3>
                  <Button size="sm" variant="gradient">
                    Export
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-secondary/50">
                      <tr>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          ID
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          User
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Amount
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Method
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Status
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Date
                        </th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {payments.map((payment) => (
                        <tr
                          key={payment.id}
                          className="border-t border-border hover:bg-secondary/30 transition-colors">
                          <td className="p-4 font-mono text-sm">
                            {payment.id}
                          </td>
                          <td className="p-4">{payment.user}</td>
                          <td className="p-4 font-medium text-primary">
                            {payment.amount}
                          </td>
                          <td className="p-4">{payment.method}</td>
                          <td className="p-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(
                                payment.status
                              )}`}>
                              {payment.status}
                            </span>
                          </td>
                          <td className="p-4 text-muted-foreground">
                            {payment.date}
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8"
                                onClick={() =>
                                  handleView("Payment Details", payment)
                                }>
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
