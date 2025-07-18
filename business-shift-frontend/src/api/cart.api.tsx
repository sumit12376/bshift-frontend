
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export const addcart = async (cartData: {
  userId: number;
  items: { menuItemId: number; quantity: number; price: number }[];
}) => {
  const response = await axios.post(`${BASE_URL}/api/cart/createcart`, cartData, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
