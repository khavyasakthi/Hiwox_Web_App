import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import { Toast } from "@/components/ui/Toast/Toast";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { STRINGS } from "@/utils/constants/strings";

export const LoginForm: React.FC = () => {
  const router = useRouter();
  const { login, isLoading } = useAuth();
  const { toast, showToast, hideToast } = useToast();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const getKeyboardType = () => {
    if (/^\d+$/.test(identifier)) return "phone-pad";
    if (identifier.includes("@")) return "email-address";
    return "default";
  };

  const handleLogin = async () => {
    if (!identifier.trim() || !password) {
      showToast(STRINGS.validation.identifierRequired, "error");
      return;
    }

    const success = await login(identifier.trim(), password);
    if (!success) {
      showToast("Invalid email or password.", "error");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {/* Background blobs */}
      <View style={styles.gradientBackground}>
        <View style={[styles.blob, styles.blob1]} />
        <View style={[styles.blob, styles.blob2]} />
        <View style={[styles.blob, styles.blob3]} />
      </View>

      <Toast
        visible={toast.visible}
        message={toast.message}
        isError={toast.isError}
        onHide={hideToast}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Brand */}
        <View style={styles.brandContainer}>
          <View style={styles.logoContainer}>
            <Text style={styles.heartIcon}>♡</Text>
          </View>
          <Text style={styles.brandName}>{STRINGS.brand.name}</Text>
          <Text style={styles.brandTagline}>{STRINGS.brand.tagline}</Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <Text style={styles.title}>{STRINGS.auth.welcomeBack}</Text>
          <Text style={styles.subtitle}>{STRINGS.auth.signInSubtitle}</Text>

          <Input
            label={STRINGS.auth.emailOrPhone}
            placeholder={STRINGS.auth.emailPlaceholder}
            value={identifier}
            onChangeText={setIdentifier}
            keyboardType={getKeyboardType()}
            autoCapitalize="none"
            editable={!isLoading}
          />

          <Input
            label={STRINGS.auth.password}
            placeholder={STRINGS.auth.passwordPlaceholder}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            secureToggle
            editable={!isLoading}
          />

          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={() => router.push("/(auth)/forgot-password" as never)}
          >
            <Text style={styles.forgotPasswordText}>{STRINGS.auth.forgotPassword}</Text>
          </TouchableOpacity>

          <Button
            title={isLoading ? STRINGS.auth.signingIn : STRINGS.auth.signIn}
            onPress={handleLogin}
            disabled={isLoading}
          />

          <TouchableOpacity
            style={styles.linkContainer}
            onPress={() => router.push("/(auth)/register" as never)}
          >
            <Text style={styles.linkText}>
              {STRINGS.auth.noAccount}{" "}
              <Text style={styles.linkTextBold}>{STRINGS.auth.createAccount}</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerText}>{STRINGS.brand.footerTagline}</Text>
        <View style={{ height: 60 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111827", overflow: "hidden" },
  gradientBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#111827",
  },
  blob: { position: "absolute", borderRadius: 9999, opacity: 0.1 },
  blob1: { width: 300, height: 300, backgroundColor: "#10B981", top: -100, right: -100 },
  blob2: { width: 250, height: 250, backgroundColor: "#059669", bottom: -50, left: -80 },
  blob3: { width: 200, height: 200, backgroundColor: "#34D399", top: "40%", left: -50 },
  scrollContent: { flexGrow: 1, padding: 24, paddingTop: 80, paddingBottom: 40, zIndex: 2 },
  brandContainer: { alignItems: "center", marginBottom: 32 },
  logoContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#10B981",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  heartIcon: { fontSize: 36, color: "#FFFFFF" },
  brandName: { fontSize: 32, fontWeight: "bold", color: "#FFFFFF", marginBottom: 4 },
  brandTagline: { fontSize: 16, color: "#9CA3AF" },
  formContainer: {
    backgroundColor: "rgba(31, 41, 55, 0.8)",
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
  title: { fontSize: 24, fontWeight: "600", color: "#FFFFFF", marginBottom: 4 },
  subtitle: { fontSize: 15, color: "#9CA3AF", marginBottom: 24 },
  forgotPasswordContainer: { alignItems: "flex-end", marginBottom: 24, marginTop: -12 },
  forgotPasswordText: { color: "#10B981", fontSize: 14, fontWeight: "600" },
  linkContainer: { marginTop: 24, alignItems: "center" },
  linkText: { fontSize: 16, color: "#9CA3AF", textAlign: "center" },
  linkTextBold: { color: "#10B981", fontWeight: "bold" },
  footerText: { fontSize: 14, color: "#9CA3AF", fontStyle: "italic", textAlign: "center", marginTop: 32 },
});
