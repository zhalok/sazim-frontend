import OrderList from "@/components/order-items";
import OrderStatus from "@/components/order-status";
import PaymentButton from "@/components/payment-button";

export default function Order() {
  return (
    <main className="container mx-auto px-4 py-8 text-black">
      <h1 className="text-3xl font-bold mb-6 text-black">Your Order</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <OrderList />
        </div>
        <div className="space-y-6">
          <PaymentButton />
          <OrderStatus />
        </div>
      </div>
    </main>
  );
}
