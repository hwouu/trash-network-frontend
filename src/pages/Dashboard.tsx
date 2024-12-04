// src/pages/Dashboard.tsx
import React from "react";
import { TrashBinList } from "../components/dashboard/TrashBinList";
import { useTrashBinData } from "../hooks/useTrashBinData";
import { Alert } from "../components/common/Alert";
import { LoadingSpinner } from "../components/common/Loading";
import { RotateCw } from "lucide-react"; // 아이콘 import 추가

export const Dashboard = () => {
  const { bins, loading, error, lastUpdated, refetch } = useTrashBinData();

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="space-y-4 sm:space-y-0">
        {/* Title and Description */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              실시간으로 캠퍼스 내 쓰레기통의 상태를 모니터링하고 관리할 수
              있습니다.
            </p>
          </div>

          {/* Refresh Button and Last Updated */}
          <div className="flex items-center gap-3 mt-4 sm:mt-0">

          </div>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white dark:bg-dark-card rounded-lg shadow-sm border dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            전체 쓰레기통
          </div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
            {bins.length}
          </div>
        </div>
        <div className="p-4 bg-white dark:bg-dark-card rounded-lg shadow-sm border dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            경고
          </div>
          <div className="text-2xl font-semibold text-yellow-500 mt-1">
            {bins.filter((bin) => bin.status === "warning").length}
          </div>
        </div>
        <div className="p-4 bg-white dark:bg-dark-card rounded-lg shadow-sm border dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">가득 참</div>
          <div className="text-2xl font-semibold text-orange-500 mt-1">
            {bins.filter((bin) => bin.status === "full").length}
          </div>
        </div>
        <div className="p-4 bg-white dark:bg-dark-card rounded-lg shadow-sm border dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            평균 사용량
          </div>
          <div className="text-2xl font-semibold text-gray-900 dark:text-white mt-1">
            {Math.round(
              bins.reduce((acc, bin) => acc + bin.capacity, 0) / bins.length ||
                0
            )}
            %
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
          <TrashBinList bins={bins} />
        )}
      </div>
    </div>
  );
};
