import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import { Toast } from "@/components/ui/Toast/Toast";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/useToast";
import { STRINGS } from "@/utils/constants/strings";

type Role = "user" | "consultant";

export const RegisterForm: React.FC = () => {
  const router = useRouter();
  const { register, isLoading } = useAuth();
  const { toast, showToast, hideToast } = useToast();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<Role>("user");
  const [consent, setConsent] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      showToast(STRINGS.validation.fillAllFields, "error");
      return;
    }
    if (password !== confirmPassword) {
      showToast(STRINGS.validation.passwordsDoNotMatch, "error");
      return;
    }
    if (!consent || !privacyAccepted) {
      showToast(STRINGS.validation.acceptConsent, "error");
      return;
    }

    const success = await register({
      name,
      email,
      password,
      role,
      age: age ? parseInt(age, 10) : undefined,
      phone: phone || undefined,
      consent,
      privacyNoticeAccepted: privacyAccepted,
    });

    if (!success) {
      showToast("Registration failed. Please try again.", "error");
    }
  };

  const InfoModal = ({ visible, title, children, onClose }: {
    visible: boolean;
    title: string;
    children: React.ReactNode;
    onClose: () => void;
  }) => (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{title}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.modalContent}>{children}</ScrollView>
          <TouchableOpacity style={styles.modalBtn} onPress={onClose}>
            <Text style={styles.modalBtnText}>{STRINGS.common.close}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Toast visible={toast.visible} message={toast.message} isError={toast.isError} onHide={hideToast} />

      <InfoModal visible={showPrivacyModal} title="Privacy Policy" onClose={() => setShowPrivacyModal(false)}>
        <Text style={styles.modalText}>
          HiWox collects your personal data to provide personalised fitness guidance. All health data is encrypted and only shared with assigned consultants. You may request data deletion at any time via profile settings.
        </Text>
      </InfoModal>

      <InfoModal visible={showTermsModal} title="Terms of Service" onClose={() => setShowTermsModal(false)}>
        <Text style={styles.modalText}>
          By registering, you agree to use HiWox lawfully and acknowledge that fitness guidance is informational only and not a substitute for medical advice.
        </Text>
      </InfoModal>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>{STRINGS.auth.createAccountTitle}</Text>
          <Text style={styles.subtitle}>{STRINGS.auth.joinCommunity}</Text>
        </View>

        <View style={styles.formContainer}>
          <Input label={STRINGS.auth.fullName} placeholder={STRINGS.auth.fullNamePlaceholder} value={name} onChangeText={setName} editable={!isLoading} />
          <Input label={STRINGS.auth.age} placeholder={STRINGS.auth.agePlaceholder} value={age} onChangeText={setAge} keyboardType="numeric" editable={!isLoading} />
          <Input label={STRINGS.auth.phone} placeholder={STRINGS.auth.phonePlaceholder} value={phone} onChangeText={setPhone} keyboardType="phone-pad" editable={!isLoading} />
          <Input label={STRINGS.auth.email} placeholder="Enter your email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" editable={!isLoading} />
          <Input label={STRINGS.auth.password} placeholder="Create a secure password" value={password} onChangeText={setPassword} secureTextEntry secureToggle editable={!isLoading} />
          <Input label={STRINGS.auth.confirmPassword} placeholder={STRINGS.auth.confirmPasswordPlaceholder} value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry secureToggle editable={!isLoading} />

          {/* Role selection */}
          <Text style={styles.sectionLabel}>{STRINGS.auth.chooseRole}</Text>
          <View style={styles.roleRow}>
            {(["user", "consultant"] as Role[]).map((r) => (
              <TouchableOpacity
                key={r}
                style={[styles.roleCard, role === r && styles.roleCardActive]}
                onPress={() => setRole(r)}
                disabled={isLoading}
              >
                <Text style={[styles.roleTitle, role === r && styles.roleTitleActive]}>
                  {r === "user" ? "User" : "Consultant"}
                </Text>
                <Text style={[styles.roleSubtitle, role === r && styles.roleSubtitleActive]}>
                  {r === "user" ? "Looking for fitness guidance" : "Providing fitness expertise"}
                </Text>
                {role === r && <Text style={styles.check}>✓</Text>}
              </TouchableOpacity>
            ))}
          </View>

          {/* Consent */}
          <View style={styles.consentContainer}>
            <TouchableOpacity style={styles.checkboxRow} onPress={() => setConsent((v) => !v)} disabled={isLoading}>
              <View style={[styles.checkbox, consent && styles.checkboxChecked]}>
                {consent && <Text style={styles.checkboxMark}>✓</Text>}
              </View>
              <Text style={styles.consentText}>I consent to the collection and processing of my health data *</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.checkboxRow} onPress={() => setPrivacyAccepted((v) => !v)} disabled={isLoading}>
              <View style={[styles.checkbox, privacyAccepted && styles.checkboxChecked]}>
                {privacyAccepted && <Text style={styles.checkboxMark}>✓</Text>}
              </View>
              <Text style={styles.consentText}>
                I have read and accept the{" "}
                <Text style={styles.inlineLink} onPress={() => setShowPrivacyModal(true)}>Privacy Policy</Text>
                {" "}and{" "}
                <Text style={styles.inlineLink} onPress={() => setShowTermsModal(true)}>Terms of Service</Text> *
              </Text>
            </TouchableOpacity>
          </View>

          <Button
            title={isLoading ? "Creating Account..." : STRINGS.auth.createAccount}
            onPress={handleRegister}
            disabled={isLoading}
          />

          <TouchableOpacity style={styles.linkContainer} onPress={() => router.push("/(auth)/login" as never)}>
            <Text style={styles.linkText}>
              {STRINGS.auth.haveAccount} <Text style={styles.linkTextBold}>Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111827" },
  scrollContainer: { flexGrow: 1, padding: 24, paddingTop: 60, paddingBottom: 40 },
  headerContainer: { alignItems: "center", marginBottom: 32 },
  title: { fontSize: 32, fontWeight: "bold", color: "#10B981", marginBottom: 8 },
  subtitle: { fontSize: 16, color: "#D1D5DB", textAlign: "center" },
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
  sectionLabel: { fontSize: 14, fontWeight: "600", color: "#E5E7EB", marginBottom: 12 },
  roleRow: { flexDirection: "row", gap: 12, marginBottom: 20 },
  roleCard: {
    flex: 1,
    backgroundColor: "#111827",
    borderWidth: 2,
    borderColor: "#374151",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    position: "relative",
  },
  roleCardActive: { borderColor: "#10B981", backgroundColor: "#065F46" },
  roleTitle: { fontSize: 15, fontWeight: "bold", color: "#E5E7EB", marginBottom: 4 },
  roleTitleActive: { color: "#FFFFFF" },
  roleSubtitle: { fontSize: 12, color: "#9CA3AF", textAlign: "center", lineHeight: 16 },
  roleSubtitleActive: { color: "#D1FAE5" },
  check: { position: "absolute", top: 6, right: 8, color: "#10B981", fontWeight: "bold" },
  consentContainer: { marginBottom: 24, gap: 12 },
  checkboxRow: { flexDirection: "row", alignItems: "flex-start" },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#374151",
    borderRadius: 6,
    marginRight: 12,
    marginTop: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111827",
  },
  checkboxChecked: { backgroundColor: "#10B981", borderColor: "#10B981" },
  checkboxMark: { color: "#FFFFFF", fontSize: 14, fontWeight: "bold" },
  consentText: { flex: 1, fontSize: 14, color: "#D1D5DB", lineHeight: 20 },
  inlineLink: { color: "#10B981", fontWeight: "600" },
  linkContainer: { marginTop: 24, alignItems: "center" },
  linkText: { fontSize: 16, color: "#9CA3AF", textAlign: "center" },
  linkTextBold: { color: "#10B981", fontWeight: "bold" },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.85)", justifyContent: "center", padding: 24 },
  modalContainer: {
    backgroundColor: "rgba(31, 41, 55, 0.95)",
    borderRadius: 16,
    maxHeight: "80%",
    borderWidth: 1,
    borderColor: "#374151",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#374151",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", color: "#10B981" },
  modalClose: { fontSize: 24, color: "#9CA3AF" },
  modalContent: { padding: 20 },
  modalText: { fontSize: 14, color: "#D1D5DB", lineHeight: 22 },
  modalBtn: {
    backgroundColor: "#10B981",
    margin: 16,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  modalBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
});
