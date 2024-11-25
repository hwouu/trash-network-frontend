import React from 'react';
import { TrashBinList } from '../components/dashboard/TrashBinList';
import { CapacityChart } from '../components/dashboard/CapacityChart';
import { DUMMY_TRASH_BINS } from '../utils/constants';
import { generateDummyCapacityData } from '../utils/chartData';

export const Dashboard = () => {
  const capacityData = generateDummyCapacityData(24); // 24시간 동안의 데이터

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-dark-primary">
          Dashboard
        </h1>
        <div className="text-sm text-gray-500 dark:text-dark-secondary">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
      
      <div className="grid gap-6">
        <CapacityChart data={capacityData} />
        <TrashBinList bins={DUMMY_TRASH_BINS} />
      </div>
    </div>
  );
};