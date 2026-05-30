import { logger } from "@/config/logger";

export interface AppError {
  code: string;
  message: string;
  statusCode?: number;
}

export const createAppError = (code: string, message: string, statusCode?: number): AppError => ({
  code,
  message,
  statusCode,
});

export const parseApiError = (error: unknown): string => {
  if (typeof error === "string") return error;

  if (error && typeof error === "object") {
    const e = error as Record<string, unknown>;

    // Axios error shape
    if (e.response && typeof e.response === "object") {
      const res = e.response as Record<string, unknown>;
      const data = res.data as Record<string, unknown> | undefined;
      if (data?.message && typeof data.message === "string") return data.message;
      if (data?.error && typeof data.error === "string") return data.error;

      const status = res.status;
      if (status === 401) return "Invalid credentials. Please try again.";
      if (status === 400) return "Bad request. Please check your input.";
      if (status === 404) return "Resource not found.";
      if (typeof status === "number" && status >= 500) return "Server error. Please try again later.";
    }

    // Network error
    if (e.request) return "Network error — please check your connection.";

    if (e.message && typeof e.message === "string") return e.message;
  }

  return "An unexpected error occurred.";
};

export const handleError = (error: unknown, context?: string): void => {
  const message = parseApiError(error);
  logger.error(context ? `[${context}] ${message}` : message, error);
};
