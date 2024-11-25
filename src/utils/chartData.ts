// src/utils/chartData.ts
import { CapacityData } from '../types/chart';
import { format, subHours } from 'date-fns';

// 더미 데이터 생성 함수
export const generateDummyCapacityData = (hours: number = 24): CapacityData[] => {
  const data: CapacityData[] = [];
  const bins = ['TB001', 'TB002', 'TB003', 'TB004'];
  const locations = ['학생회관 1층', '과학관 1층', '도서관 앞', '강의동 앞 흡연장'];

  for (let i = hours; i >= 0; i--) {
    bins.forEach((bin, index) => {
      data.push({
        timestamp: subHours(new Date(), i).toISOString(),
        deviceId: bin,
        location: locations[index],
        capacity: Math.floor(Math.random() * (95 - 20 + 1) + 20), // 20-95% 범위의 랜덤 값
      });
    });
  }

  return data;
};

// 차트 데이터 포맷 변환 함수
export const formatCapacityData = (data: CapacityData[]): any[] => {
  const groupedByTimestamp = data.reduce((acc, curr) => {
    const time = format(new Date(curr.timestamp), 'HH:mm');
    if (!acc[time]) {
      acc[time] = { time };
    }
    acc[time][`${curr.deviceId} (${curr.location})`] = curr.capacity;
    return acc;
  }, {} as Record<string, any>);

  return Object.values(groupedByTimestamp);
};