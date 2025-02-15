"use client";

import { makePayment } from "@/api/payment";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
