import axios from "axios";
import { configure } from "axios-hooks";
import LRU from "lru-cache";
const token = sessionStorage.getItem("token") || null;

const api = axios.create({
  baseURL: "https://barber-shop-api-2.herokuapp.com",
  headers: {
    "X-Access-Token": token,
  },
});

const cache = new LRU({ max: 10 });
configure({ api, cache });

export default api;
