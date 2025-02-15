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
  customerToken,
}: {
  limit: number;
  page: number;
  customerToken: string;
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
        Authorization: `Bearer ${customerToken}`, // Replace with actual token if needed
      },
    }
  );

  return response.data.data.myOrders;
}

export async function getAllOrders({
  limit,
  page,
}: {
  limit: number;
  page: number;
}) {
  const query = `
        query Orders($limit: Int!, $page: Int!) {
            orders(limit: $limit, page: $page) {
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
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with actual token if needed
      },
    }
  );

  return response.data.data.orders;
}

export async function cancelOrder({
  id,
  email,
  reason,
  customerToken,
}: {
  id: string;
  email: string;
  reason: string;
  customerToken: string;
}) {
  const mutation = `
  mutation CancelOrder($id: String!, $reason: String!) {
      cancelOrder(id: $id, reason: $reason) {
          id
          status
      }
  }
`;

  const variables = {
    id,
    email,
    reason,
  };

  const response = await instance.post(
    graphqlEndpoint,
    {
      query: mutation,
      variables: variables,
    },
    {
      headers: {
        Authorization: `Bearer ${customerToken}`,
      },
    }
  );
  if ("errors" in response.data) {
    if (response.data.errors.length === 0)
      throw new Error("Something went wrong");
    throw new Error(response.data.errors[0].message);
  }

  return response.data.data.cancelOrder;
}

export async function completeOrder(id: string) {
  const mutation = `
  mutation CompleteOrder($id: String!) {
      completeOrder(id: $id) {
          id
          status
      }
  }
`;

  const variables = {
    id,
  };

  const response = await instance.post(
    graphqlEndpoint,
    {
      query: mutation,
      variables: variables,
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  if ("errors" in response.data) {
    if (response.data.errors.length === 0)
      throw new Error("Something went wrong");
    throw new Error(response.data.errors[0].message);
  }

  return response.data.data.completeOrder;
}

export async function deleteOrder(orderId: string) {
  const mutation = `
        mutation DeleteOrder($id: String!) {
            deleteOrder(id: $id)
        }
    `;
  const variables = {
    id: orderId,
  };

  const response = await instance.post(
    graphqlEndpoint,
    {
      query: mutation,
      variables: variables,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Replace with actual token if needed
      },
    }
  );

  if ("errors" in response.data) {
    if (response.data.errors.length === 0)
      throw new Error("Something went wrong");
    throw new Error(response.data.errors[0].message);
  }

  return response.data.data.deleteOrder;
}

export async function createToken(email: string) {
  const mutation = `
      mutation CreateToken($email: String!) {
          createToken(email: $email)
      }
  `;

  const variables = {
    email,
  };

  try {
    const response = await instance.post(graphqlEndpoint, {
      query: mutation,
      variables: variables,
    });

    console.log("Token Created:", response.data);
  } catch (error) {
    console.error(
      "Error creating token:",
      //@ts-ignore
      error.response ? error.response.data : error.message
    );
  }
}
