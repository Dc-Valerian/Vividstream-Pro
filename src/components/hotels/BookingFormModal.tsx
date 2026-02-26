import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface BookingFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hotel: any;
  onConfirm: (bookingData: any) => Promise<void>;
  loading: boolean;
}

export const BookingFormModal = ({
  open,
  onOpenChange,
  hotel,
  onConfirm,
  loading,
}: BookingFormModalProps) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    guests: 1,
    rooms: 1,
    specialRequests: "",
  });

  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(),
    to: new Date(Date.now() + 86400000), // Tomorrow
  });

  useEffect(() => {
    if (user) {
      // bioactive split name if possible
      const names = user.name?.split(" ") || [];
      setFormData((prev) => ({
        ...prev,
        firstName: names[0] || "",
        lastName: names.slice(1).join(" ") || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const calculateTotalPrice = () => {
    if (!dateRange.from || !dateRange.to || !hotel?.price) return 0;
    const days = Math.ceil(
      (dateRange.to.getTime() - dateRange.from.getTime()) /
        (1000 * 60 * 60 * 24),
    );
    return days * hotel.price * formData.rooms;
  };

  const handleSubmit = async () => {
    if (!dateRange.from || !dateRange.to) {
      toast.error("Please select check-in and check-out dates");
      return;
    }
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Please fill in all contact details");
      return;
    }

    const bookingData = {
      userId: user?.id,
      hotelName: hotel.name,
      location: hotel.location,
      checkInDate: dateRange.from.toISOString(),
      checkOutDate: dateRange.to.toISOString(),
      guests: Number(formData.guests),
      rooms: Number(formData.rooms),
      totalPrice: calculateTotalPrice(),
      contactDetails: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        specialRequests: formData.specialRequests,
      },
    };

    await onConfirm(bookingData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Your Stay at {hotel?.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Dates */}
          <div className="space-y-2">
            <Label>Stay Dates</Label>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateRange.from && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      format(dateRange.from, "PPP")
                    ) : (
                      <span>Check-in</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.from}
                    onSelect={(date) =>
                      setDateRange((prev) => ({ ...prev, from: date }))
                    }
                    initialFocus
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateRange.to && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.to ? (
                      format(dateRange.to, "PPP")
                    ) : (
                      <span>Check-out</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateRange.to}
                    onSelect={(date) =>
                      setDateRange((prev) => ({ ...prev, to: date }))
                    }
                    initialFocus
                    disabled={(date) => date <= (dateRange.from || new Date())}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Room & Guest Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Guests</Label>
              <Input
                type="number"
                min={1}
                value={formData.guests}
                onChange={(e) =>
                  setFormData({ ...formData, guests: Number(e.target.value) })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Rooms</Label>
              <Input
                type="number"
                min={1}
                value={formData.rooms}
                onChange={(e) =>
                  setFormData({ ...formData, rooms: Number(e.target.value) })
                }
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4 border-t border-border pt-4">
            <h4 className="font-medium">Guest Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First Name</Label>
                <Input
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  placeholder="John"
                />
              </div>
              <div className="space-y-2">
                <Label>Last Name</Label>
                <Input
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="john@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  placeholder="+234..."
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Special Requests (Optional)</Label>
              <Textarea
                value={formData.specialRequests}
                onChange={(e) =>
                  setFormData({ ...formData, specialRequests: e.target.value })
                }
                placeholder="Late check-in, dietary needs..."
              />
            </div>
          </div>

          {/* Summary */}
          <div className="bg-secondary/30 p-4 rounded-lg flex justify-between items-center">
            <span className="font-medium text-muted-foreground">
              Total Price (Approx.):
            </span>
            <span className="text-xl font-bold text-primary">
              ₦{calculateTotalPrice().toLocaleString()}
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="gradient" onClick={handleSubmit} disabled={loading}>
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              "Proceed to Payment"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
