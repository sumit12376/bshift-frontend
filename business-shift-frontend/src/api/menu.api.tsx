
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_API;

export const getMenuByRestaurantId = async (id: string | string[]) => {
  const response = await axios.get(`${BASE_URL}/api/Menu/ListMenu/${id}`);
  return response.data?.data;
};
