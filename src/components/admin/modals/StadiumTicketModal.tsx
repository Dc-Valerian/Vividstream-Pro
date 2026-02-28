/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IStadiumTicket } from "@/../../VividStream-Pro_BE/src/models/StadiumTicket";

interface StadiumTicketModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  ticket?: any;
  onSave: (data: any) => Promise<void>;
}

export const StadiumTicketModal = ({
  open,
  onOpenChange,
  ticket,
  onSave,
}: StadiumTicketModalProps) => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const categoryValue = watch("category");
  const tagValue = watch("tag");

  useEffect(() => {
    if (ticket) {
      reset({
        section: ticket.section,
        row: ticket.row,
        category: String(ticket.category),
        price: ticket.price,
        ticketsAvailable: ticket.ticketsAvailable,
        rating: ticket.rating,
        view: ticket.view,
        tag: ticket.tag || "none",
      });
      setValue("category", String(ticket.category));
      setValue("tag", ticket.tag || "none");
    } else {
      reset({
        section: "",
        row: "",
        category: "2",
        price: 600,
        ticketsAvailable: 10,
        rating: 9.5,
        view: "Great view of the pitch",
        tag: "none",
      });
      setValue("category", "2");
      setValue("tag", "none");
    }
  }, [ticket, reset, setValue, open]);

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      const formattedData = {
        ...data,
        category: parseInt(data.category, 10),
        price: parseFloat(data.price),
        ticketsAvailable: parseInt(data.ticketsAvailable, 10),
        rating: parseFloat(data.rating),
        tag: data.tag === "none" ? null : data.tag,
      };
      await onSave(formattedData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {ticket ? "Edit Listing" : "Create Listing"}
          </DialogTitle>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 max-h-[70vh] overflow-y-auto px-1"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="section">Section</Label>
              <Input
                id="section"
                placeholder="e.g. 110"
                {...register("section", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="row">Row</Label>
              <Input
                id="row"
                placeholder="e.g. A"
                {...register("row", { required: true })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={categoryValue}
                onValueChange={(val) => setValue("category", val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 (Pitch Side)</SelectItem>
                  <SelectItem value="2">2 (Lower Bowl)</SelectItem>
                  <SelectItem value="3">3 (Mid Tier)</SelectItem>
                  <SelectItem value="4">4 (Upper Deck)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Price (₦)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                {...register("price", { required: true, min: 0 })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ticketsAvailable">Tickets Available</Label>
              <Input
                id="ticketsAvailable"
                type="number"
                min="0"
                {...register("ticketsAvailable", { required: true, min: 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rating">Rating (out of 10)</Label>
              <Input
                id="rating"
                type="number"
                min="0"
                max="10"
                step="0.1"
                {...register("rating", { required: true, min: 0, max: 10 })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tag">Marketing Tag</Label>
            <Select
              value={tagValue}
              onValueChange={(val) => setValue("tag", val)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="Best Price">Best Price</SelectItem>
                <SelectItem value="Best Deal">Best Deal</SelectItem>
                <SelectItem value="Best View">Best View</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="view">View Description</Label>
            <Input
              id="view"
              placeholder="e.g. Great view of the pitch"
              {...register("view", { required: true })}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Listing"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
