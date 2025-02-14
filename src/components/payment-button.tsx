"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function PaymentButton({ paymentId }: { paymentId: string }) {
  const [isProcessing, setIsProcessing] = useState(false);
  console.log("payment id", paymentId);
  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      alert("Payment processed successfully!");
    }, 2000);
  };

  return (
    <Button onClick={handlePayment} disabled={isProcessing} className="w-full">
      {isProcessing ? "Processing..." : "Pay Now"}
    </Button>
  );
}
