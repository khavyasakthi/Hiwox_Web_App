import { apiClient } from "@/services/api/client";
import type { LoginRequest, RegisterRequest } from "@/types/auth";

export const authEndpoints = {
  login: (payload: LoginRequest) =>
    apiClient.post("/auth/login", payload),

  register: (payload: RegisterRequest) =>
    apiClient.post("/auth/register", payload),

  logout: () =>
    apiClient.post("/auth/logout"),

  checkEmail: (email: string) =>
    apiClient.post("/auth/check-email", { email }),

  sendResetEmail: (email: string) =>
    apiClient.post("/auth/send-reset-email", { email }),

  verifyOtp: (email: string, otp: string) =>
    apiClient.post("/auth/verify-otp", { email, otp }),

  resetPassword: (email: string, newPassword: string, confirmPassword: string) =>
    apiClient.post("/auth/reset-password", { email, newPassword, confirmPassword }),

  refreshToken: (refreshToken: string) =>
    apiClient.post("/auth/refresh", { refreshToken }),
};
