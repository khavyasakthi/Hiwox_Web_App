export type UserRole = "user" | "consultant" | "admin" | "superadmin";

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  age?: number;
  phone?: string;
  createdAt?: string;
}

export interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  notifications: boolean;
}
