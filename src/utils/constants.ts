// 테스트용 더미 데이터 추가
// src/utils/constants.ts에 추가
export const DUMMY_TRASH_BIN: TrashBin = {
  deviceId: "TB001",
  location: "학생회관 1층",
  capacity: 75,
  temperature: 23.5,
  lastUpdated: new Date().toISOString(),
  batteryLevel: 85,
  status: "warning"
};
