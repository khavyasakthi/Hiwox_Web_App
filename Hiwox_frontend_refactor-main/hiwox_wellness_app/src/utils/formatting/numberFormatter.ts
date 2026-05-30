export const formatNumber = (value: number, decimals = 0): string =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

export const formatDuration = (seconds: number): string => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  if (h > 0) return `${h}h ${m}m`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
};

export const formatCalories = (kcal: number): string => `${formatNumber(kcal)} kcal`;

export const formatWeight = (kg: number, unit: "kg" | "lbs" = "kg"): string => {
  if (unit === "lbs") return `${formatNumber(kg * 2.20462, 1)} lbs`;
  return `${formatNumber(kg, 1)} kg`;
};
