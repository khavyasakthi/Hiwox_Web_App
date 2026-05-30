// src/config/env.ts

export const config = {
  API_BASE_URL: process.env.API_BASE_URL || "https://dev-api.hiwox.com/api",
  API_TIMEOUT: parseInt(process.env.API_TIMEOUT || "30000", 10),
  LOG_LEVEL: (process.env.LOG_LEVEL || "debug") as
    | "debug"
    | "info"
    | "warn"
    | "error",
  BUILD_ENV: (process.env.BUILD_ENV || "development") as
    | "development"
    | "staging"
    | "production",
  ENABLE_OFFLINE_MODE: process.env.ENABLE_OFFLINE_MODE === "true",
  ENABLE_DEBUG_MODE: process.env.ENABLE_DEBUG_MODE === "true",
};
