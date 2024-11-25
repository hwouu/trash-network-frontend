export const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://3selbvclnh.execute-api.ap-northeast-2.amazonaws.com/prod';
export const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK_DATA === 'true';
export const POLLING_INTERVAL = 30000;

export const CAPACITY_THRESHOLDS = {
  warning: 70,
  full: 90,
};

export const STATUS_COLORS = {
  normal: 'bg-green-500',
  warning: 'bg-yellow-500',
  full: 'bg-orange-500',    // 빨간색에서 주황색으로 변경
  error: 'bg-gray-500'
};

export const CAPACITY_COLORS = {
  low: 'bg-green-500',      // 0-69%
  warning: 'bg-yellow-500', // 70-89%
  full: 'bg-orange-500'     // 90-100%
};

export const ALERT_COLORS = {
  fire: 'bg-red-500',       // 화재 경보용 색상 별도 지정
  normal: 'bg-green-500',
  warning: 'bg-yellow-500'
};

// 테스트용 더미 데이터
export const MOCK_TRASH_BINS = [
  {
    deviceId: "TB001",
    location: "학생회관 1층",
    capacity: 75,
    temperature: 23.5,
    lastUpdated: new Date().toISOString(),
    batteryLevel: 85,
    status: "warning" as const
  },
  {
    deviceId: "TB002",
    location: "과학관 1층",
    capacity: 30,
    temperature: 22.0,
    lastUpdated: new Date(Date.now() - 3600000).toISOString(),
    batteryLevel: 92,
    status: "normal" as const
  }
];