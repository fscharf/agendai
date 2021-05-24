import axios from "axios";

const api = axios.create({
  baseURL: "https://barber-shop-api-2.herokuapp.com/",
});

export default api;
