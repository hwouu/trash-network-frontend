import React from "react";
import { Card } from "../ui/card";
import { EventData } from "../../types/stats";
import { AlertTriangle, Flame } from "lucide-react";

interface EventTimelineProps {
  events: {
    [deviceId: string]: EventData[];
  };
}

export const EventTimeline = ({ events }: EventTimelineProps) => {
  const allEvents = React.useMemo(() => {
    return Object.values(events)
      .flat()
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      )
      .slice(0, 10); // 최근 10개 이벤트만 표시
  }, [events]);

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">
        최근 이벤트
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
        전체 디바이스에서 발생한 가장 최근의 10개 이벤트를 보여줍니다. 화재
        감지와 용량 초과 이벤트가 포함됩니다.
      </p>
      <div className="space-y-4">
        {allEvents.map((event, index) => (
          <div
            key={`${event.deviceId}-${event.timestamp}-${index}`}
            className="flex items-start gap-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800"
          >
            <div
              className={`p-2 rounded-full ${
                event.type === "flame"
                  ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400"
                  : "bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400"
              }`}
            >
              {event.type === "flame" ? (
                <Flame size={20} />
              ) : (
                <AlertTriangle size={20} />
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {event.type === "flame" ? "화재 감지" : "용량 초과"}
                </h4>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(event.timestamp).toLocaleString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                위치: {event.location}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                디바이스: {event.deviceId}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
