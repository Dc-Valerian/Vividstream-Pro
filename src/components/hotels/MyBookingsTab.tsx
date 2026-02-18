import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { endpoints, apiFetch } from "@/config/api";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, MapPin, CreditCard } from "lucide-react";
import { format } from "date-fns";

interface MyBookingsTabProps {
  onPay: (booking: any) => void;
}

export const MyBookingsTab = ({ onPay }: MyBookingsTabProps) => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchBookings();
    }
  }, [user]);

  const fetchBookings = async () => {
    try {
      const response = await apiFetch(endpoints.hotels.myBookings(user.id));
      if (response.ok) {
        const data = await response.json();
        setBookings(data.docs || []);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load your bookings");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-16 bg-muted/30 rounded-xl border border-dashed border-border">
        <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium">No Bookings Found</h3>
        <p className="text-muted-foreground mb-4">
          You haven't made any hotel reservations yet.
        </p>
        <Button
          variant="outline"
          onClick={() => (window.location.href = "/dashboard/hotels")}
        >
          Browse Hotels
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hotel</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Dates</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.map((booking) => (
              <TableRow
                key={booking._id}
                className="group hover:bg-muted/50 transition-colors"
              >
                <TableCell className="font-medium">
                  <div className="flex flex-col">
                    <span>{booking.hotelName}</span>
                    <span className="text-xs text-muted-foreground">
                      ID: {booking._id.substring(0, 8)}...
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-muted-foreground text-sm">
                    <MapPin className="w-3 h-3" />
                    {booking.location}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col text-sm">
                    <span>
                      {format(new Date(booking.checkInDate), "MMM d, yyyy")}
                    </span>
                    <span className="text-muted-foreground text-xs">to</span>
                    <span>
                      {format(new Date(booking.checkOutDate), "MMM d, yyyy")}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="font-semibold text-primary">
                  ₦{booking.totalPrice?.toLocaleString()}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="secondary"
                    className={getStatusColor(booking.bookingStatus)}
                  >
                    {booking.bookingStatus}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      booking.paymentStatus === "paid"
                        ? "border-green-500 text-green-500"
                        : "border-yellow-500 text-yellow-500"
                    }
                  >
                    {booking.paymentStatus}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {booking.paymentStatus === "pending" && (
                      <Button
                        size="sm"
                        variant="gradient"
                        onClick={() => onPay(booking)}
                      >
                        Pay Now
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      View Details
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
