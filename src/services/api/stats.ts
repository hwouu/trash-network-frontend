import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';
import { StatisticsResponse, EventData } from '../../types/stats';

export const statsApi = {
  getDashboardStats: async (): Promise<StatisticsResponse> => {
    try {
      const [summaryResponse, hourlyResponse, locationResponse, eventsResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/statistics?type=summary`),
        axios.get(`${API_BASE_URL}/statistics?type=hourly`),
        axios.get(`${API_BASE_URL}/statistics?type=location`),
        axios.get(`${API_BASE_URL}/statistics?type=events`)
      ]);

      console.log('API Responses:', {
        summary: summaryResponse.data,
        hourly: hourlyResponse.data,
        location: locationResponse.data,
        events: eventsResponse.data
      });

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
  },

  // Notifications 페이지용 이벤트 데이터 조회
  getEventStats: async (): Promise<{ [deviceId: string]: EventData[] }> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/statistics?type=events`);
      
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