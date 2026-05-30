export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "consultant" | "admin" | "superadmin";
  age?: number;
  phone?: string;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: "user" | "consultant";
  age?: number;
  phone?: string;
  consent: boolean;
  privacyNoticeAccepted: boolean;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  data?: User;
}

export interface RegisterResponse {
  success: boolean;
  message?: string;
  data?: User;
}

export interface AuthApiPayload {
  accessToken: string;
  refreshToken: string;
  user: User;
}
