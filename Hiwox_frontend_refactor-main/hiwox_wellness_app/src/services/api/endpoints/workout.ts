import { apiClient } from "@/services/api/client";

interface WorkoutPayload {
  name: string;
  description?: string;
  exercises?: unknown[];
  duration?: number;
  difficulty?: "easy" | "intermediate" | "hard";
}

interface WorkoutLogPayload {
  duration: number;
  exercises?: unknown[];
  notes?: string;
}

export const workoutEndpoints = {
  list: (params?: Record<string, unknown>) =>
    apiClient.get("/workouts", { params }),

  get: (id: string) =>
    apiClient.get(`/workouts/${id}`),

  create: (payload: WorkoutPayload) =>
    apiClient.post("/workouts", payload),

  update: (id: string, payload: Partial<WorkoutPayload>) =>
    apiClient.put(`/workouts/${id}`, payload),

  delete: (id: string) =>
    apiClient.delete(`/workouts/${id}`),

  log: (id: string, payload: WorkoutLogPayload) =>
    apiClient.post(`/workouts/${id}/log`, payload),
};
