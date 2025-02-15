"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "@/api/order";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import CancelOrder from "./cancel-order";
import OrderStatus from "./order-status";
import { Badge } from "./ui/badge";
import CompleteOrder from "./complete-order";

interface Order {
  id: string;
  totalAmount: number;
  status: string;
}

interface OrderListProps {
  orders: Order[];
  role: string;
}

export function OrderList({ orders, role }: OrderListProps) {
  const navigate = useNavigate();

  const handleView = (id: string) => {
    navigate(`/orders/${id}`);
  };

  return (
    <>
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
              <TableCell>
                {" "}
                <Badge variant="secondary">{order.status}</Badge>
              </TableCell>
              <TableCell>
                <div className="space-x-2">
                  {role === "USER" && (
                    <CancelOrder id={order.id} orderStatus={order.status} />
                  )}
                  {role === "SELLER" && (
                    <CompleteOrder id={order.id} orderStatus={order.status} />
                  )}
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleView(order.id)}
                  >
                    View
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
