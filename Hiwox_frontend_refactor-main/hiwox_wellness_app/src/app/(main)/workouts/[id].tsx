import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { workoutEndpoints } from "@/services/api/endpoints/workout";
import { logger } from "@/config/logger";

interface WorkoutDetail {
  id: string;
  name: string;
  description?: string;
  createdAt?: string;
}

export default function WorkoutDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [workout, setWorkout] = useState<WorkoutDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      try {
        const result = await workoutEndpoints.get(id);
        const data = result as { data?: WorkoutDetail } | WorkoutDetail;
        const w = (data as { data?: WorkoutDetail }).data ?? (data as WorkoutDetail);
        if (w?.id) {
          setWorkout(w);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        logger.error("Failed to load workout", err);
        setNotFound(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  if (notFound || !workout) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>Workout not found.</Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>← Workouts</Text>
      </TouchableOpacity>

      <Text style={styles.title}>{workout.name}</Text>
      {workout.description ? <Text style={styles.desc}>{workout.description}</Text> : null}
      {workout.createdAt ? (
        <Text style={styles.meta}>Created: {new Date(workout.createdAt).toLocaleDateString()}</Text>
      ) : null}

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Exercises</Text>
        <Text style={styles.placeholder}>No exercises added yet.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111827" },
  content: { padding: 24, paddingTop: 60 },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#111827" },
  errorText: { fontSize: 16, color: "#EF4444", marginBottom: 12 },
  backLink: { color: "#10B981", fontSize: 15, fontWeight: "600" },
  backBtn: { marginBottom: 16 },
  backText: { color: "#10B981", fontSize: 16, fontWeight: "600" },
  title: { fontSize: 28, fontWeight: "bold", color: "#FFFFFF", marginBottom: 8 },
  desc: { fontSize: 15, color: "#9CA3AF", marginBottom: 8, lineHeight: 22 },
  meta: { fontSize: 12, color: "#6B7280", marginBottom: 24 },
  card: {
    backgroundColor: "#1F2937",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#374151",
  },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#10B981", marginBottom: 12 },
  placeholder: { fontSize: 14, color: "#6B7280", fontStyle: "italic" },
});
