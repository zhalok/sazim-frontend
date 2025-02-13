import { Product } from "@/types/Product";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export const ProductCard: React.FC<{ data: Product }> = ({ data }) => {
  const { id, name, description, categories } = data;
  return (
    <Card className="w-full max-w-md cursor-pointer">
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-5">
          <div>
            <p>{description}</p>
            <p className="text-sm text-gray-500 mt-2">
              Categories: {categories.join(", ")}
            </p>
          </div>
          <div>
            <Button>Buy</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
