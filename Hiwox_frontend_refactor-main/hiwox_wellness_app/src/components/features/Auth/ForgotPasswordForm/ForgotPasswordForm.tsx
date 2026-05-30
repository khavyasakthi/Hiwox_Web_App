import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import { Toast } from "@/components/ui/Toast/Toast";
import { authService } from "@/services/auth/authService";
import { useToast } from "@/hooks/useToast";
import { STRINGS } from "@/utils/constants/strings";

type Step = "email" | "otp" | "newPassword" | "done";

export const ForgotPasswordForm: React.FC = () => {
  const router = useRouter();
  const { toast, showToast, hideToast } = useToast();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSendEmail = async () => {
    if (!email.trim()) {
      showToast(STRINGS.validation.emailRequired, "error");
      return;
    }
    if (!validateEmail(email)) {
      showToast(STRINGS.validation.emailInvalid, "error");
      return;
    }

    setIsLoading(true);
    const check = await authService.checkEmail(email.toLowerCase().trim());
    if (!check.exists) {
      setIsLoading(false);
      showToast(STRINGS.validation.emailNotRegistered, "error");
      return;
    }

    const result = await authService.sendPasswordResetEmail(email.toLowerCase().trim());
    setIsLoading(false);

    if (result.success) {
      showToast("A 6-digit OTP has been sent to your email.", "success");
      setStep("otp");
    } else {
      showToast(result.message ?? "Failed to send reset email.", "error");
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp.trim() || otp.length !== 6) {
      showToast(STRINGS.validation.otpInvalid, "error");
      return;
    }

    setIsLoading(true);
    const result = await authService.verifyOTP(email.toLowerCase().trim(), otp.trim());
    setIsLoading(false);

    if (result.success) {
      showToast("OTP verified successfully!", "success");
      setStep("newPassword");
    } else {
      showToast(result.message ?? "Invalid OTP.", "error");
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    const result = await authService.sendPasswordResetEmail(email.toLowerCase().trim());
    setIsLoading(false);
    showToast(result.success ? "OTP resent!" : "Failed to resend OTP.", result.success ? "success" : "error");
    if (result.success) setOtp("");
  };

  const handleResetPassword = async () => {
    if (!newPassword.trim() || !confirmPassword.trim()) {
      showToast("Please enter both password fields", "error");
      return;
    }
    if (newPassword.length < 6) {
      showToast(STRINGS.validation.passwordMinLength, "error");
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast(STRINGS.validation.passwordsDoNotMatch, "error");
      return;
    }

    setIsLoading(true);
    const result = await authService.resetPassword(
      email.toLowerCase().trim(),
      newPassword.trim(),
      confirmPassword.trim(),
    );
    setIsLoading(false);

    if (result.success) {
      showToast("Password reset successfully! Redirecting to login...", "success");
      setStep("done");
      setTimeout(() => router.replace("/(auth)/login" as never), 2000);
    } else {
      showToast(result.message ?? "Failed to reset password.", "error");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Toast visible={toast.visible} message={toast.message} isError={toast.isError} onHide={hideToast} />

      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>{STRINGS.auth.resetPassword}</Text>
        <Text style={styles.subtitle}>
          {step === "email"
            ? "Enter your email to receive reset instructions"
            : step === "otp"
            ? "Check your email for the OTP"
            : step === "newPassword"
            ? "Create a strong new password"
            : "Password reset complete"}
        </Text>

        <View style={styles.formContainer}>
          {step === "email" && (
            <>
              <Input
                label={STRINGS.auth.emailAddress}
                placeholder="Enter your registered email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!isLoading}
              />
              <Button
                title={isLoading ? STRINGS.auth.sending : STRINGS.auth.sendResetEmail}
                onPress={handleSendEmail}
                disabled={isLoading}
              />
            </>
          )}

          {step === "otp" && (
            <>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>OTP Sent!</Text>
                <Text style={styles.infoText}>We sent a 6-digit OTP to:</Text>
                <Text style={styles.emailDisplay}>{email}</Text>
              </View>
              <Input
                label={STRINGS.auth.enterOtp}
                placeholder={STRINGS.auth.otpPlaceholder}
                value={otp}
                onChangeText={setOtp}
                keyboardType="number-pad"
                maxLength={6}
                editable={!isLoading}
              />
              <Button
                title={isLoading ? STRINGS.auth.verifying : STRINGS.auth.verifyOtp}
                onPress={handleVerifyOtp}
                disabled={isLoading}
              />
              <TouchableOpacity style={styles.linkContainer} onPress={handleResendOtp} disabled={isLoading}>
                <Text style={styles.linkText}>{STRINGS.auth.resendOtp}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.linkContainer}
                onPress={() => { setStep("email"); setOtp(""); }}
              >
                <Text style={styles.mutedText}>Use Different Email</Text>
              </TouchableOpacity>
            </>
          )}

          {step === "newPassword" && (
            <>
              <Input
                label={STRINGS.auth.newPassword}
                placeholder={STRINGS.auth.newPasswordPlaceholder}
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
                secureToggle
                editable={!isLoading}
              />
              <Input
                label={STRINGS.auth.confirmPassword}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                secureToggle
                editable={!isLoading}
              />
              <Button
                title={isLoading ? STRINGS.auth.resetting : "Reset Password"}
                onPress={handleResetPassword}
                disabled={isLoading}
              />
            </>
          )}

          {step === "done" && (
            <View style={styles.infoBox}>
              <Text style={styles.successIcon}>✅</Text>
              <Text style={styles.infoTitle}>{STRINGS.auth.resetSuccess}</Text>
              <Text style={styles.infoText}>Redirecting to login...</Text>
            </View>
          )}

          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Text style={styles.backText}>{STRINGS.auth.backToSignIn}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111827" },
  content: { flexGrow: 1, justifyContent: "center", padding: 24 },
  title: { fontSize: 32, fontWeight: "bold", color: "#10B981", textAlign: "center", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#D1D5DB", textAlign: "center", marginBottom: 32, lineHeight: 24 },
  formContainer: {
    backgroundColor: "#1F2937",
    borderRadius: 16,
    padding: 24,
    borderWidth: 1,
    borderColor: "#374151",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  infoBox: { alignItems: "center", marginBottom: 24 },
  infoTitle: { fontSize: 20, fontWeight: "bold", color: "#10B981", marginBottom: 8 },
  infoText: { fontSize: 15, color: "#D1D5DB", textAlign: "center" },
  emailDisplay: { fontSize: 15, fontWeight: "bold", color: "#10B981", marginTop: 4 },
  successIcon: { fontSize: 48, marginBottom: 12 },
  linkContainer: { alignItems: "center", paddingVertical: 12 },
  linkText: { color: "#10B981", fontSize: 15, fontWeight: "600" },
  mutedText: { color: "#9CA3AF", fontSize: 14, textDecorationLine: "underline" },
  backBtn: { alignItems: "center", paddingVertical: 12, marginTop: 8 },
  backText: { fontSize: 16, color: "#10B981", fontWeight: "600" },
});
