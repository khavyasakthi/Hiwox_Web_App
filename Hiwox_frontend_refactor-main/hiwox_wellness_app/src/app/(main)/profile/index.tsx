import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/slices/authStore";

export default function ProfileScreen() {
  const { logout } = useAuth();
  const { user } = useAuthStore();

  const handleLogout = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive", onPress: logout },
    ]);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Profile</Text>

      <View style={styles.avatarContainer}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.name?.charAt(0).toUpperCase() ?? "?"}
          </Text>
        </View>
        <Text style={styles.name}>{user?.name ?? "—"}</Text>
        <Text style={styles.email}>{user?.email ?? "—"}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>{user?.role ?? "user"}</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Account Details</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user?.email ?? "—"}</Text>
        </View>
        {user?.phone ? (
          <View style={styles.row}>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{user.phone}</Text>
          </View>
        ) : null}
        {user?.age ? (
          <View style={styles.row}>
            <Text style={styles.label}>Age</Text>
            <Text style={styles.value}>{user.age}</Text>
          </View>
        ) : null}
      </View>

      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sign Out</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111827" },
  content: { padding: 24, paddingTop: 60, paddingBottom: 40 },
  title: { fontSize: 28, fontWeight: "bold", color: "#FFFFFF", marginBottom: 24 },
  avatarContainer: { alignItems: "center", marginBottom: 28 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  avatarText: { fontSize: 32, fontWeight: "bold", color: "#FFFFFF" },
  name: { fontSize: 22, fontWeight: "700", color: "#FFFFFF", marginBottom: 4 },
  email: { fontSize: 14, color: "#9CA3AF", marginBottom: 10 },
  roleBadge: {
    backgroundColor: "#065F46",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  roleText: { fontSize: 12, fontWeight: "600", color: "#10B981", textTransform: "capitalize" },
  card: {
    backgroundColor: "#1F2937",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#374151",
  },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#10B981", marginBottom: 16 },
  row: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: "#374151" },
  label: { fontSize: 14, color: "#9CA3AF" },
  value: { fontSize: 14, color: "#E5E7EB", fontWeight: "500" },
  logoutBtn: {
    backgroundColor: "#991B1B",
    borderRadius: 14,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  logoutText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
