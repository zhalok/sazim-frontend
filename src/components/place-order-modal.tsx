"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMatch, useNavigate, useSearchParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { createOrder } from "@/api/order";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select";

export default function OrderModal({}) {
  const [searchParams] = useSearchParams();
  const selectedProduct = searchParams.get("product");
  const [open, setOpen] = useState(selectedProduct ? true : false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    orderType: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const placeOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (data: any) => {
      toast({
        title: "Order Created",
      });
      navigate(`/orders/${data.id}`);
    },
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your server
    console.log("Order placed:", formData);
    if (
      !selectedProduct ||
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.phone
    ) {
      toast({
        title: "Please fill all the fields",
        variant: "destructive",
      });
      return;
    }
    placeOrderMutation.mutate({
      customerAddress: formData.address,
      customerEmail: formData.email,
      customerName: formData.name,
      customerPhone: formData.phone,
      orderItems: [{ productId: selectedProduct, quantity: 1 }],
    });

    setOpen(false);
  };

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, orderType: value }));
  };

  useEffect(() => {
    const selectedProduct = searchParams.get("product");
    if (selectedProduct) setOpen(true);
  }, [searchParams]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Place Your Order</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Fruits</SelectLabel>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button type="submit" className="w-full">
              Place Order
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
