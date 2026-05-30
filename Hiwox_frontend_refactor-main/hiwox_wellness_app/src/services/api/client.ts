// src/services/api/client.ts

import axios, { AxiosInstance } from "axios";
import { tokenManager } from "@/services/auth/tokenManager";
import { config } from "@/config/env";

export const apiClient: AxiosInstance = axios.create({
  baseURL: config.API_BASE_URL,
  timeout: config.API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  async (axiosConfig) => {
    const token = await tokenManager.getAccessToken();
    if (token) {
      axiosConfig.headers.Authorization = `Bearer ${token}`;
    }
    return axiosConfig;
  },
  (error) => Promise.reject(error),
);

// Response interceptor
apiClient.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired, try to refresh
      const newToken = await tokenManager.refreshAccessToken();
      if (newToken) {
        // Retry request with new token
        error.config.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(error.config);
      } else {
        // Refresh failed, logout user
        await tokenManager.clearTokens();
      }
    }
    return Promise.reject(error);
  },
);
