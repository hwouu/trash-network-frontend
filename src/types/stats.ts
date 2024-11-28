export interface TimeSeriesStats {
  hourlyAvg: HourlyAverage[];
  dailyAvg: DailyAverage[];
  peakHours: PeakHour[];
}

export interface HourlyAverage {
  hour: number;
  capacity: number;
}

export interface DailyAverage {
  day: string;
  capacity: number;
}

export interface PeakHour {
  location: string;
  hour: number;
  capacity: number;
}

export interface StatsSummary {
  value: number;
  change: number;
  timeFrame: string;
  label: string;
  title: string;
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}