"use client";

import { createOrder } from "@/api/order";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const orderTypes = [
  {
    label: "Purchase",
    value: "PURCHASE",
  },
  {
    label: "Rental",
    value: "RENT",
  },
];

export default function OrderModal() {
  const [searchParams] = useSearchParams();
  const selectedProduct = searchParams.get("product");
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    orderType: "",
    rentalPeriod: 0,
  });
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const placeOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (data: any) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["products"] });
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
      orderType: formData.orderType,
      rentPeriodInDays: formData.rentalPeriod,
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
            <Label htmlFor="orderType">Order Type</Label>
            <Select
              onValueChange={handleSelectChange}
              value={formData.orderType}
            >
              <SelectTrigger id="orderType">
                <SelectValue placeholder="Select order type" />
              </SelectTrigger>
              <SelectContent>
                {orderTypes.map((orderType) => (
                  <SelectItem key={orderType.value} value={orderType.value}>
                    {orderType.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {formData.orderType === "RENT" && (
            <div className="space-y-2">
              <Label htmlFor="rentalPeriod">Rental Period (in days)</Label>
              <Input
                id="rentalPeriod"
                name="rentalPeriod"
                type="number"
                value={formData.rentalPeriod}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <Button type="submit" className="w-full">
            Place Order
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
