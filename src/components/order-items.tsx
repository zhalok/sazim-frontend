import OrderItem from "./order-item";

export default function OrderItems({
  orderItems,
  totalPayableAmount,
}: {
  orderItems: { id: string; name: string; quantity: number; price: number }[];
  totalPayableAmount: number;
}) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Order Items</h2>
      <ul className="space-y-4">
        {orderItems.map((item) => (
          <li
            key={item.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <OrderItem item={item} />
          </li>
        ))}
      </ul>
      <div className="mt-4 text-right">
        <span className="font-bold">Total: $</span>
        <span className="font-bold">{totalPayableAmount}</span>
      </div>
    </div>
  );
}
