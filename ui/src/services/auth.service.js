import axios from "axios";
import config from "../config";

async function signUp({ name, email, password }) {
  const response = await axios.post(`${config.apiUrl}/auth/signup`, {
    name,
    email,
    password,
  });
  return response.data;
}

async function signIn({ email, password }) {
  const response = await axios.post(`${config.apiUrl}/auth/signin`, {
    email,
    password,
  });
  return response.data;
}

export default {
  signUp,
  signIn,
};
