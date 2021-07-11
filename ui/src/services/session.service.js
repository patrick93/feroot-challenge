function save(token) {
  localStorage.setItem("token", token);
}

function getToken() {
  return localStorage.getItem("token");
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
  getToken,
};
