import { cancelOrder } from "@/api/order";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
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

export default function CancelOrder({
  id,
  orderStatus,
}: {
  id: string;
  orderStatus: string;
}) {
  const [searchParams] = useSearchParams();
  const customerToken = searchParams.get("customerToken");
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const cancelOrderMutation = useMutation({
    mutationFn: cancelOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      toast({
        title: "Order Cancelled",
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

  const handleCancel = (id: string) => {
    cancelOrderMutation.mutate({
      id,
      email: "rahmanzhalok@gmail.com",
      reason: "",
      customerToken: customerToken || "",
    });
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
          disabled={orderStatus !== "PENDING"}
        >
          Cancel
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to cancel this order?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently cancel your
            order.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setOpen(false);
            }}
          >
            No, keep my order
          </Button>
          <Button variant="destructive" onClick={() => handleCancel(id)}>
            Yes, cancel my order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
