// api/show.cart.ts
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export const showcart = async (userId: string ) => {
  const response = await axios.post(
    `${BASE_URL}/api/cart/getCart`,
    { id: Number(userId) }, // Send as object
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  

  return response.data?.data?.carts?.[0] || null;
};