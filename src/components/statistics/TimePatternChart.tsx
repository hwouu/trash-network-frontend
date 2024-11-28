import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useQuery } from '@tanstack/react-query';
import { statsApi } from '../../services/api/stats';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2 } from 'lucide-react';

const formatHour = (hour: number) => {
  return `${hour.toString().padStart(2, '0')}:00`;
};

export const TimePatternChart = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['timeSeriesStats'],
    queryFn: () => statsApi.getTimeSeriesStats(),
    refetchInterval: 1000 * 60 * 5, // 5분마다 갱신
  });

  if (isLoading) {
    return (
      <Card className="w-full h-[400px] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </Card>
    );
  }

  if (error) {
    console.error('Error in TimePatternChart:', error);
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <Alert variant="destructive">
            <AlertDescription>
              데이터를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  if (!data?.hourlyAvg?.length) {
    return (
      <Card className="w-full">
        <CardContent className="pt-6">
          <Alert>
            <AlertDescription>
              현재 표시할 데이터가 없습니다.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>시간대별 평균 용량</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.hourlyAvg}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="hour" 
                tickFormatter={formatHour}
                interval={2}
              />
              <YAxis 
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip 
                formatter={(value: number) => [`${value}%`, '용량']}
                labelFormatter={formatHour}
              />
              <Line
                type="monotone"
                dataKey="capacity"
                stroke="#2563eb"
                strokeWidth={2}
                dot={false}
                name="용량"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TimePatternChart;