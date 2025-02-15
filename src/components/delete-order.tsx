import { deleteOrder } from "@/api/order";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export default function DeleteOrder({
  id,
  orderStatus,
}: {
  id: string;
  orderStatus: string;
}) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const deleteOrderMutation = useMutation({
    mutationFn: deleteOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      toast({
        title: "Order Deleted",
      });
      setOpen(false);
    },
    onError: (err) => {
      toast({
        title: err.message,
        variant: "destructive",
      });
    },
  });

  const handlDelete = (id: string) => {
    deleteOrderMutation.mutate(id);
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            setOpen(true);
          }}
          disabled={orderStatus === "COMPLETED"}
        >
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this order?</DialogTitle>
          <DialogDescription>
            Once you complete the order this action cannot be reversed
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
            }}
          >
            No, keep this order
          </Button>
          <Button
            variant="destructive"
            onClick={() => handlDelete(id)}
            disabled={deleteOrderMutation.isPending}
          >
            Yes, delete this order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
