import { useState, useEffect } from "react";
import { getIconBg, getStatusColor } from "@/types/types";
import { ExternalLink, Ticket, Plane, Hotel, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { API_BASE_URL } from "@/config/api";

interface UserData {
  hasTicket: boolean;
  visaStatus?: string;
  walletBalance?: number;
}

const StatusCards = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        // Get user data including visa status
        const token = localStorage.getItem("token");
        const userRes = await fetch(
          `${API_BASE_URL}/users/get-user/${(user as any).id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );

        let visaStatus = "none";

        if (userRes.ok) {
          const userJson = await userRes.json();

          // Check for visa applications
          const userId = (user as any).id;
          const visaRes = await fetch(
            `${API_BASE_URL}/visa-applications/user/${userId}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            },
          );

          if (visaRes.ok) {
            const visas = await visaRes.json();
            if (visas && visas.length > 0) {
              // Get the most recent visa application status
              visaStatus = visas[0].status || "submitted";
            }
          }

          setUserData({
            hasTicket: userJson.hasTicket || false,
            visaStatus,
            walletBalance: userJson.walletBalance || 0,
          });
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        setUserData({
          hasTicket: (user as any).hasTicket || false,
          visaStatus: "none",
          walletBalance: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="p-5 rounded-2xl border bg-card/50 animate-pulse h-32"
          />
        ))}
      </div>
    );
  }

  const getVisaStatus = () => {
    const visaStatus = userData?.visaStatus;
    if (!visaStatus || visaStatus === "none" || visaStatus === "Not Started") {
      return { value: "Not Started", status: "info" };
    }
    const statusMap: Record<string, { value: string; status: string }> = {
      pending: { value: "Pending", status: "warning" },
      submitted: { value: "Submitted", status: "warning" },
      approved: { value: "Approved", status: "success" },
      rejected: { value: "Rejected", status: "error" },
    };
    return (
      statusMap[visaStatus.toLowerCase()] || {
        value: "Not Started",
        status: "info",
      }
    );
  };

  const visaStatus = getVisaStatus();

  const statusCards = [
    {
      title: "Ticket Status",
      value: userData?.hasTicket ? "Active" : "No Ticket",
      icon: Ticket,
      status: userData?.hasTicket ? "success" : "neutral",
      action: null,
    },
    {
      title: "Visa Application",
      value: visaStatus.value,
      icon: Plane,
      status: visaStatus.status,
      action: { label: "Manage Application", href: "/dashboard/visa" },
    },
    {
      title: "Hotel Booking",
      value: visaStatus.status === "success" ? "Available" : "Locked",
      icon: Hotel,
      status: visaStatus.status === "success" ? "success" : "locked",
      subtitle:
        visaStatus.status === "success"
          ? "Book your stay"
          : "Requires Visa Approval",
    },
    {
      title: "Vividstream Wallet",
      value: userData?.walletBalance?.toLocaleString() || "0",
      icon: Wallet,
      status: "success",
      isHighlight: true,
    },
  ];

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {statusCards.map((card, index) => (
        <div
          key={index}
          className={`p-5 rounded-2xl border transition-all duration-300 hover:shadow-lg ${getStatusColor(
            card.status,
          )}`}
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-sm text-muted-foreground">{card.title}</span>
            <card.icon className={`w-5 h-5 ${getIconBg(card.status)}`} />
          </div>
          <div
            className={`text-xl font-bold mb-1 ${
              card.isHighlight ? "text-primary" : ""
            }`}
          >
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
  );
};

export default StatusCards;
