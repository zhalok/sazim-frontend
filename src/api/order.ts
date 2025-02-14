import axios from "axios";
import instance from ".";

const graphqlEndpoint = "graphql"; // Replace with your actual GraphQL endpoint

export async function createOrder({
  customerEmail,
  customerName,
  customerPhone,
  customerAddress,
  orderItems,
}: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
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
