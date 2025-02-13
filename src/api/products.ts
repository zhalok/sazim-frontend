import instance from ".";

export async function getProducts({
  name,
  page = 1,
  limit = 10,
  categories,
}: {
  page: number;
  limit: number;
  name: string;
  categories: string[];
}) {
  const response = await instance.post("/graphql", {
    query: `
      query Products {
    products(limit: ${limit}, page: ${page}, filter: { name: ${name} categories: ${categories}}) {
        pagination {
            limit
            page
            total
        }
        data {
            id
            name
            description
            price
            stock
            categories
        }
    }
    `,
  });

  return response.data.data.products;
}

export async function getMyProducts({
  limit,
  page,
}: {
  limit: number;
  page: number;
}) {
  const query = `
  query MyProducts {
    myProducts(limit: ${limit}, page: ${page}) {
        pagination {
            limit
            page
            total
        }
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

`;

  try {
    const response = await instance.post(
      "/graphql",
      {
        query,
        variables: {
          limit,
          page,
        },
      },{
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      } 
    );
    console.log("response",response)
    return response.data.data.myProducts
  } catch (error) {
    console.log("hello")
    
    console.error("Error fetching products:", error);
  }
}
