import { Product } from "@/types/Product";
import { useSearchParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export const ProductCard: React.FC<{ data: Product }> = ({ data }) => {
  const { id, name, description, categories } = data;
  const [searchParams, setSearchParams] = useSearchParams();
  const chooseProduct = () => {
    // const otherKeys = searchParams.keys();
    searchParams.delete("openEmailCollectionModal");

    searchParams.set("product", id);
    setSearchParams(searchParams);
  };
  return (
    <Card className="w-full max-w-md cursor-pointer">
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5">
          <div>
            <p>{description}</p>
            <p>
              Stock: <Badge>{data.stock}</Badge>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Categories: {categories.join(", ")}
            </p>
          </div>
          <div>
            <Button onClick={() => chooseProduct()}>Buy</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
