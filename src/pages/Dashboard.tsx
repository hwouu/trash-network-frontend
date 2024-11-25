import React from 'react';
import { TrashBinList } from '../components/dashboard/TrashBinList';
import { CapacityChart } from '../components/dashboard/CapacityChart';
import { useTrashBinData } from '../hooks/useTrashBinData';
import { Alert } from '../components/common/Alert';
import { LoadingSpinner } from '../components/common/Loading';

export const Dashboard = () => {
  const { bins, loading, error, lastUpdated, refetch } = useTrashBinData();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-dark-primary">
          Dashboard
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={refetch}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
          >
            새로고침
          </button>
          <div className="text-sm text-gray-500 dark:text-dark-secondary">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {error && (
        <Alert
          type="error"
          message="쓰레기통 데이터를 불러오는데 실패했습니다."
          description={error.message}
        />
      )}

      <div className="grid gap-6">
        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <LoadingSpinner className="w-8 h-8" />
          </div>
        ) : (
          <>
            {/* 차트는 일단 주석 처리
            <CapacityChart data={capacityData} /> */}
            <TrashBinList bins={bins} />
          </>
        )}
      </div>
    </div>
  );
};