import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { workoutEndpoints } from "@/services/api/endpoints/workout";
import { logger } from "@/config/logger";

interface Workout {
  id: string;
  name: string;
  description?: string;
}

export default function WorkoutsScreen() {
  const router = useRouter();
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await workoutEndpoints.list();
        const data = result as { data?: Workout[] } | Workout[];
        setWorkouts(Array.isArray(data) ? data : (data as { data?: Workout[] }).data ?? []);
      } catch (err) {
        logger.error("Failed to load workouts", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetch();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Workouts</Text>
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => router.push("/(main)/workouts/create")}
        >
          <Text style={styles.addBtnText}>+ New</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#10B981" style={styles.loader} />
      ) : (
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <Text style={styles.empty}>No workouts yet. Create your first one!</Text>
          }
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              onPress={() => router.push(`/(main)/workouts/${item.id}` as never)}
            >
              <Text style={styles.cardTitle}>{item.name}</Text>
              {item.description ? (
                <Text style={styles.cardDesc}>{item.description}</Text>
              ) : null}
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111827" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 24,
    paddingTop: 60,
  },
  title: { fontSize: 28, fontWeight: "bold", color: "#FFFFFF" },
  addBtn: {
    backgroundColor: "#10B981",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  addBtnText: { color: "#FFFFFF", fontWeight: "700", fontSize: 14 },
  loader: { flex: 1 },
  list: { padding: 24, paddingTop: 8 },
  empty: { fontSize: 15, color: "#6B7280", textAlign: "center", marginTop: 40, fontStyle: "italic" },
  card: {
    backgroundColor: "#1F2937",
    borderRadius: 14,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#374151",
  },
  cardTitle: { fontSize: 16, fontWeight: "700", color: "#E5E7EB", marginBottom: 4 },
  cardDesc: { fontSize: 13, color: "#9CA3AF" },
});
