import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';
import { StatsData } from '../../types/stats';

export const statsApi = {
  // 전체 통계 데이터 조회
  getSummary: async (): Promise<StatsData> => {
    const response = await axios.get(`${API_BASE_URL}/stats/summary`);
    return response.data;
  },

  // 시계열 데이터 조회
  getTimeSeriesData: async (start: string, end: string): Promise<StatsData['timeSeriesData']> => {
    const response = await axios.get(`${API_BASE_URL}/stats/time-series`, {
      params: { start, end }
    });
    return response.data;
  },

  // 위치별 통계 조회
  getLocationStats: async (): Promise<StatsData['capacityByLocation']> => {
    const response = await axios.get(`${API_BASE_URL}/stats/location`);
    return response.data;
  },

  // 일별 통계 조회
  getDailyStats: async (date: string): Promise<any> => {
    const response = await axios.get(`${API_BASE_URL}/stats/daily`, {
      params: { date }
    });
    return response.data;
  }
};