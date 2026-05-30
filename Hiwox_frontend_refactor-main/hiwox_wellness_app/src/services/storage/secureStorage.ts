import * as SecureStore from "expo-secure-store";
import { logger } from "@/config/logger";

const KNOWN_KEYS = ["accessToken", "refreshToken", "userToken"] as const;

export const secureStorage = {
  async setItem(key: string, value: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      logger.error(`Error setting secure item ${key}:`, error);
    }
  },

  async getItem(key: string): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (error) {
      logger.error(`Error getting secure item ${key}:`, error);
      return null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      logger.error(`Error removing secure item ${key}:`, error);
    }
  },

  async clear(): Promise<void> {
    try {
      for (const key of KNOWN_KEYS) {
        await this.removeItem(key);
      }
    } catch (error) {
      logger.error("Error clearing secure storage:", error);
    }
  },
};
