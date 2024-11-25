// src/utils/constants.ts에 더미 데이터 추가
export const DUMMY_TRASH_BINS: TrashBin[] = [
  {
    deviceId: "TB001",
    location: "학생회관 1층",
    capacity: 75,
    temperature: 23.5,
    lastUpdated: new Date().toISOString(),
    batteryLevel: 85,
    status: "warning"
  },
  {
    deviceId: "TB002",
    location: "과학관 1층",
    capacity: 30,
    temperature: 22.0,
    lastUpdated: new Date(Date.now() - 3600000).toISOString(), // 1시간 전
    batteryLevel: 92,
    status: "normal"
  },
  {
    deviceId: "TB003",
    location: "도서관 앞",
    capacity: 95,
    temperature: 25.0,
    lastUpdated: new Date(Date.now() - 1800000).toISOString(), // 30분 전
    batteryLevel: 78,
    status: "full"
  },
  {
    deviceId: "TB004",
    location: "강의동 앞 흡연장",
    capacity: 45,
    temperature: 24.5,
    lastUpdated: new Date(Date.now() - 900000).toISOString(), // 15분 전
    batteryLevel: 90,
    status: "normal"
  }
];
