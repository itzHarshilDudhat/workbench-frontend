import axios from "axios";
import store from "../store/Store";

const dataService = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer `,
  },
});

dataService.interceptors.request.use(function (config) {
  const { base } = store.getState();

  const token = base.token ? `Bearer ${base.token}` : null;

  config.headers.Authorization = token ? token : "";
  return config;
});

export default dataService;
