import { Product } from "@/types/Product";
import instance from ".";

export async function getProductCategories() {
  const response = await instance.post("/graphql", {
    query: `
    query MyProducts {
    productCategories {
        categories {
            label
            value
        }
    }
}`,
  });
  console.log(response.data.data.productCategories.categories);
  return response.data.data.productCategories.categories;
}

export async function getProduct({ id }: { id: string }) {
  const response = await instance.post("/graphql", {
    query: `
      query Product {
    product(id: ${id}) {
        data {
            id
            name
            description
            price
            stock
            categories
        }
    }
}

    `,
  });

  return response.data.data.products;
}

export async function createProduct(productData: Omit<Product, "id">) {
  const query = `mutation CreateProduct {
      createProduct(
          createProductInput: {
              name: "${productData.name}"
              description: "${productData.description}"
              price: ${productData.price}
              stock: ${productData.stock}
              categories: "${productData.categories}"
          }
      ) {
          data {
              id
              name
              description
              price
              stock
              categories
          }
      }
  }`;

  const response = await instance.post(
    "/graphql",
    {
      query,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  console.log("created product", response.data.e);
  if ("errors" in response.data) {
    throw new Error(response.data.errors[0].message);
  }
  return response.data.data.createProduct.data;
  // return response.data.data.createProduct;
}
