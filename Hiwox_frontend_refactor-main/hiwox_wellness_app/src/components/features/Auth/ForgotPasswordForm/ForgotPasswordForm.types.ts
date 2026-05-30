export type ForgotPasswordStep = "email" | "otp" | "newPassword" | "done";

export interface ForgotPasswordFormProps {
  onSuccess?: () => void;
}
