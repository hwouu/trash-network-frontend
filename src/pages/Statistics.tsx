import React, { useEffect, useState } from "react";
import { StatsCard } from "../components/dashboard/StatsCard";
import { TimeSeriesChart } from "../components/dashboard/TimeSeriesChart";
import { LocationChart } from "../components/dashboard/LocationChart";
import { EventTimeline } from "../components/dashboard/EventTimeline";
import { statsApi } from "../services/api/stats";
import { Trash2, Percent, AlertTriangle, Flame } from "lucide-react";
import { StatisticsResponse, StatsSummary } from "../types/stats";
import { Card } from "../components/ui/card";

const Statistics = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<StatisticsResponse>({});
  const [error, setError] = useState<string | null>(null);

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
        const dashboardStats = await statsApi.getDashboardStats();
        console.log("Loaded dashboard stats:", dashboardStats); // 디버깅용
        setStats(dashboardStats);
      } catch (err) {
        console.error("Failed to load statistics:", err);
        setError("통계 데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadStats();
    const interval = setInterval(loadStats, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <Card className="p-6">
        <div className="text-center text-red-500 dark:text-red-400">
          {error}
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                통계
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                누적 쓰레기통 사용량과 경고, 이벤트 통계를 확인할 수 있습니다.
              </p>
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
        <TimeSeriesChart data={stats.hourly_stats || {}} />
        <LocationChart data={stats.location_stats || {}} />
      </div>

      {/* 이벤트 타임라인 섹션 */}
      <div className="grid grid-cols-1 gap-6">
        <EventTimeline events={stats.events || {}} />
      </div>

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
