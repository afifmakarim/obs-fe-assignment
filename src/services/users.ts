import axios from "axios";
import { CONFIG } from "../config/config";

export const getUsers = async () => {
  const response = await axios.get(`${CONFIG.API_URL}/users`);
  return response.data;
};
