import { create } from "zustand";
import type { User } from "@/types/auth";

interface UserPreferences {
  theme: "light" | "dark" | "system";
  language: string;
  notifications: {
    workoutReminder: boolean;
    progressUpdate: boolean;
    socialNotifications: boolean;
  };
}

interface UserState {
  profile: User | null;
  preferences: UserPreferences;
  setProfile: (profile: User | null) => void;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  reset: () => void;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  theme: "system",
  language: "en",
  notifications: {
    workoutReminder: true,
    progressUpdate: true,
    socialNotifications: false,
  },
};

export const useUserStore = create<UserState>((set) => ({
  profile: null,
  preferences: DEFAULT_PREFERENCES,

  setProfile: (profile) => set({ profile }),

  updatePreferences: (prefs) =>
    set((state) => ({
      preferences: { ...state.preferences, ...prefs },
    })),

  reset: () => set({ profile: null, preferences: DEFAULT_PREFERENCES }),
}));
