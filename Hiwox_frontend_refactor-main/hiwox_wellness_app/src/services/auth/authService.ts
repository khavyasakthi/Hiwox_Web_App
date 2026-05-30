import { apiClient } from "@/services/api/client";
import { tokenManager } from "./tokenManager";
import { logger } from "@/config/logger";
import type { LoginResponse, RegisterRequest, RegisterResponse } from "@/types/auth";

export const authService = {
  async login(identifier: string, password: string): Promise<LoginResponse> {
    try {
      // Response interceptor unwraps axios response → body is { success, data, message }
      const body = await apiClient.post("/auth/login", { identifier, password });

      if (body.success && body.data) {
        await tokenManager.saveTokens(body.data.accessToken, body.data.refreshToken);
        return { success: true, data: body.data.user };
      }

      return { success: false, message: body.message };
    } catch (error) {
      logger.error("Login error:", error);
      return { success: false, message: "Network error occurred" };
    }
  },

  async register(payload: RegisterRequest): Promise<RegisterResponse> {
    try {
      const body = await apiClient.post("/auth/register", payload);

      if (body.success && body.data) {
        if (body.data.token) {
          await tokenManager.saveTokens(body.data.token, "");
        }
        return { success: true, data: body.data };
      }

      return { success: false, message: body.message };
    } catch (error) {
      logger.error("Register error:", error);
      return { success: false, message: "Network error occurred" };
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
