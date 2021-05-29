import axios from "axios";
const token = sessionStorage.getItem("token") || null;

const api = axios.create({
  baseURL: "https://barber-shop-api-2.herokuapp.com",
  headers: {
    "X-Access-Token": token,
  },
});

export default api;
