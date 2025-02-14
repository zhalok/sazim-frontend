import { Badge } from "@/components/ui/badge";

export default function OrderStatus() {
  // This could be fetched from an API or state management in a real application
  const status = "Processing";

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Order Status</h2>
      <Badge variant={status === "Processing" ? "secondary" : "outline"}>
        {status}
      </Badge>
    </div>
  );
}
