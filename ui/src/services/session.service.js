import jwt from "jsonwebtoken";

function save(token) {
  localStorage.setItem("token", token);
}

function getUserInfo() {
  const token = localStorage.getItem("token");

  return jwt.decode(token);
}

export default {
  save,
  getUserInfo,
};