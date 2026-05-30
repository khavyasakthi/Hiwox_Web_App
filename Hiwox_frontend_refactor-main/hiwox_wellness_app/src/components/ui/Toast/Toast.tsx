import React, { useEffect, useRef } from "react";
import { Animated, Platform, View, Text } from "react-native";
import { styles } from "./Toast.styles"; // Ensure Toast.styles.ts exists in this folder

interface ToastProps {
  visible: boolean;
  message: string;
  isError?: boolean;
  onHide: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  visible,
  message,
  isError,
  onHide,
}) => {
  // Use useRef for animated values to keep them stable
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(-100)).current;
  const useNativeDriver = Platform.OS !== "web";

  useEffect(() => {
    // 1. Correctly type the timer to avoid 'Cannot find namespace NodeJS'
    let timer: ReturnType<typeof setTimeout>;

    if (visible) {
      // Show animation
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver,
        }),
      ]).start();

      // Set hide timer
      timer = setTimeout(() => {
        Animated.parallel([
          Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver,
          }),
          Animated.timing(slideAnim, {
            toValue: -100,
            duration: 300,
            useNativeDriver,
          }),
        ]).start(() => onHide());
      }, 3000);
    }

    // 2. Fix TS7030: Always return a cleanup function (even if visible is false)
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [visible, fadeAnim, slideAnim, onHide, useNativeDriver]);

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.toastContainer,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={[styles.toastContent, isError && styles.toastError]}>
        <Text style={[styles.toastIcon, isError && styles.toastErrorIcon]}>
          {isError ? "✕" : "✓"}
        </Text>
        <Text style={styles.toastMessage}>{message}</Text>
      </View>
    </Animated.View>
  );
};
