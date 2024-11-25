// src/components/dashboard/TrashBinCard.tsx
import React from 'react';
import { Card } from '@/components/ui/card';
import { Battery, Thermometer, Clock, MapPin } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { TrashBin } from '../../types/trash';
import { CAPACITY_THRESHOLDS, STATUS_COLORS } from '../../utils/constants';

interface TrashBinCardProps {
  bin: TrashBin;
}

export const TrashBinCard = ({ bin }: TrashBinCardProps) => {
  const getStatusColor = () => {
    return STATUS_COLORS[bin.status] || 'bg-gray-500';
  };

  const getCapacityColor = (capacity: number) => {
    if (capacity >= CAPACITY_THRESHOLDS.full) return 'bg-red-500';
    if (capacity >= CAPACITY_THRESHOLDS.warning) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const formatLastUpdated = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
  };

  return (
    <Card className="w-full max-w-sm bg-white dark:bg-dark-card shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Status Indicator */}
      <div className={`h-2 ${getStatusColor()}`} />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-dark-primary">
              Bin #{bin.deviceId}
            </h3>
            <div className="flex items-center text-gray-500 dark:text-dark-secondary mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{bin.location}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Battery className={`w-5 h-5 ${
              bin.batteryLevel < 20 ? 'text-red-500' : 'text-gray-400 dark:text-dark-secondary'
            } mr-1`} />
            <span className={`text-sm ${
              bin.batteryLevel < 20 
                ? 'text-red-500' 
                : 'text-gray-600 dark:text-dark-secondary'
            }`}>
              {bin.batteryLevel}%
            </span>
          </div>
        </div>

        {/* Capacity Indicator */}
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700 dark:text-dark-secondary">
              Capacity
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-dark-secondary">
              {bin.capacity}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-dark-primary rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${getCapacityColor(bin.capacity)} transition-all duration-300`}
              style={{ width: `${bin.capacity}%` }}
            />
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center text-gray-600 dark:text-dark-secondary">
            <Thermometer className="w-4 h-4 mr-1" />
            <span className="text-sm">{bin.temperature}°C</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-dark-secondary">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{formatLastUpdated(bin.lastUpdated)}</span>
          </div>
        </div>

        {/* Warning Message */}
        {bin.status === 'warning' && (
          <div className="mt-4 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900 rounded-md">
            <p className="text-sm text-yellow-700 dark:text-yellow-500">
              Attention needed: Approaching capacity limit
            </p>
          </div>
        )}
        {bin.status === 'full' && (
          <div className="mt-4 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 rounded-md">
            <p className="text-sm text-red-700 dark:text-red-500">
              Action required: Bin is full
            </p>
          </div>
        )}
        {bin.status === 'error' && (
          <div className="mt-4 p-2 bg-gray-50 dark:bg-gray-900/20 border border-gray-200 dark:border-gray-800 rounded-md">
            <p className="text-sm text-gray-700 dark:text-gray-400">
              Error: Unable to fetch bin status
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};