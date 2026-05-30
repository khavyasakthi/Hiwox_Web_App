import React from "react";
import { View, Text, StyleSheet } from "react-native";

export const LoginIllustration: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.icon}>♡</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: 80,
    height: 80,
    backgroundColor: "#10B981",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: { fontSize: 36, color: "#FFFFFF" },
});
