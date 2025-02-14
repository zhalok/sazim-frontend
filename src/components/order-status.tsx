import { Badge } from "@/components/ui/badge";

export default function OrderStatus({ status }: { status: string }) {
  // This could be fetched from an API or state management in a real application

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Order Status</h2>
      <Badge variant="secondary">{status}</Badge>
    </div>
  );
}
