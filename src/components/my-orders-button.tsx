"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { createToken } from "@/api/order";

interface MyOrdersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function GetEmailForOrdersModal({
  isOpen,
  onClose,
}: MyOrdersModalProps) {
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const createCustomerTokenMutation = useMutation({
    mutationFn: createToken,
    onSuccess: () => {
      toast({
        title: "Check your email",
        description: "We've sent you an email with your order access link.",
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    createCustomerTokenMutation.mutate(email);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Check Your Orders</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="col-span-3"
                required
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit">Check Orders</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
