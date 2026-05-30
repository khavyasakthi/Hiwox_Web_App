// src/store/slices/ppgStore.ts

import { create } from "zustand";
import type { ScanResult, PPGPoint } from "@/types/ppg";

interface PPGState {
  latest: ScanResult | null;
  ppg: PPGPoint[];
  setLatest: (result: ScanResult) => void;
  setPPG: (data: PPGPoint[]) => void;
  clear: () => void;
}

export const usePPGStore = create<PPGState>((set) => ({
  latest: null,
  ppg: [],
  setLatest: (result) => set({ latest: result }),
  setPPG: (data) => set({ ppg: data }),
  clear: () => set({ latest: null, ppg: [] }),
}));
