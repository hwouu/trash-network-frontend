import React, { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "../ui/card";
import { HourlyStats } from "../../types/stats";

interface TimeSeriesChartProps {
  data: {
    [deviceId: string]: HourlyStats[];
  };
}

interface ProcessedDataPoint {
  hour: string;
  [key: string]: number | string;
}

const DEVICE_COLORS = {
  ThrashModule1: "#22c55e",
  ThrashModule2: "#3b82f6",
  ThrashModule3: "#f59e0b",
};

export const TimeSeriesChart = ({ data }: TimeSeriesChartProps) => {
  const processedData = useMemo(() => {
    const hourlyData: ProcessedDataPoint[] = Array.from(
      { length: 24 },
      (_, i) => ({
        hour: `${i}:00`,
      })
    );

    Object.entries(data).forEach(([deviceId, stats]) => {
      stats.forEach((stat) => {
        const index = stat.hour;
        hourlyData[index] = {
          ...hourlyData[index],
          [deviceId]: stat.average_capacity,
        };
      });
    });

    return hourlyData;
  }, [data]);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
        시간대별 용량 변화
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        24시간 기준 각 시간대별 쓰레기통의 평균 용량을 보여줍니다. 각 디바이스의
        데이터가 개별적으로 표시됩니다.
      </p>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={processedData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(100, 116, 139, 0.2)"
            />
            <XAxis
              dataKey="hour"
              stroke="currentColor"
              tick={{ fill: "currentColor" }}
              axisLine={{ stroke: "currentColor" }}
            />
            <YAxis
              stroke="currentColor"
              tick={{ fill: "currentColor" }}
              axisLine={{ stroke: "currentColor" }}
              unit="%"
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(17, 24, 39, 0.8)",
                border: "1px solid rgba(100, 116, 139, 0.2)",
                borderRadius: "6px",
                color: "#fff",
              }}
            />
            <Legend
              wrapperStyle={{
                paddingTop: "1rem",
                color: "currentColor",
              }}
            />
            {Object.keys(data).map((deviceId) => (
              <Line
                key={deviceId}
                type="monotone"
                dataKey={deviceId}
                name={`${deviceId} 용량`}
                stroke={DEVICE_COLORS[deviceId as keyof typeof DEVICE_COLORS]}
                strokeWidth={2}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
