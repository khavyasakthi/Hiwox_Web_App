export const formatDate = (date: string | Date, locale = "en-US"): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
};

export const formatShortDate = (date: string | Date, locale = "en-US"): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString(locale, { month: "short", day: "numeric" });
};

export const formatTime = (date: string | Date, locale = "en-US"): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit" });
};

export const formatRelative = (date: string | Date): string => {
  const d = typeof date === "string" ? new Date(date) : date;
  const now = new Date();
  const diffMs = now.getTime() - d.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays < 7) return `${diffDays}d ago`;
  return formatShortDate(d);
};
