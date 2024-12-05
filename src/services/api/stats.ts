import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';
import { StatisticsResponse, EventData } from '../../types/stats';

interface StatsParams {
  startDate: string;
  endDate: string;
  deviceId?: string;
}

export const statsApi = {
  // 대시보드 통계 데이터 조회
  getDashboardStats: async (startDate: string, endDate: string): Promise<StatisticsResponse> => {
    try {
      const params = new URLSearchParams();
      params.append('startDate', startDate);
      params.append('endDate', endDate);

      const [summaryResponse, hourlyResponse, locationResponse, eventsResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/statistics?type=summary&${params.toString()}`),
        axios.get(`${API_BASE_URL}/statistics?type=hourly&${params.toString()}`),
        axios.get(`${API_BASE_URL}/statistics?type=location&${params.toString()}`),
        axios.get(`${API_BASE_URL}/statistics?type=events&${params.toString()}`)
      ]);

      console.log('API Responses:', {
        summary: summaryResponse.data,
        hourly: hourlyResponse.data,
        location: locationResponse.data,
        events: eventsResponse.data
      });

      return {
        summary: summaryResponse.data.summary || {},
        hourly_stats: {
          data: hourlyResponse.data.hourly_stats || {},
          period: {
            start: startDate,
            end: endDate
          }
        },
        location_stats: {
          data: locationResponse.data.location_stats || {},
          period: {
            start: startDate,
            end: endDate
          }
        },
        events: eventsResponse.data.events || {}
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return {
        summary: {},
        hourly_stats: {
          data: {},
          period: {
            start: startDate,
            end: endDate
          }
        },
        location_stats: {
          data: {},
          period: {
            start: startDate,
            end: endDate
          }
        },
        events: {}
      };
    }
  },

  // 특정 디바이스의 통계 데이터 조회
  getDeviceStats: async ({ deviceId, startDate, endDate }: StatsParams): Promise<StatisticsResponse> => {
    try {
      const params = new URLSearchParams();
      params.append('startDate', startDate);
      params.append('endDate', endDate);
      if (deviceId) {
        params.append('deviceId', deviceId);
      }

      const [summaryResponse, hourlyResponse, locationResponse, eventsResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/statistics?type=summary&${params.toString()}`),
        axios.get(`${API_BASE_URL}/statistics?type=hourly&${params.toString()}`),
        axios.get(`${API_BASE_URL}/statistics?type=location&${params.toString()}`),
        axios.get(`${API_BASE_URL}/statistics?type=events&${params.toString()}`)
      ]);

      return {
        summary: summaryResponse.data.summary || {},
        hourly_stats: {
          data: hourlyResponse.data.hourly_stats || {},
          period: {
            start: startDate,
            end: endDate
          }
        },
        location_stats: {
          data: locationResponse.data.location_stats || {},
          period: {
            start: startDate,
            end: endDate
          }
        },
        events: eventsResponse.data.events || {}
      };
    } catch (error) {
      console.error(`Error fetching stats for device ${deviceId}:`, error);
      throw error;
    }
  },

  // 이벤트 통계 데이터 조회
  getEventStats: async ({ startDate, endDate }: Omit<StatsParams, 'deviceId'>): Promise<{ [deviceId: string]: EventData[] }> => {
    try {
      const params = new URLSearchParams();
      params.append('startDate', startDate);
      params.append('endDate', endDate);

      const response = await axios.get(`${API_BASE_URL}/statistics?type=events&${params.toString()}`);
      
      console.log('Events Response:', response.data);
      
      if (!response.data.events) {
        console.warn('No events data in response:', response.data);
      }

      return response.data.events || {};
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  }
};