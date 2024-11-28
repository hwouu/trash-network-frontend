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

// API 응답 타입
export interface StatisticsResponse {
  hourly_stats?: {
    [deviceId: string]: HourlyStats[];
  };
  location_stats?: {
    [deviceId: string]: LocationStats[];
  };
  events?: {
    [deviceId: string]: EventData[];
  };
  summary?: {
    [deviceId: string]: DeviceSummary;
  };
}

// 기존 타입들은 유지
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
  type: 'hourly' | 'location' | 'events' | 'summary';
  startDate?: string;
  endDate?: string;
}