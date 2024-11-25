import React from 'react';
import { Card } from '@/components/ui/card';
import { Battery, Clock, MapPin, Flame } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { TrashBin } from '../../types/trash';
import { 
  CAPACITY_THRESHOLDS, 
  STATUS_COLORS,
  CAPACITY_COLORS,
  ALERT_COLORS 
} from '../../utils/constants';

interface TrashBinCardProps {
  bin: TrashBin;
}

export const TrashBinCard = ({ bin }: TrashBinCardProps) => {
  const getStatusColor = () => {
    if (bin.flameDetected) return ALERT_COLORS.fire;
    if (bin.status === 'full') return CAPACITY_COLORS.full;
    return STATUS_COLORS[bin.status] || STATUS_COLORS.normal;
  };

  const getCapacityColor = (capacity: number) => {
    if (capacity >= CAPACITY_THRESHOLDS.full) return CAPACITY_COLORS.full;
    if (capacity >= CAPACITY_THRESHOLDS.warning) return CAPACITY_COLORS.warning;
    return CAPACITY_COLORS.low;
  };

  return (
    <Card className="w-full max-w-sm bg-white dark:bg-dark-card border dark:border-gray-700 shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className={`h-2 ${getStatusColor()}`} />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Bin #{bin.deviceId}
            </h3>
            <div className="flex items-center text-gray-500 dark:text-gray-400 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              <span className="text-sm">{bin.location}</span>
            </div>
          </div>
          <div className="flex items-center">
            <Battery className={`w-5 h-5 ${
              bin.batteryLevel < 20 ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'
            } mr-1`} />
            <span className={`text-sm ${
              bin.batteryLevel < 20 
                ? 'text-red-500' 
                : 'text-gray-600 dark:text-gray-400'
            }`}>
              {bin.batteryLevel}%
            </span>
          </div>
        </div>

        {/* Capacity Indicator */}
        <div className="mb-4">
          <div className="flex justify-between mb-1">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Capacity
            </span>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {bin.capacity}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className={`h-2.5 rounded-full ${getCapacityColor(bin.capacity)} transition-all duration-300`}
              style={{ width: `${bin.capacity}%` }}
            />
          </div>
        </div>

        {/* Status and Time */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Flame className={`w-4 h-4 mr-1 ${bin.flameDetected ? 'text-red-500' : 'text-gray-400 dark:text-gray-500'}`} />
            <span className={`text-sm ${bin.flameDetected ? 'text-red-500 dark:text-red-400 font-medium' : ''}`}>
              {bin.flameDetected ? 'Fire Detected!' : 'No Fire'}
            </span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <Clock className="w-4 h-4 mr-1" />
            <span className="text-sm">{formatDistanceToNow(new Date(bin.lastUpdated))} ago</span>
          </div>
        </div>

        {/* Warning Messages */}
        {bin.status === 'warning' && (
          <div className="mt-4 p-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/50 rounded-md">
            <p className="text-sm text-yellow-700 dark:text-yellow-400">
              Attention needed: Approaching capacity limit
            </p>
          </div>
        )}
        {bin.status === 'full' && (
          <div className="mt-4 p-2 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-900/50 rounded-md">
            <p className="text-sm text-orange-700 dark:text-orange-400">
              Action required: Bin is full
            </p>
          </div>
        )}
        {bin.flameDetected && (
          <div className="mt-4 p-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-md">
            <p className="text-sm text-red-700 dark:text-red-400 font-bold">
              EMERGENCY: Fire detected!
            </p>
          </div>
        )}
      </div>
    </Card>
  );
};