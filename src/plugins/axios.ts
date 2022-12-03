import axios from "axios";

export function axiosPlugin( app ) {
  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });
  app.provide("axios", axiosInstance);
}
