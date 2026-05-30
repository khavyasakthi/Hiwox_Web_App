// src/config/logger.ts

import { config } from "./env";

const LOG_LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const getCurrentLevel = (): number => {
  return LOG_LEVELS[config.LOG_LEVEL] || LOG_LEVELS.info;
};

export const logger = {
  debug: (message: string, data?: any) => {
    if (getCurrentLevel() <= LOG_LEVELS.debug) {
      console.log(`[DEBUG] ${message}`, data);
    }
  },

  info: (message: string, data?: any) => {
    if (getCurrentLevel() <= LOG_LEVELS.info) {
      console.log(`[INFO] ${message}`, data);
    }
  },

  warn: (message: string, data?: any) => {
    if (getCurrentLevel() <= LOG_LEVELS.warn) {
      console.warn(`[WARN] ${message}`, data);
    }
  },

  error: (message: string, error?: any) => {
    if (getCurrentLevel() <= LOG_LEVELS.error) {
      console.error(`[ERROR] ${message}`, error);
    }
  },
};
