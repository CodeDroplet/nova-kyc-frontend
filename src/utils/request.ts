import axios from "axios";
import ApiValidationError from "./ApiValidationError";
import { useAuthStore } from "@/stores/authStore";

const request = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

request.interceptors.request.use((config) => {
  const userStore = useAuthStore();

  if (userStore.token) {
    config.headers.Authorization = `Bearer ${userStore.token}`;
  }

  return config;
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    const { data } = error.response || {};
    if (data?.status === "error") {
      switch (data.type) {
        case "api_error":
          throw new Error(data.message);
        case "validation_error":
          throw new ApiValidationError(data.message, data.errors);
      }
    }

    return Promise.reject(error);
  }
);

export default request;
