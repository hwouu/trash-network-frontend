import React, { useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { Card } from '@/components/ui/card';
import { CapacityData } from '../../types/chart';
import { formatCapacityData } from '../../utils/chartData';

interface CapacityChartProps {
  data: CapacityData[];
  title?: string;
}

const COLORS = ['#2563eb', '#059669', '#d97706', '#dc2626'];

export const CapacityChart = ({ data, title = '쓰레기통 용량 추이' }: CapacityChartProps) => {
  const [selectedBins, setSelectedBins] = useState<string[]>([]);
  
  const formattedData = useMemo(() => formatCapacityData(data), [data]);
  const binIds = useMemo(() => 
    [...new Set(data.map(d => `${d.deviceId} (${d.location})`))],
    [data]
  );

  const toggleBin = (binId: string) => {
    setSelectedBins(prev => 
      prev.includes(binId)
        ? prev.filter(id => id !== binId)
        : [...prev, binId]
    );
  };

  return (
    <Card className="w-full p-6 bg-white dark:bg-dark-card">
      <div className="flex flex-col space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-primary">
            {title}
          </h3>
          <div className="flex gap-2">
            {binIds.map((binId, index) => (
              <button
                key={binId}
                onClick={() => toggleBin(binId)}
                className={`px-2 py-1 text-xs rounded-full transition-colors
                  ${selectedBins.includes(binId) || selectedBins.length === 0
                    ? `bg-opacity-20 border border-opacity-50`
                    : 'bg-gray-100 dark:bg-dark-primary text-gray-500 dark:text-dark-secondary'
                  }`}
                style={{
                  backgroundColor: selectedBins.includes(binId) || selectedBins.length === 0
                    ? `${COLORS[index]}20`
                    : undefined,
                  borderColor: COLORS[index],
                  color: selectedBins.includes(binId) || selectedBins.length === 0
                    ? COLORS[index]
                    : undefined
                }}
              >
                {binId}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={formattedData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                className="stroke-gray-200 dark:stroke-gray-700" 
              />
              <XAxis 
                dataKey="time" 
                className="text-gray-600 dark:text-dark-secondary" 
              />
              <YAxis 
                className="text-gray-600 dark:text-dark-secondary"
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  border: 'none',
                  borderRadius: '0.5rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
              />
              <Legend />
              {binIds.map((binId, index) => (
                (selectedBins.includes(binId) || selectedBins.length === 0) && (
                  <Line
                    key={binId}
                    type="monotone"
                    dataKey={binId}
                    stroke={COLORS[index]}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 6 }}
                  />
                )
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
};