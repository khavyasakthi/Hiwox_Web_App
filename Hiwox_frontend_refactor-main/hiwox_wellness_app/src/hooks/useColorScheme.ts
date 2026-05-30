import { useColorScheme as useRNColorScheme } from "react-native";

export const useColorScheme = (): "light" | "dark" => {
  const scheme = useRNColorScheme();
  return scheme === "dark" ? "dark" : "light";
};
