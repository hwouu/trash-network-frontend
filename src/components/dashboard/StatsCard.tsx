import React from "react";
import { Card } from "../../components/ui/card";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { StatsSummary } from "../../types/stats";
import { LoadingSpinner } from "../common/Loading";

interface StatsCardProps {
  summary: StatsSummary;
  loading?: boolean;
}

export const StatsCard = ({ summary, loading = false }: StatsCardProps) => {
  const getTrendIcon = () => {
    if (!summary.trend || summary.trend === "neutral") return null;

    const commonClasses = "w-5 h-5 ml-1";
    const colorClass =
      summary.trend === "up"
        ? "text-success dark:text-green-400"
        : "text-danger dark:text-red-400";

    return summary.trend === "up" ? (
      <ArrowUpIcon className={`${commonClasses} ${colorClass}`} />
    ) : (
      <ArrowDownIcon className={`${commonClasses} ${colorClass}`} />
    );
  };

  const getTrendColor = () => {
    if (!summary.trend || summary.trend === "neutral")
      return "text-gray-500 dark:text-gray-400";
    return summary.trend === "up"
      ? "text-success dark:text-green-400"
      : "text-danger dark:text-red-400";
  };

  return (
    <Card className="p-6 bg-white dark:bg-dark-card border dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {summary.title}
          </p>
          <div className="flex items-center mt-2">
            {loading ? (
              <LoadingSpinner className="w-6 h-6" />
            ) : (
              <>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {summary.value}
                </h3>
                {summary.change && (
                  <div className="flex items-center ml-3">
                    <span className={`text-sm font-medium ${getTrendColor()}`}>
                      {summary.change > 0 ? "+" : ""}
                      {summary.change}%
                    </span>
                    {getTrendIcon()}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {summary.icon && (
          <div className="p-3 rounded-full bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-400">
            {summary.icon}
          </div>
        )}
      </div>
    </Card>
  );
};
