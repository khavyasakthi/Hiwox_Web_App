import { logger } from "@/config/logger";
import { secureStorage } from "@/services/storage/secureStorage";

const KEYS = {
  ACCESS: "accessToken",
  REFRESH: "refreshToken",
} as const;

export const tokenManager = {
  async saveTokens(accessToken: string, refreshToken: string): Promise<void> {
    try {
      await secureStorage.setItem(KEYS.ACCESS, accessToken);
      if (refreshToken) {
        await secureStorage.setItem(KEYS.REFRESH, refreshToken);
      }
    } catch (error) {
      logger.error("Error saving tokens:", error);
    }
  },

  async getAccessToken(): Promise<string | null> {
    try {
      return await secureStorage.getItem(KEYS.ACCESS);
    } catch (error) {
      logger.error("Error getting access token:", error);
      return null;
    }
  },

  async getRefreshToken(): Promise<string | null> {
    try {
      return await secureStorage.getItem(KEYS.REFRESH);
    } catch (error) {
      logger.error("Error getting refresh token:", error);
      return null;
    }
  },

  async clearTokens(): Promise<void> {
    try {
      await secureStorage.removeItem(KEYS.ACCESS);
      await secureStorage.removeItem(KEYS.REFRESH);
    } catch (error) {
      logger.error("Error clearing tokens:", error);
    }
  },

  async refreshAccessToken(): Promise<string | null> {
    try {
      const refreshToken = await this.getRefreshToken();
      if (!refreshToken) return null;

      // Import axios directly to avoid circular dependency with apiClient
      const axios = (await import("axios")).default;
      const { config } = await import("@/config/env");

      const response = await axios.post(
        `${config.API_BASE_URL}/auth/refresh`,
        { refreshToken },
        { headers: { "Content-Type": "application/json" } },
      );

      const body = response.data;
      if (body?.success && body?.data?.accessToken) {
        await this.saveTokens(body.data.accessToken, refreshToken);
        return body.data.accessToken;
      }

      return null;
    } catch (error) {
      logger.error("Error refreshing token:", error);
      return null;
    }
  },
};
