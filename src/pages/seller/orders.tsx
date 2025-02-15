import { getAllOrders } from "@/api/order";
import { OrderList } from "@/components/orders-list";
import { PaginationBar } from "@/components/pagination";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

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
  const queryClient = useQueryClient();

  if (isAllOrdersLoading) return <>Loading</>;

  if (allOrdersError) return <>Error</>;

  if (!allOrdersData) return <>No Data</>;

  const { data, pagination } = allOrdersData;

  return (
    <>
      <OrderList orders={data} />
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
