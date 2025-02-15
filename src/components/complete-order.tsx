import { useMutation, useQueryClient } from "@tanstack/react-query";
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
import { useState } from "react";
import { completeOrder } from "@/api/order";
import { useToast } from "@/hooks/use-toast";

export default function CompleteOrder({
  id,
  orderStatus,
}: {
  id: string;
  orderStatus: string;
}) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const completeOrderMutation = useMutation({
    mutationFn: completeOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      toast({
        title: "Order Completed",
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
    completeOrderMutation.mutate(id);
  };

  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            setOpen(true);
          }}
          disabled={!(orderStatus === "PLACED" || orderStatus === "ON_RENT")}
        >
          Complete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Are you sure you want to complete this order?
          </DialogTitle>
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
            No
          </Button>
          <Button
            variant="secondary"
            onClick={() => handleCancel(id)}
            disabled={completeOrderMutation.isPending}
          >
            Yes, complete my order
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
