module.exports = ({ config }) => ({
  ...config,
  extra: {
    ...config.extra,
    apiBaseUrl:
      process.env.EXPO_PUBLIC_API_BASE_URL ||
      process.env.API_BASE_URL ||
      config.extra?.apiBaseUrl ||
      "https://hiwox.dedyn.io/api",
    apiTimeout: process.env.API_TIMEOUT || config.extra?.apiTimeout || "30000",
    logLevel: process.env.LOG_LEVEL || config.extra?.logLevel || "debug",
    buildEnv: process.env.BUILD_ENV || config.extra?.buildEnv || "development",
    enableOfflineMode:
      process.env.ENABLE_OFFLINE_MODE || config.extra?.enableOfflineMode || "false",
    enableDebugMode:
      process.env.ENABLE_DEBUG_MODE || config.extra?.enableDebugMode || "false",
  },
});
