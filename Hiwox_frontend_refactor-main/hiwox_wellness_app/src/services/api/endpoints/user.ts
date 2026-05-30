import { apiClient } from "@/services/api/client";

interface UpdateProfilePayload {
  name?: string;
  age?: number;
  phone?: string;
  weight?: number;
  height?: number;
}

interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
}

export const userEndpoints = {
  getProfile: () =>
    apiClient.get("/user/profile"),

  updateProfile: (payload: UpdateProfilePayload) =>
    apiClient.put("/user/profile", payload),

  changePassword: (payload: ChangePasswordPayload) =>
    apiClient.put("/user/change-password", payload),

  getPreferences: () =>
    apiClient.get("/user/preferences"),

  updatePreferences: (payload: Record<string, unknown>) =>
    apiClient.put("/user/preferences", payload),
};
