export interface StatsData {
  totalBins: number;
  averageCapacity: number;
  dailyCollections: number;
  monthlyCollections: number;
  mostUsedBin: {
    deviceId: string;
    location: string;
    averageCapacity: number;
  };
  peakHours: {
    hour: number;
    average: number;
  }[];
  capacityByLocation: {
    location: string;
    average: number;
    collections: number;
  }[];
  timeSeriesData: {
    timestamp: string;
    averageCapacity: number;
    collections: number;
  }[];
}

export interface StatsSummary {
  title: string;
  value: string | number;
  change?: number; // 전주 대비 변화율
  trend?: 'up' | 'down' | 'neutral';
  icon?: React.ReactNode;
}

export interface StatsCardProps {
  summary: StatsSummary;
  loading?: boolean;
}