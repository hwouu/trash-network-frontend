// src/types/chart.ts
export interface CapacityData {
  timestamp: string;
  deviceId: string;
  location: string;
  capacity: number;
}

export interface ChartDataPoint {
  time: string;
  [key: string]: string | number; // 동적으로 각 쓰레기통의 용량을 저장
}