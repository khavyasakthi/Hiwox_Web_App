import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

export default function ProgressScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Progress</Text>
      <Text style={styles.subtitle}>Track your fitness journey</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weekly Overview</Text>
        <Text style={styles.placeholder}>Log workouts to see your progress here.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>PPG Health Scan</Text>
        <Text style={styles.placeholder}>Use the PPG scanner to measure heart rate and SpO2.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111827" },
  content: { padding: 24, paddingTop: 60 },
  title: { fontSize: 28, fontWeight: "bold", color: "#FFFFFF", marginBottom: 4 },
  subtitle: { fontSize: 16, color: "#9CA3AF", marginBottom: 28 },
  card: {
    backgroundColor: "#1F2937",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#374151",
  },
  cardTitle: { fontSize: 18, fontWeight: "700", color: "#10B981", marginBottom: 12 },
  placeholder: { fontSize: 14, color: "#6B7280", fontStyle: "italic" },
});
