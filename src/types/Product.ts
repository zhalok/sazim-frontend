export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  categories: string[];
};

export type ProductCategory = {
  label: string;
  value: string;
};
