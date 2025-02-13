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
  return response.data.data.productCategories.categories;
}

export async function getProduct({ id }: { id: string }) {
  const response = await instance.post("/graphql", {
    query: `
      query Product {
    product(id: "${id}") {
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

export async function getAllProducts({
  limit,
  page,
}: {
  limit: number;
  page: number;
}) {
  const query = `query Products($limit: Int!, $page: Int!) {
    products(limit: $limit, page: $page) {
        data {
            id
            name
            description
            price
            stock
            categories
        }
        pagination {
            limit
            page
            total
        }
    }
}
`;

  const response = await instance.post("/graphql", {
    query,
    variables: {
      limit,
      page,
    },
  });

  return response.data.data.products;
}

export async function createProduct(productData: Omit<Product, "id">) {
  const query = ` mutation CreateProduct($input: CreateProductInput!) {
        createProduct(createProductInput: $input) {
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
      variables: {
        input: productData,
      },
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );
  if ("errors" in response.data) {
    throw new Error(response.data.errors[0].message);
  }
  return response.data.data.createProduct.data;
}
