export interface ToastProps {
  visible: boolean;
  message: string;
  onHide: () => void;
  type?: "success" | "error";
}
