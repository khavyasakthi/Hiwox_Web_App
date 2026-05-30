import type { AxiosInstance } from "axios";
import { tokenManager } from "@/services/auth/tokenManager";
import { logger } from "@/config/logger";

export const setupInterceptors = (client: AxiosInstance): void => {
  client.interceptors.request.use(
    async (config) => {
      const token = await tokenManager.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      logger.error("Request interceptor error", error);
      return Promise.reject(error);
    },
  );

  client.interceptors.response.use(
    (response) => response.data,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const newToken = await tokenManager.refreshAccessToken();
          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return client(originalRequest);
          }
        } catch (refreshError) {
          logger.error("Token refresh failed", refreshError);
          await tokenManager.clearTokens();
        }
      }

      logger.error("Response interceptor error", error);
      return Promise.reject(error);
    },
  );
};
