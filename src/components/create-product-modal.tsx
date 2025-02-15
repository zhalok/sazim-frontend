"use client";

import { createProduct } from "@/api/product";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultiSelect } from "@/components/ui/multi-select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ProductCategory } from "@/types/Product";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

export default function AddProductModal() {
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const allCategories: ProductCategory[] =
    queryClient.getQueryData(["productCategories"]) || [];

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const addProductMutation = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      console.log(data);
      console.log(data);
      toast({
        title: "New product added",
        description: `Product ${data.name} added successfully`,
      });
      setOpen(false);
      setName("");
      setDescription("");
      setStock(0);
      setPrice(0);
      setSelectedCategories([]);
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log({ name, description, stock, price, selectedCategories });

    addProductMutation.mutate({
      name: name,
      description: description,
      stock: stock,
      price: price,
      categories: selectedCategories,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Product</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="stock">Stock</Label>
            <Input
              id="stock"
              type="number"
              value={stock}
              onChange={(e) => setStock(parseInt(e.target.value))}
              placeholder="Enter stock quantity"
              required
              min="0"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              placeholder="Enter price"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="categories">Categories</Label>
            <MultiSelect
              options={allCategories}
              selected={selectedCategories}
              onChange={setSelectedCategories}
              placeholder="Select categories"
            />
          </div>
          <Button type="submit">Add Product</Button>
        </form>
        {addProductMutation.error && (
          <p className="text-red-600 text-sm mt-2">
            {addProductMutation.error.message}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
