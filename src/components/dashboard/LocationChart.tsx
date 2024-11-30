import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Card } from "../ui/card";
import { LocationStats } from "../../types/stats";

interface LocationChartProps {
  data: {
    [deviceId: string]: LocationStats[];
  };
}

interface ProcessedLocationData {
  location: string;
  avgCapacity: number;
  alertCount: number;
  flameDetections: number;
}

export const LocationChart = ({ data }: LocationChartProps) => {
  const processedData: ProcessedLocationData[] = React.useMemo(() => {
    const locationMap = new Map<string, ProcessedLocationData>();

    Object.values(data)
      .flat()
      .forEach((stat) => {
        if (!locationMap.has(stat.location)) {
          locationMap.set(stat.location, {
            location: stat.location,
            avgCapacity: 0,
            alertCount: 0,
            flameDetections: 0,
          });
        }

        const existing = locationMap.get(stat.location)!;
        locationMap.set(stat.location, {
          ...existing,
          avgCapacity: (existing.avgCapacity + stat.average_capacity) / 2,
          alertCount: existing.alertCount + stat.alert_count,
          flameDetections: existing.flameDetections + stat.flame_detections,
        });
      });

    return Array.from(locationMap.values());
  }, [data]);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
        위치별 통계
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        각 위치별 누적 통계를 보여줍니다. 평균 용량, 경고 발생 횟수, 화재 감지
        횟수를 확인할 수 있습니다.
      </p>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={processedData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(100, 116, 139, 0.2)"
            />
            <XAxis
              dataKey="location"
              stroke="rgba(100, 116, 139, 0.7)"
              tick={{ fill: "currentColor" }}
              interval={0}
              angle={-45}
              textAnchor="end"
              height={100}
            />
            <YAxis
              yAxisId="left"
              stroke="rgba(100, 116, 139, 0.7)"
              tick={{ fill: "currentColor" }}
              unit="%"
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="rgba(100, 116, 139, 0.7)"
              tick={{ fill: "currentColor" }}
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
                color: "rgba(100, 116, 139, 0.7)",
              }}
            />
            <Bar
              yAxisId="left"
              dataKey="avgCapacity"
              name="평균 용량"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="right"
              dataKey="alertCount"
              name="경고 횟수"
              fill="#f59e0b"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              yAxisId="right"
              dataKey="flameDetections"
              name="화재 감지"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
