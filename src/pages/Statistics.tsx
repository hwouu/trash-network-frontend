// src/pages/Statistics.tsx
import React from "react";
import { StatsCard } from "../components/dashboard/StatsCard";
import { Trash2, Percent, Calendar, Clock } from "lucide-react";

// 추후 실제 API 연동 시 사용할 더미 데이터
const DUMMY_STATS = [
  {
    title: "전체 쓰레기통",
    value: "24개",
    change: 4.5,
    trend: "up" as const,
    icon: <Trash2 className="w-6 h-6 text-primary dark:text-primary-400" />,
  },
  {
    title: "평균 용량",
    value: "67%",
    change: -2.1,
    trend: "down" as const,
    icon: <Percent className="w-6 h-6 text-primary dark:text-primary-400" />,
  },
  {
    title: "이번 달 수거 횟수",
    value: "156회",
    change: 12.3,
    trend: "up" as const,
    icon: <Calendar className="w-6 h-6 text-primary dark:text-primary-400" />,
  },
  {
    title: "피크 시간대",
    value: "14:00 - 16:00",
    icon: <Clock className="w-6 h-6 text-primary dark:text-primary-400" />,
  },
];

export const Statistics = () => {
  return (
    <div className="space-y-6">
      <div>
        <div className="space-y-4 sm:space-y-0">
          {/* Title and Description */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Dashboard
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                쓰레기통 사용량과 수거 패턴을 분석하여 효율적인 관리를
                지원합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DUMMY_STATS.map((stat, index) => (
          <StatsCard key={index} summary={stat} />
        ))}
      </div>

      {/* 추후 TimeSeriesChart와 LocationChart가 추가될 영역 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow border dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            시간대별 데이터
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            차트가 이곳에 추가될 예정입니다.
          </p>
        </div>
        <div className="bg-white dark:bg-dark-card p-6 rounded-lg shadow border dark:border-gray-700">
          <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
            위치별 통계
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            차트가 이곳에 추가될 예정입니다.
          </p>
        </div>
      </div>
    </div>
  );
};
