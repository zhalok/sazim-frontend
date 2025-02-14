import OrderItem from "./order-item";

const orderItems = [
  { id: 1, name: "Widget A", quantity: 2, price: 19.99 },
  { id: 2, name: "Gadget B", quantity: 1, price: 29.99 },
  { id: 3, name: "Doohickey C", quantity: 3, price: 9.99 },
];

export default function OrderItems() {
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
        <span className="font-bold">
          {orderItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </span>
      </div>
    </div>
  );
}
