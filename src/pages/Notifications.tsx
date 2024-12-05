import React, { useEffect, useState } from "react";
import { EventTimeline } from "../components/dashboard/EventTimeline";
import { statsApi } from "../services/api/stats";
import { Card } from "../components/ui/card";
import { subDays, startOfDay, endOfDay } from 'date-fns';

const Notifications = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        // 기본적으로 최근 7일간의 이벤트 데이터를 가져옴
        const endDate = endOfDay(new Date()).toISOString();
        const startDate = startOfDay(subDays(new Date(), 7)).toISOString();

        const response = await statsApi.getEventStats({ 
          startDate,
          endDate
        });
        setEvents(response);
      } catch (err) {
        console.error("Failed to load events:", err);
        setError("이벤트 데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
    const interval = setInterval(loadEvents, 5 * 60 * 1000); // 5분마다 갱신
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
                알림
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                최근 7일간의 쓰레기통 화재 감지 및 용량 초과 이벤트를 확인할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      <EventTimeline events={events} />

      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
    </div>
  );
};

export default Notifications;