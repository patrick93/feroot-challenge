import axios from "axios";
import config from "../config";

const TOKEN_KEY = "token";

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
  const { token } = response.data;

  localStorage.setItem(TOKEN_KEY, token);
}

function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

function logout() {
  localStorage.removeItem(TOKEN_KEY);
}

export default {
  signUp,
  signIn,
  logout,
  getToken,
};
