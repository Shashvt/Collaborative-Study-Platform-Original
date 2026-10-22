import axios from "axios";

export const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:8080";

// Global interceptor: automatically attaches Bearer token to all backend API calls
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  const isS3 =
    config.url &&
    (config.url.includes("amazonaws.com") || config.url.includes("s3."));
  if (token && !isS3 && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
