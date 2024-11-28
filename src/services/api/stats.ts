import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';
import { 
  StatisticsResponse, 
  StatsFilter,
  HourlyStats,
  LocationStats,
  EventData,
  DeviceSummary
} from '../../types/stats';

export const statsApi = {
  // 통계 데이터 조회 (타입별)
  getStatistics: async (filter: StatsFilter): Promise<StatisticsResponse> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/statistics`, {
        params: {
          type: filter.type,
          deviceId: filter.deviceId,
          startDate: filter.startDate,
          endDate: filter.endDate
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw error;
    }
  },

  // 시간대별 통계 조회
  getHourlyStats: async (deviceId?: string): Promise<{[key: string]: HourlyStats[]}> => {
    try {
      const response = await statsApi.getStatistics({
        type: 'hourly',
        deviceId
      });
      return response.hourly_stats || {};
    } catch (error) {
      console.error('Error fetching hourly stats:', error);
      throw error;
    }
  },

  // 위치별 통계 조회
  getLocationStats: async (deviceId?: string): Promise<{[key: string]: LocationStats[]}> => {
    try {
      const response = await statsApi.getStatistics({
        type: 'location',
        deviceId
      });
      return response.location_stats || {};
    } catch (error) {
      console.error('Error fetching location stats:', error);
      throw error;
    }
  },

  // 이벤트 통계 조회
  getEventStats: async (deviceId?: string): Promise<{[key: string]: EventData[]}> => {
    try {
      const response = await statsApi.getStatistics({
        type: 'events',
        deviceId
      });
      return response.events || {};
    } catch (error) {
      console.error('Error fetching event stats:', error);
      throw error;
    }
  },

  // 디바이스별 요약 통계 조회
  getDeviceSummary: async (deviceId?: string): Promise<{[key: string]: DeviceSummary}> => {
    try {
      const response = await statsApi.getStatistics({
        type: 'summary',
        deviceId
      });
      return response.summary || {};
    } catch (error) {
      console.error('Error fetching device summary:', error);
      throw error;
    }
  },

  // 통합 대시보드 데이터 조회
  getDashboardStats: async () => {
    try {
      const [summary, hourlyStats, locationStats, events] = await Promise.all([
        statsApi.getDeviceSummary(),
        statsApi.getHourlyStats(),
        statsApi.getLocationStats(),
        statsApi.getEventStats()
      ]);

      return {
        summary,
        hourlyStats,
        locationStats,
        events
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }
};