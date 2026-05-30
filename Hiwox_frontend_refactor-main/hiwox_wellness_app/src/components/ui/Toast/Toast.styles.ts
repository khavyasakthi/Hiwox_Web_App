import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  toastContainer: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  toastContent: {
    backgroundColor: "#065F46",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#10B981",
  },
  toastError: {
    backgroundColor: "#7F1D1D",
    borderLeftColor: "#EF4444",
  },
  toastIcon: {
    fontSize: 20,
    color: "#10B981",
    marginRight: 12,
    fontWeight: "bold",
  },
  toastErrorIcon: {
    color: "#EF4444",
  },
  toastMessage: {
    flex: 1,
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
