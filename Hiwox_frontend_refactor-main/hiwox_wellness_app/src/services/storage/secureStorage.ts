import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import { logger } from "@/config/logger";

const KNOWN_KEYS = ["accessToken", "refreshToken", "userToken"] as const;
const STORAGE_PREFIX = "hiwox:";

const webStorage = {
  setItem(key: string, value: string): void {
    globalThis.localStorage?.setItem(`${STORAGE_PREFIX}${key}`, value);
  },
  getItem(key: string): string | null {
    return globalThis.localStorage?.getItem(`${STORAGE_PREFIX}${key}`) ?? null;
  },
  removeItem(key: string): void {
    globalThis.localStorage?.removeItem(`${STORAGE_PREFIX}${key}`);
  },
};

export const secureStorage = {
  async setItem(key: string, value: string): Promise<void> {
    try {
      if (Platform.OS === "web") {
        webStorage.setItem(key, value);
        return;
      }

      await SecureStore.setItemAsync(key, value);
    } catch (error) {
      logger.error(`Error setting secure item ${key}:`, error);
    }
  },

  async getItem(key: string): Promise<string | null> {
    try {
      if (Platform.OS === "web") {
        return webStorage.getItem(key);
      }

      return await SecureStore.getItemAsync(key);
    } catch (error) {
      logger.error(`Error getting secure item ${key}:`, error);
      return null;
    }
  },

  async removeItem(key: string): Promise<void> {
    try {
      if (Platform.OS === "web") {
        webStorage.removeItem(key);
        return;
      }

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
