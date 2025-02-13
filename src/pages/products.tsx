import { getAllProducts, getProductCategories } from "@/api/product";
import { PaginationBar } from "@/components/pagination";
import { Products } from "@/components/products";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

export const AllProducts = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(urlParams.get("page") || "1", 10);

  const {
    data: productsData,
    isLoading: isProductDataLoading,
    error: productsError,
  } = useQuery({
    queryFn: () => {
      return getAllProducts({ limit: 10, page });
    },
    queryKey: ["products", page],
  });

  const queryClient = useQueryClient();

  if (isProductDataLoading) return <>Loading</>;

  if (productsError) return <>Error</>;

  if (!productsData) return <>No Product Data</>;

  const { data, pagination }: any = productsData;

  return (
    <div className="w-full flex flex-col gap-2">
      <Products products={data} />
      {pagination && (
        <PaginationBar
          limit={pagination.limit}
          currentPage={pagination.page}
          totalItems={pagination.total}
          onPageChange={(page: number) => {
            searchParams.set("page", page.toString());
            setSearchParams(searchParams);
            queryClient.invalidateQueries({ queryKey: ["products"] });
          }}
        />
      )}
    </div>
  );
};
