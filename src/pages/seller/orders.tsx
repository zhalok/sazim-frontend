import { getAllOrders } from "@/api/order";
import { OrderList } from "@/components/orders-list";
import { PaginationBar } from "@/components/pagination";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function SellerOrders() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  const {
    data: allOrdersData,
    error: allOrdersError,
    isLoading: isAllOrdersLoading,
  } = useQuery({
    queryFn: () => getAllOrders({ limit: 10, page }),
    queryKey: ["orders", page],
  });

  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  console.log("decoded", decoded);

  const queryClient = useQueryClient();

  if (isAllOrdersLoading) return <>Loading</>;

  if (allOrdersError) return <>Error</>;

  if (!allOrdersData) return <>No Data</>;

  const { data, pagination } = allOrdersData;

  return (
    <>
      <OrderList orders={data} role="SELLER" />
      {pagination && (
        <PaginationBar
          limit={pagination.limit}
          currentPage={pagination.page}
          totalItems={pagination.total}
          onPageChange={(page: number) => {
            searchParams.set("page", page.toString());
            setSearchParams(searchParams);
            queryClient.invalidateQueries({ queryKey: ["orders"] });
          }}
        />
      )}
    </>
  );
}
