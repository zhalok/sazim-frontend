import { getOrder } from "@/api/order";
import OrderList from "@/components/order-items";
import OrderStatus from "@/components/order-status";
import PaymentButton from "@/components/payment-button";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export default function Order() {
  const { id } = useParams<{ id: string }>();

  const {
    data: orderData,
    isLoading: isOrderLoading,
    error: isOrderError,
  } = useQuery({
    queryFn: () => id && getOrder(id),
    queryKey: ["order", id],
  });

  if (isOrderLoading) {
    return <div>Loading...</div>;
  }

  if (isOrderError) {
    return <div>Error: {isOrderError.message}</div>;
  }

  console.log("order data", orderData);

  return (
    <main className="container mx-auto px-4 py-8 text-black">
      <h1 className="text-3xl font-bold mb-6 text-black">Your Order</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <OrderList
            totalPayableAmount={orderData.totalAmount}
            orderItems={orderData.orderItems.map((orderItem: any) => {
              const { product } = orderItem;
              return {
                id: product.id,
                name: product.name,
                quantity: orderItem.quantity,
                price: product.price,
              };
            })}
          />
        </div>
        <div className="space-y-6">
          {orderData.status === "PENDING" && (
            <PaymentButton paymentId={orderData.paymentId} />
          )}
          <OrderStatus status={orderData.status} />
        </div>
      </div>
    </main>
  );
}
