import axios from "axios";

export const $axios = axios.create({
  baseURL: "http://localhost:8001",
  timeout: 10000,
});
