import { useColorScheme } from "react-native";
import { colors } from "@/styles/colors";

type Theme = {
  colors: typeof colors;
  isDark: boolean;
};

export const useTheme = (): Theme => {
  const scheme = useColorScheme();
  return {
    colors,
    isDark: scheme === "dark",
  };
};
