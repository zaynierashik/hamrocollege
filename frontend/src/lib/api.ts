import axios, { AxiosInstance } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

const client: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const AUTH_PATHS = [
  "users/login/",
  "users/login/college-admin/",
  "users/register/",
  "users/register/college-admin/",
  "users/token/",
  "users/token/refresh/",
];

// Add token to requests if available
client.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const requestPath = `${config.url || ""}`;
    const isAuthRequest = AUTH_PATHS.some((path) => requestPath.includes(path));

    if (isAuthRequest) {
      return config;
    }

    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export default client;
