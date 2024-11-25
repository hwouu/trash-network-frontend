import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';
import { TrashBin } from '../../types/trash';

export const trashBinApi = {
  getAllBins: async (): Promise<TrashBin[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/trash-bins`);
      
      // API 응답을 TrashBin 타입에 맞게 변환
      return response.data.map((bin: any) => ({
        deviceId: bin.deviceId,
        location: bin.location,
        capacity: Math.round(Number(bin.capacity)),
        temperature: Number(bin.temperature),
        lastUpdated: bin.timestamp,
        batteryLevel: Number(bin.batteryLevel),
        status: determineStatus(Number(bin.capacity), Number(bin.temperature))
      }));
    } catch (error) {
      console.error('Error fetching trash bins:', error);
      throw error;
    }
  },

  getBinById: async (deviceId: string): Promise<TrashBin> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/trash-bins/${deviceId}`);
      const bin = response.data;
      
      return {
        deviceId: bin.deviceId,
        location: bin.location,
        capacity: Math.round(Number(bin.capacity)),
        temperature: Number(bin.temperature),
        lastUpdated: bin.timestamp,
        batteryLevel: Number(bin.batteryLevel),
        status: determineStatus(Number(bin.capacity), Number(bin.temperature))
      };
    } catch (error) {
      console.error(`Error fetching trash bin ${deviceId}:`, error);
      throw error;
    }
  }
};

// 쓰레기통 상태 결정 함수
const determineStatus = (capacity: number, temperature: number): TrashBin['status'] => {
  if (temperature > 60) return 'error'; // 온도가 너무 높음
  if (capacity >= 90) return 'full';
  if (capacity >= 70) return 'warning';
  return 'normal';
};