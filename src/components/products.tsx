import { ProductCard } from "@/components/product";
import { Product } from "@/types/Product";

interface ProductsProps {
  products: Product[];
  pagination?: {
    limit: number;
    page: number;
    total: number;
  };
}

export const Products = ({ products }: ProductsProps) => {
  return (
    <div className="w-full mx-auto">
      <div className="grid grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};
