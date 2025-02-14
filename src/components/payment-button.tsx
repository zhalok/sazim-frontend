"use client";

import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { makePayment } from "@/api/payment";

export default function PaymentButton({ paymentId }: { paymentId: string }) {
  const queryClient = useQueryClient();
  const makePaymentMutation = useMutation({
    mutationFn: makePayment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["order"],
      });
    },
  });
  const handlePayment = () => {
    makePaymentMutation.mutate(paymentId);
  };

  return (
    <Button
      onClick={handlePayment}
      disabled={makePaymentMutation.isPending}
      className="w-full"
    >
      {makePaymentMutation.isPending ? "Processing..." : "Pay Now"}
    </Button>
  );
}
