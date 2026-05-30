import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Input } from "@/components/ui/Input/Input";
import { Button } from "@/components/ui/Button/Button";
import { workoutEndpoints } from "@/services/api/endpoints/workout";

export default function CreateWorkoutScreen() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!name.trim()) {
      Alert.alert("Validation", "Please enter a workout name.");
      return;
    }
    setIsLoading(true);
    try {
      await workoutEndpoints.create({ name: name.trim(), description: description.trim() });
      router.back();
    } catch {
      Alert.alert("Error", "Failed to create workout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backText}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>New Workout</Text>

      <View style={styles.form}>
        <Input
          label="Workout Name"
          placeholder="e.g. Morning HIIT"
          value={name}
          onChangeText={setName}
          editable={!isLoading}
        />
        <Input
          label="Description (optional)"
          placeholder="Describe your workout..."
          value={description}
          onChangeText={setDescription}
          editable={!isLoading}
        />
        <Button
          title={isLoading ? "Creating..." : "Create Workout"}
          onPress={handleCreate}
          disabled={isLoading}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111827" },
  content: { padding: 24, paddingTop: 60 },
  backBtn: { marginBottom: 16 },
  backText: { color: "#10B981", fontSize: 16, fontWeight: "600" },
  title: { fontSize: 28, fontWeight: "bold", color: "#FFFFFF", marginBottom: 28 },
  form: {
    backgroundColor: "#1F2937",
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#374151",
  },
});
