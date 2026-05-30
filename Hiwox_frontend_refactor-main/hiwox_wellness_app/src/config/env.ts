// src/config/env.ts

import Constants from "expo-constants";

const extra = Constants.expoConfig?.extra as Record<string, string | undefined> | undefined;

const readExtra = (key: string): string | undefined => {
  const value = extra?.[key];
  return typeof value === "string" ? value : undefined;
};

export const config = {
  API_BASE_URL: readExtra("apiBaseUrl") || "https://dev-api.hiwox.com/api",
  API_TIMEOUT: parseInt(readExtra("apiTimeout") || "30000", 10),
  LOG_LEVEL: (readExtra("logLevel") || "debug") as
    | "debug"
    | "info"
    | "warn"
    | "error",
  BUILD_ENV: (readExtra("buildEnv") || "development") as
    | "development"
    | "staging"
    | "production",
  ENABLE_OFFLINE_MODE: readExtra("enableOfflineMode") === "true",
  ENABLE_DEBUG_MODE: readExtra("enableDebugMode") === "true",
};
