import { getProductCategories } from "@/api/product";
import { getMyProducts } from "@/api/products";
import AddProductModal from "@/components/create-product-modal";
import { Products } from "@/components/products";
import { useQuery } from "@tanstack/react-query";

export const SellerProducts = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const limit = parseInt(urlParams.get("limit") || "10", 10);
  const page = parseInt(urlParams.get("page") || "1", 10);

  const {
    data: productCategoriesData,
    isLoading: isProductCategoryLoading,
    error: productCategoryError,
  } = useQuery({
    queryKey: ["productCategories"],
    staleTime: 5000 * 60,
    queryFn: () => {
      return getProductCategories();
    },
  });

  const {
    data: productsData,
    isLoading: isProductDataLoading,
    error: productsError,
  } = useQuery({
    queryKey: ["products", limit, page],
    queryFn: () => getMyProducts({ limit, page }),
    staleTime: 5000 * 60,
  });
  console.log("productsData", productsData);

  if (isProductDataLoading || isProductCategoryLoading) return <>Loading</>;

  if (productsError || productCategoryError) return <>Error</>;

  if (!productCategoriesData) return <>No Category Data</>;

  if (!productsData) return <>No Product Data</>;

  const { data }: any = productsData;

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-fit ml-auto">
        {" "}
        <AddProductModal />
      </div>
      <Products products={data} />
    </div>
  );
};
