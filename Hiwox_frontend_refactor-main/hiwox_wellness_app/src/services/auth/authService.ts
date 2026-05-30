import { apiClient } from "@/services/api/client";
import { tokenManager } from "./tokenManager";
import { logger } from "@/config/logger";
import type { LoginResponse, RegisterRequest, RegisterResponse, User } from "@/types/auth";
import { AxiosError } from "axios";

const getNetworkErrorMessage = (error: unknown): string => {
  if (error instanceof AxiosError) {
    if (!error.response) {
      return "Unable to connect to server. Please check your internet connection.";
    }
    return error.response.data?.message ?? error.message ?? "Server error occurred";
  }
  return "An unexpected error occurred";
};

type AuthPayload = Partial<User> & {
  _id?: string;
  userId?: string;
  token?: string;
  accessToken?: string;
  refreshToken?: string;
  user?: AuthPayload;
  data?: AuthPayload;
  success?: boolean;
  message?: string;
};

const asAuthPayload = (value: unknown): AuthPayload =>
  value && typeof value === "object" ? (value as AuthPayload) : {};

const isUserRole = (value: unknown): value is User["role"] =>
  value === "user" || value === "consultant" || value === "admin" || value === "superadmin";

const normalizeUser = (payload: AuthPayload): User => {
  const user = asAuthPayload(payload.user ?? payload);
  const role = isUserRole(user.role) ? user.role : "user";

  return {
    id: user.id ?? user.userId ?? user._id ?? payload.userId ?? "",
    email: user.email ?? payload.email ?? "",
    name: user.name ?? payload.name ?? "",
    role,
    age: user.age ?? payload.age,
    phone: user.phone ?? payload.phone,
  };
};

const getAuthPayload = (body: AuthPayload): AuthPayload =>
  body.success && body.data ? asAuthPayload(body.data) : body;

export const authService = {
  async login(identifier: string, password: string): Promise<LoginResponse> {
    try {
      // Response interceptor unwraps axios response → body is { success, data, message }
      const body = asAuthPayload(await apiClient.post("/auth/login", { identifier, password }));
      const payload = getAuthPayload(body);
      const token = payload.accessToken ?? payload.token;

      if (body.success === true || token) {
        if (token) {
          await tokenManager.saveTokens(token, payload.refreshToken ?? "");
        }
        return { success: true, data: normalizeUser(payload) };
      }

      return { success: false, message: body.message ?? "Login failed" };
    } catch (error) {
      logger.error("Login error:", error);
      return { success: false, message: getNetworkErrorMessage(error) };
    }
  },

  async register(payload: RegisterRequest): Promise<RegisterResponse> {
    try {
      const body = asAuthPayload(await apiClient.post("/auth/register", payload));
      const responsePayload = getAuthPayload(body);
      const token = responsePayload.accessToken ?? responsePayload.token;

      if (body.success === true || token) {
        if (token) {
          await tokenManager.saveTokens(token, responsePayload.refreshToken ?? "");
        }
        return { success: true, data: normalizeUser(responsePayload) };
      }

      return { success: false, message: body.message ?? "Registration failed" };
    } catch (error) {
      logger.error("Register error:", error);
      return { success: false, message: getNetworkErrorMessage(error) };
    }
  },

  async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      logger.error("Logout error:", error);
    } finally {
      await tokenManager.clearTokens();
    }
  },

  async sendPasswordResetEmail(email: string): Promise<{ success: boolean; message?: string }> {
    try {
      const body = await apiClient.post("/auth/send-reset-email", { email });
      return { success: body.success, message: body.message };
    } catch (error) {
      logger.error("Send reset email error:", error);
      return { success: false, message: "Network error occurred" };
    }
  },

  async checkEmail(email: string): Promise<{ exists: boolean }> {
    try {
      const body = await apiClient.post("/auth/check-email", { email });
      return { exists: body.exists ?? false };
    } catch {
      return { exists: false };
    }
  },

  async verifyOTP(email: string, otp: string): Promise<{ success: boolean; message?: string }> {
    try {
      const body = await apiClient.post("/auth/verify-otp", { email, otp });
      return { success: body.success, message: body.message };
    } catch (error) {
      logger.error("Verify OTP error:", error);
      return { success: false, message: "Network error occurred" };
    }
  },

  async resetPassword(
    email: string,
    newPassword: string,
    confirmPassword: string,
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const body = await apiClient.post("/auth/reset-password", {
        email,
        newPassword,
        confirmPassword,
      });
      return { success: body.success, message: body.message };
    } catch (error) {
      logger.error("Reset password error:", error);
      return { success: false, message: "Network error occurred" };
    }
  },
};
