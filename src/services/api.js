import axios from "axios";
import { getToken } from "../components/Utils/Common";

const api = axios.create({
  baseURL: "https://barber-shop-api-2.herokuapp.com/",  
  headers: {
    "X-Access-Token": getToken(),
  },
});

export default api;
