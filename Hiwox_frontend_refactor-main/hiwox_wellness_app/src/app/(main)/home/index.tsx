import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/store/slices/authStore";

export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {user?.name ?? "there"} 👋</Text>
        <Text style={styles.subtitle}>Ready for today's session?</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Quick Actions</Text>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push("/(main)/workouts")}
        >
          <Text style={styles.actionBtnText}>💪 View Workouts</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionBtn}
          onPress={() => router.push("/(main)/progress")}
        >
          <Text style={styles.actionBtnText}>📊 Track Progress</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Today's Summary</Text>
        <Text style={styles.placeholder}>No activity logged yet today.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111827" },
  content: { padding: 24, paddingTop: 60 },
  header: { marginBottom: 28 },
  greeting: { fontSize: 28, fontWeight: "bold", color: "#FFFFFF", marginBottom: 4 },
  subtitle: { fontSize: 16, color: "#9CA3AF" },
  card: {
    backgroundColor: "#1F2937",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#374151",
  },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#10B981", marginBottom: 16 },
  actionBtn: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#374151",
  },
  actionBtnText: { fontSize: 15, color: "#E5E7EB", fontWeight: "500" },
  placeholder: { fontSize: 14, color: "#6B7280", fontStyle: "italic" },
});
