import { getMyOrders } from "@/api/order";
import { OrderList } from "@/components/orders-list";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

const mockOrders = [
  { id: 1, totalAmount: 100, status: "Pending" },
  { id: 2, totalAmount: 150, status: "Paid" },
  { id: 3, totalAmount: 200, status: "Shipped" },
  { id: 4, totalAmount: 75, status: "Pending" },
];

export default function Orders() {
  const [searchParams, setSearchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);

  const {
    data: ordersData,
    isLoading: isOrderDataLoading,
    error: orderError,
  } = useQuery({
    queryFn: () =>
      getMyOrders({
        page: page,
        limit: 10,
      }),
    queryKey: ["orders", page],
  });

  if (isOrderDataLoading) return <>Loading</>;

  if (orderError) return <>Error</>;

  if (!ordersData) return <>No Order Data</>;

  const { data, pagination }: any = ordersData;
  console.log("data", data);
  console.log("pagination", pagination);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <OrderList orders={data} />
    </div>
  );
}
