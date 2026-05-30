import { parseApiError } from "./errorHandler";

interface AsyncResult<T> {
  data: T | null;
  error: string | null;
}

export const asyncHandler = async <T>(
  fn: () => Promise<T>,
): Promise<AsyncResult<T>> => {
  try {
    const data = await fn();
    return { data, error: null };
  } catch (err) {
    return { data: null, error: parseApiError(err) };
  }
};

export const withRetry = async <T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 1000,
): Promise<T> => {
  let lastError: unknown;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (i < retries - 1) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }
  throw lastError;
};
