// src/services/api/types.ts
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

