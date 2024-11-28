import React from 'react';
import { TimePatternChart } from '@/components/statistics/TimePatternChart';

const Statistics = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">통계</h1>
      <div className="grid gap-6">
        <TimePatternChart />
        {/* 추후 다른 통계 차트들이 추가될 예정 */}
      </div>
    </div>
  );
};

export default Statistics;