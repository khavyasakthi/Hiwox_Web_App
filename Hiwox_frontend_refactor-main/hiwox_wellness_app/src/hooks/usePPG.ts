import { useState, useCallback, useRef, useEffect } from "react";
import {
  ppgEmitter,
  PPGScanner,
  ensurePPGAvailable,
  DEFAULT_OPTIONS,
  type PPGStartOptions,
} from "@/services/ppg/ppgService";
import { usePPGStore } from "@/store/slices/ppgStore";
import { logger } from "@/config/logger";
import type { PPGFrameEvent, ScanResult } from "@/types/ppg";

type ScanStatus = "idle" | "scanning" | "stopped" | "error";

interface UsePPGReturn {
  status: ScanStatus;
  isScanning: boolean;
  latestResult: ScanResult | null;
  currentBpm: number;
  fingerDetected: boolean;
  startScan: (options?: PPGStartOptions) => void;
  stopScan: () => void;
  clearResults: () => void;
}

export const usePPG = (): UsePPGReturn => {
  const { latest, setPPG, clear } = usePPGStore();
  const [status, setStatus] = useState<ScanStatus>("idle");
  const [currentBpm, setCurrentBpm] = useState(0);
  const [fingerDetected, setFingerDetected] = useState(false);
  const subscriptions = useRef<{ remove: () => void }[]>([]);

  const cleanup = useCallback(() => {
    subscriptions.current.forEach((s) => s.remove());
    subscriptions.current = [];
  }, []);

  useEffect(() => () => cleanup(), [cleanup]);

  const startScan = useCallback(
    (options: PPGStartOptions = {}) => {
      try {
        ensurePPGAvailable();
        setStatus("scanning");
        setCurrentBpm(0);
        setFingerDetected(false);
        setPPG([]);

        if (!ppgEmitter) return;

        const frameSub = ppgEmitter.addListener("PPGFrame", (e: PPGFrameEvent) => {
          setCurrentBpm(e.bpm);
          setFingerDetected(e.fingerDetected);
        });

        const stateSub = ppgEmitter.addListener("PPGState", (e: { state: string }) => {
          if (e.state === "stopped") setStatus("stopped");
        });

        subscriptions.current = [frameSub, stateSub];
        PPGScanner.startScan({ ...DEFAULT_OPTIONS, ...options });
      } catch (error) {
        logger.error("PPG start error:", error);
        setStatus("error");
      }
    },
    [setPPG],
  );

  const stopScan = useCallback(() => {
    try {
      if (PPGScanner) PPGScanner.stopScan();
    } catch (error) {
      logger.error("PPG stop error:", error);
    } finally {
      cleanup();
      setStatus("stopped");
    }
  }, [cleanup]);

  const clearResults = useCallback(() => {
    clear();
    setStatus("idle");
    setCurrentBpm(0);
    setFingerDetected(false);
  }, [clear]);

  return {
    status,
    isScanning: status === "scanning",
    latestResult: latest,
    currentBpm,
    fingerDetected,
    startScan,
    stopScan,
    clearResults,
  };
};
