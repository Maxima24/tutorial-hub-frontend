import { useUserStore } from "@/store/auth-store";
import axios from "axios";
console.log("API Base URL:", process.env.NEXT_PUBLIC_API_URL);
const PUBLIC_ENDPOINTS = ["/auth/login", "/auth/signup"];

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = useUserStore.getState().token;

  const url = config.url ?? "";

  const isPublicEndpoint = PUBLIC_ENDPOINTS.some((endpoint) =>
    url.includes(endpoint)
  );

  // Attach token ONLY if not public
  if (!isPublicEndpoint && token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
