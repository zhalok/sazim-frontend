import instance from ".";

export async function makePayment(paymentId: string) {
  const query = `mutation MakePayment {
    makePayment(createPaymentInput: { id: "${paymentId}" }) {
        ok
        error
        orderId
        paymentStatus
        orderStatus
    }
}`;

  const response = await instance.post("/graphql", {
    query,
  });
  return response.data.data.makePayment;
}
