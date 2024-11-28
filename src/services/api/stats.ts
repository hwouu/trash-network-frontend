import axios from 'axios';
import { API_BASE_URL } from '../../utils/constants';
import { TimeSeriesStats } from '../../types/stats';

export const statsApi = {
  getTimeSeriesStats: async (): Promise<TimeSeriesStats> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/stats/timeseries`);
      console.log('Time Series Stats Response:', response.data);
      
      const data = response.data;
      return {
        hourlyAvg: data.hourlyAvg || [],
        dailyAvg: data.dailyAvg || [],
        peakHours: data.peakHours || []
      };
    } catch (error) {
      console.error('Error fetching time series stats:', error);
      return {
        hourlyAvg: [],
        dailyAvg: [],
        peakHours: []
      };
    }
  }
};