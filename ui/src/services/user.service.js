import axios from "axios";
import config from "../config";
import sessionService from "./session.service";

async function getUserInfo() {
  const response = await axios.get(`${config.apiUrl}/user`, {
    headers: {
      "Authorization": `Bearer ${sessionService.getToken()}`
    }
  });
  return response.data;
}

export default {
  getUserInfo
};
