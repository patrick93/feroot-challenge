import axios from "axios";
import config from "../config";
import authService from "./auth.service";

async function getUserInfo() {
  const response = await axios.get(`${config.apiUrl}/user`, {
    headers: {
      Authorization: `Bearer ${authService.getToken()}`,
    },
  });
  return response.data;
}

export default {
  getUserInfo,
};
