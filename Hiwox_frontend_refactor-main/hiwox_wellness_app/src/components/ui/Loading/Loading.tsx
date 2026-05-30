import React from "react";
import { View, ActivityIndicator, Text, StyleSheet } from "react-native";

interface LoadingProps {
  message?: string;
  size?: "small" | "large";
  color?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  message,
  size = "large",
  color = "#10B981",
}) => (
  <View style={styles.container}>
    <ActivityIndicator size={size} color={color} />
    {message ? <Text style={styles.message}>{message}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111827",
  },
  message: {
    marginTop: 12,
    fontSize: 16,
    color: "#9CA3AF",
    fontWeight: "500",
  },
});
