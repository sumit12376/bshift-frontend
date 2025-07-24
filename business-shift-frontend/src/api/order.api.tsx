import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export const getOrder = async (id: string) => {
  const response = await axios.get(`${BASE_URL}/api/order/getOrder/${id}`);
  return response?.data?.data;
};


export const createOrder = async (orderData) => {
  console.log("orderdata", orderData)
  const response = await axios.post(`${BASE_URL}/api/order/placeorder`, orderData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

