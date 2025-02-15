import { getMyOrders } from "@/api/order";
import { OrderList } from "@/components/orders-list";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Orders() {
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get("page") || "1", 10);
  const customerToken = searchParams.get("customerToken");
  const navigate = useNavigate();

  const {
    data: ordersData,
    isLoading: isOrderDataLoading,
    error: orderError,
  } = useQuery({
    queryFn: () =>
      getMyOrders({
        page: page,
        limit: 10,
        customerToken: customerToken || "",
      }),
    queryKey: ["orders", page],
  });

  if (isOrderDataLoading) return <>Loading</>;

  if (orderError) {
    navigate("/?openEmailCollectionModal=true");
  }

  if (!ordersData) return <>No Order Data</>;

  const { data, pagination }: any = ordersData;
  console.log("data", data);
  console.log("pagination", pagination);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Orders</h1>
      <OrderList orders={data} role={"USER"} />
    </div>
  );
}
