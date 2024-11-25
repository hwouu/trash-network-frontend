import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';
import { TrashBin } from '../../types/trash';

export const trashBinApi = {
  getAllBins: async (): Promise<TrashBin[]> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/trash-bins`);
      console.log('API Response:', response.data);
      
      const binsData = Array.isArray(response.data) ? response.data : response.data.items || [];
      
      return binsData.map((bin: any) => ({
        deviceId: bin.deviceId || 'unknown',
        location: bin.location || 'unknown',
        capacity: Math.round(Number(bin.capacity)) || 0,
        temperature: Number(bin.temperature) || 0,
        lastUpdated: bin.timestamp || new Date().toISOString(),
        batteryLevel: Number(bin.batteryLevel) || 0,
        flameDetected: Boolean(bin.flameDetected), // 추가된 부분
        status: determineStatus(Number(bin.capacity))  // temperature 파라미터 제거
      }));
    } catch (error) {
      console.error('Error fetching trash bins:', error);
      return [];
    }
  },

  getBinById: async (deviceId: string): Promise<TrashBin> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/trash-bins/${deviceId}`);
      const bin = response.data;
      
      return {
        deviceId: bin.deviceId || deviceId,
        location: bin.location || 'unknown',
        capacity: Math.round(Number(bin.capacity)) || 0,
        temperature: Number(bin.temperature) || 0,
        lastUpdated: bin.timestamp || new Date().toISOString(),
        batteryLevel: Number(bin.batteryLevel) || 0,
        flameDetected: Boolean(bin.flameDetected), // 추가된 부분
        status: determineStatus(Number(bin.capacity))  // temperature 파라미터 제거
      };
    } catch (error) {
      console.error(`Error fetching trash bin ${deviceId}:`, error);
      throw error;
    }
  }
};

// 온도 기반 판단 제거
const determineStatus = (capacity: number): TrashBin['status'] => {
  if (capacity >= 90) return 'full';
  if (capacity >= 70) return 'warning';
  return 'normal';
};