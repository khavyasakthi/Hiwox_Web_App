import React from "react";
import { View, Text, StyleSheet, type ViewStyle } from "react-native";

interface FloatingIconProps {
  icon: string;
  size?: number;
  style?: ViewStyle;
}

export const FloatingIcon: React.FC<FloatingIconProps> = ({ icon, size = 48, style }) => (
  <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }, style]}>
    <Text style={{ fontSize: size * 0.5 }}>{icon}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(16, 185, 129, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
});
