import axios from "axios";
import instance from ".";

const graphqlEndpoint = "graphql"; // Replace with your actual GraphQL endpoint

export async function createOrder({
  customerEmail,
  customerName,
  customerPhone,
  customerAddress,
  orderItems,
  orderType = "PURCHASE",
  rentPeriodInDays,
}: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  orderType: string;
  rentPeriodInDays?: number;
  orderItems: { productId: string; quantity: number }[];
}) {
  const mutation = `
        mutation CreateOrder($input: CreateOrderInput!) {
            createOrder(createOrderInput: $input) {
                data {
                    id
                    totalPayableAmount
                    status
                    paymentId
                    orderType
                }
            }
        }
    `;

  const variables = {
    input: {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      orderItems,
      rentPeriodInDays: Number(rentPeriodInDays),
      orderType,
    },
  };

  try {
    const response = await instance.post(
      graphqlEndpoint,
      {
        query: mutation,
        variables: variables,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Replace with actual token if needed
        },
      }
    );

    console.log("Order Created:", response.data);
    return response.data.data.createOrder.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

export async function getOrder(id: string) {
  const query = `
   query Order {
    order(id: "${id}") {
        id
        customerEmail
        totalAmount
        status
        orderItems {
            productId
            quantity
            product {
                name
                price
            }
        }
        paymentId
        paymentStatus
    }
    }`;
  const response = await instance.post(graphqlEndpoint, {
    query: query,
  });
  console.log(response);
  return response.data.data.order;
}

export async function getMyOrders({
  limit,
  page,
}: {
  limit: number;
  page: number;
}) {
  const query = `
        query MyOrders($limit: Int!, $page: Int!) {
            myOrders(limit: $limit, page: $page) {
                pagination {
                    limit
                    page
                    total
                }
                data {
                    id
                    totalAmount
                    status
                   
                }
            }
        }
    `;

  const variables = {
    limit,
    page,
  };
  const response = await instance.post(
    graphqlEndpoint,
    {
      query: query,
      variables: variables,
    },
    {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer YOUR_ACCESS_TOKEN`, // Replace with actual token if needed
      },
    }
  );

  return response.data.data.myOrders;
}
