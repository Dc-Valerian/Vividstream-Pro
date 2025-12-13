import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

interface DeleteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  itemId: string | number | null;
  onConfirm: (id: string | number) => void;
}

export const DeleteModal = ({ 
  open, 
  onOpenChange, 
  title, 
  itemId, 
  onConfirm 
}: DeleteModalProps) => {
  const handleConfirm = () => {
    if (itemId !== null) {
      onConfirm(itemId);
      toast({
        title: "Deleted Successfully",
        description: `${title} has been removed.`,
        variant: "destructive",
      });
    }
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the {title.toLowerCase()} 
            {itemId && <span className="font-semibold text-foreground"> ({itemId})</span>} 
            from the system.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
