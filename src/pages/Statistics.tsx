import React, { useEffect, useState } from "react";
import { StatsCard } from "../components/dashboard/StatsCard";
import { TimeSeriesChart } from "../components/dashboard/TimeSeriesChart";
import { LocationChart } from "../components/dashboard/LocationChart";
import { statsApi } from "../services/api/stats";
import { Trash2, Percent, AlertTriangle, Flame } from "lucide-react";
import { StatisticsResponse, StatsSummary } from "../types/stats";
import { subDays, subMonths, startOfDay, endOfDay, format } from "date-fns";

type PeriodFilter = "today" | "yesterday" | "week" | "month";

const Statistics = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatisticsResponse>({});
  const [error, setError] = useState<string | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodFilter>("today");

  const getDateRange = (period: PeriodFilter) => {
    const now = new Date();
    switch (period) {
      case "today":
        return {
          start: startOfDay(now).toISOString(),
          end: endOfDay(now).toISOString(),
        };
      case "yesterday":
        return {
          start: startOfDay(subDays(now, 1)).toISOString(),
          end: endOfDay(subDays(now, 1)).toISOString(),
        };
      case "week":
        return {
          start: startOfDay(subDays(now, 7)).toISOString(),
          end: endOfDay(now).toISOString(),
        };
      case "month":
        return {
          start: startOfDay(subMonths(now, 1)).toISOString(),
          end: endOfDay(now).toISOString(),
        };
    }
  };

  const getPeriodLabel = (period: PeriodFilter): string => {
    const range = getDateRange(period);
    return `${format(new Date(range.start), "yyyy-MM-dd")} ~ ${format(
      new Date(range.end),
      "yyyy-MM-dd"
    )}`;
  };

  // 요약 통계 계산
  const calculateSummaries = (): StatsSummary[] => {
    if (!stats.summary) return [];

    const totalAlerts = Object.values(stats.summary).reduce(
      (sum, device) => sum + device.total_alerts,
      0
    );

    const totalFlames = Object.values(stats.summary).reduce(
      (sum, device) => sum + device.total_flame_detections,
      0
    );

    const avgCapacity =
      Object.values(stats.summary).reduce(
        (sum, device) => sum + device.avg_capacity,
        0
      ) / Object.keys(stats.summary).length;

    return [
      {
        title: "평균 용량",
        value: `${avgCapacity.toFixed(1)}%`,
        icon: (
          <Percent className="w-6 h-6 text-primary dark:text-primary-400" />
        ),
      },
      {
        title: "용량 경고",
        value: totalAlerts,
        icon: (
          <AlertTriangle className="w-6 h-6 text-primary dark:text-primary-400" />
        ),
      },
      {
        title: "화재 감지",
        value: totalFlames,
        icon: <Flame className="w-6 h-6 text-primary dark:text-primary-400" />,
      },
      {
        title: "모니터링 중인 쓰레기통",
        value: Object.keys(stats.summary).length,
        icon: <Trash2 className="w-6 h-6 text-primary dark:text-primary-400" />,
      },
    ];
  };

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const { start, end } = getDateRange(selectedPeriod);
        const dashboardStats = await statsApi.getDashboardStats(start, end);
        setStats(dashboardStats);
      } catch (err) {
        console.error("Failed to load statistics:", err);
        setError("통계 데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
    const interval = setInterval(loadStats, 5 * 60 * 1000); // 5분마다 갱신
    return () => clearInterval(interval);
  }, [selectedPeriod]);

  const periodButtons: { label: string; value: PeriodFilter }[] = [
    { label: "오늘", value: "today" },
    { label: "어제", value: "yesterday" },
    { label: "일주일", value: "week" },
    { label: "한달", value: "month" },
  ];

  if (error) {
    return (
      <div className="p-6 bg-white dark:bg-gray-800/50 border dark:border-gray-700 rounded-lg">
        <div className="text-center text-red-500 dark:text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="space-y-4">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                통계
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 whitespace-normal">
                쓰레기통의 실시간 상태와 통계 데이터를 확인할 수 있습니다. 
                용량 변화 추이, 경고 및 화재 감지 이벤트를 시각적으로 모니터링하며,
                위치별 통계를 통해 각 구역의 현황을 파악할 수 있습니다.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {periodButtons.map(({ label, value }) => (
                <button
                  key={value}
                  onClick={() => setSelectedPeriod(value)}
                  className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                    selectedPeriod === value
                      ? "bg-primary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 요약 카드 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {calculateSummaries().map((stat, index) => (
          <StatsCard key={index} summary={stat} loading={loading} />
        ))}
      </div>

      {/* 차트 섹션 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TimeSeriesChart
          data={stats.hourly_stats?.data || {}}
          period={getDateRange(selectedPeriod)}
        />
        <LocationChart
          data={stats.location_stats?.data || {}}
          period={getDateRange(selectedPeriod)}
        />
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
};

export default Statistics;