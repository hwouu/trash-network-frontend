// src/types/stats.ts

// 시간별 통계 데이터 타입
export interface HourlyStats {
  hour: number;
  average_capacity: number;
  alert_count: number;
}

// 위치별 통계 데이터 타입
export interface LocationStats {
  location: string;
  average_capacity: number;
  alert_count: number;
  flame_detections: number;
}

// 이벤트 데이터 타입
export interface EventData {
  type: 'flame' | 'full';
  timestamp: string;
  location: string;
  deviceId: string;
}

// 디바이스 요약 통계 타입
export interface DeviceSummary {
  total_records: number;
  avg_capacity: number;
  max_capacity: number;
  total_alerts: number;
  total_flame_detections: number;
  last_location: string;
}

// 기간 정보 타입
export interface PeriodInfo {
  start: string;
  end: string;
}

// 시간별 통계 응답 타입
export interface HourlyStatsResponse {
  data: {
    [deviceId: string]: HourlyStats[];
  };
  period?: PeriodInfo;
}

// 위치별 통계 응답 타입
export interface LocationStatsResponse {
  data: {
    [deviceId: string]: LocationStats[];
  };
  period?: PeriodInfo;
}

// API 응답 타입
export interface StatisticsResponse {
  summary?: {
    [deviceId: string]: DeviceSummary;
  };
  hourly_stats?: HourlyStatsResponse;
  location_stats?: LocationStatsResponse;
  events?: {
    [deviceId: string]: EventData[];
  };
}

// 통계 요약 타입
export interface StatsSummary {
  title: string;
  value: string | number;
  change?: number;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}

export interface StatsCardProps {
  summary: StatsSummary;
  loading?: boolean;
}

// 통계 데이터 필터 옵션
export interface StatsFilter {
  deviceId?: string;
  type: 'hourly' | 'location' | 'events' | 'summary' | 'all';
  startDate?: string;
  endDate?: string;
}