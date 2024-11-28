import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';
import { StatisticsResponse } from '../../types/stats';

export const statsApi = {
  getDashboardStats: async (): Promise<StatisticsResponse> => {
    try {
      // 각 통계 타입별로 별도의 요청 수행
      const [summaryResponse, hourlyResponse, locationResponse, eventsResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/statistics?type=summary`),
        axios.get(`${API_BASE_URL}/statistics?type=hourly`),
        axios.get(`${API_BASE_URL}/statistics?type=location`),
        axios.get(`${API_BASE_URL}/statistics?type=events`)
      ]);

      // API 응답 로그
      console.log('API Responses:', {
        summary: summaryResponse.data,
        hourly: hourlyResponse.data,
        location: locationResponse.data,
        events: eventsResponse.data
      });

      // 응답 데이터 직접 사용 (이미 JSON 객체임)
      return {
        summary: summaryResponse.data.summary || {},
        hourly_stats: hourlyResponse.data.hourly_stats || {},
        location_stats: locationResponse.data.location_stats || {},
        events: eventsResponse.data.events || {}
      };
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      return {
        summary: {},
        hourly_stats: {},
        location_stats: {},
        events: {}
      };
    }
  },

  // 특정 디바이스의 통계 조회
  getDeviceStats: async (deviceId: string): Promise<StatisticsResponse> => {
    try {
      const [summaryResponse, hourlyResponse, locationResponse, eventsResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/statistics?type=summary&deviceId=${deviceId}`),
        axios.get(`${API_BASE_URL}/statistics?type=hourly&deviceId=${deviceId}`),
        axios.get(`${API_BASE_URL}/statistics?type=location&deviceId=${deviceId}`),
        axios.get(`${API_BASE_URL}/statistics?type=events&deviceId=${deviceId}`)
      ]);

      return {
        summary: summaryResponse.data.summary || {},
        hourly_stats: hourlyResponse.data.hourly_stats || {},
        location_stats: locationResponse.data.location_stats || {},
        events: eventsResponse.data.events || {}
      };
    } catch (error) {
      console.error(`Error fetching stats for device ${deviceId}:`, error);
      throw error;
    }
  }
};