export type ID = string;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export interface Timestamps {
  createdAt: string;
  updatedAt: string;
}

export type LoadingState = "idle" | "loading" | "success" | "error";
