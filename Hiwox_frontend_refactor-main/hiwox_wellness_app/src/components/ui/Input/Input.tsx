import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  type TextInputProps,
  type ViewStyle,
} from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  secureToggle?: boolean;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  secureToggle = false,
  containerStyle,
  secureTextEntry,
  ...rest
}) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry ?? false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View style={[styles.inputRow, error ? styles.inputError : null]}>
        <TextInput
          style={styles.input}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={isSecure}
          {...rest}
        />
        {secureToggle ? (
          <TouchableOpacity
            style={styles.toggleBtn}
            onPress={() => setIsSecure((v) => !v)}
          >
            <Text style={styles.toggleText}>{isSecure ? "Show" : "Hide"}</Text>
          </TouchableOpacity>
        ) : null}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#E5E7EB",
    marginBottom: 8,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: "#374151",
    backgroundColor: "#111827",
    borderRadius: 12,
    paddingRight: 4,
  },
  inputError: {
    borderColor: "#EF4444",
  },
  input: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: "#F9FAFB",
    fontWeight: "500",
  },
  toggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  toggleText: {
    color: "#9CA3AF",
    fontSize: 13,
    fontWeight: "600",
  },
  errorText: {
    marginTop: 4,
    fontSize: 12,
    color: "#EF4444",
  },
});
