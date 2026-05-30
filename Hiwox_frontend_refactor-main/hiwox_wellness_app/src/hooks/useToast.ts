import { useState, useCallback } from "react";

interface ToastState {
  visible: boolean;
  message: string;
  isError: boolean;
}

interface UseToastReturn {
  toast: ToastState;
  showToast: (message: string, type?: "success" | "error") => void;
  hideToast: () => void;
}

export const useToast = (): UseToastReturn => {
  const [toast, setToast] = useState<ToastState>({
    visible: false,
    message: "",
    isError: false,
  });

  const showToast = useCallback((message: string, type: "success" | "error" = "success") => {
    setToast({ visible: true, message, isError: type === "error" });
  }, []);

  const hideToast = useCallback(() => {
    setToast((prev) => ({ ...prev, visible: false }));
  }, []);

  return { toast, showToast, hideToast };
};
