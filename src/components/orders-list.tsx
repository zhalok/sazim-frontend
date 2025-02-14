"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Order {
  id: number;
  totalAmount: number;
  status: string;
}

interface OrderListProps {
  orders: Order[];
}

export function OrderList({ orders: initialOrders }: OrderListProps) {
  const [orders, setOrders] = useState(initialOrders);

  const handleCancel = (id: number) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: "Cancelled" } : order
      )
    );
  };

  const handlePay = (id: number) => {
    setOrders(
      orders.map((order) =>
        order.id === id ? { ...order, status: "Paid" } : order
      )
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Total Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>${order.totalAmount.toFixed(2)}</TableCell>
            <TableCell>{order.status}</TableCell>
            <TableCell>
              <div className="space-x-2">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleCancel(order.id)}
                  disabled={
                    order.status === "Cancelled" || order.status === "Shipped"
                  }
                >
                  Cancel
                </Button>
                {order.status === "Pending" && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handlePay(order.id)}
                  >
                    Pay
                  </Button>
                )}
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
