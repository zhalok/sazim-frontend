import { getAllProducts } from "@/api/product";
import { GetEmailForOrdersModal } from "@/components/my-orders-button";
import { PaginationBar } from "@/components/pagination";
import PlaceOrderModal from "@/components/place-order-modal";
import { Products } from "@/components/products";
import { Button } from "@/components/ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const AllProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1", 10);
  searchParams.delete("product");
  const [showEmailCollectionModal, setShowEmailCollectionModal] =
    useState(false);

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

  useEffect(() => {
    if (searchParams.get("openEmailCollectionModal")) {
      setShowEmailCollectionModal(true);
      searchParams.delete("openEmailCollectionModal");
    }
  }, [searchParams]);

  if (isProductDataLoading) return <>Loading</>;

  if (productsError) return <>Error</>;

  if (!productsData) return <>No Product Data</>;

  const { data, pagination }: any = productsData;

  return (
    <div className="w-full flex flex-col gap-2">
      <PlaceOrderModal />
      <GetEmailForOrdersModal
        isOpen={showEmailCollectionModal}
        onClose={() => {
          setShowEmailCollectionModal(false);
        }}
      />
      <Button onClick={() => setShowEmailCollectionModal(true)}>
        My Orders
      </Button>

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
