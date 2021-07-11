import jwt from "jsonwebtoken";

function save(token) {
  localStorage.setItem("token", token);
}

function getUserInfo() {
  const token = localStorage.getItem("token");

  return jwt.decode(token);
}

function isLoggedIn() {
  return !!localStorage.getItem("token");
}

function logout() {
  localStorage.removeItem("token");
}

export default {
  save,
  logout,
  isLoggedIn,
  getUserInfo,
};
