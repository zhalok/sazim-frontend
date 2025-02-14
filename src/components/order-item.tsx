export default function OrderItem({
  item,
}: {
  item: { name: string; quantity: number; price: number };
}) {
  return (
    <div>
      <div>
        <span className="font-medium">{item.name}</span>
        <span className="text-gray-600 ml-2">x{item.quantity}</span>
      </div>
      <span className="font-medium">${item.price * item.quantity}</span>
    </div>
  );
}
