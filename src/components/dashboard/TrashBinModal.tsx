import React from "react";
import { X, Battery, Flame, Calendar } from "lucide-react";
import { TrashBin } from "../../types/trash";
import { formatDistanceToNow, format } from "date-fns";
import { useThemeStore } from "../../store/useThemeStore";

// 이미지 import
import campusMapScienceLight from "../../assets/images/campus-map-science-light.png";
import campusMapScienceDark from "../../assets/images/campus-map-science-dark.png";
import campusMapLectureLight from "../../assets/images/campus-map-lecture-light.png";
import campusMapLectureDark from "../../assets/images/campus-map-lecture-dark.png";
import campusMapStudentLight from "../../assets/images/campus-map-student-light.png";
import campusMapStudentDark from "../../assets/images/campus-map-student-dark.png";

interface TrashBinModalProps {
  bin: TrashBin;
  onClose: () => void;
}

export const TrashBinModal = ({ bin, onClose }: TrashBinModalProps) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "full":
        return "text-orange-500";
      case "warning":
        return "text-yellow-500";
      case "error":
        return "text-red-500";
      default:
        return "text-green-500";
    }
  };

  const getMapImage = () => {
    switch (bin.deviceId) {
      case "ThrashModule1":
        return isDarkMode ? campusMapScienceDark : campusMapScienceLight;
      case "ThrashModule2":
        return isDarkMode ? campusMapLectureDark : campusMapLectureLight;
      case "ThrashModule3":
        return isDarkMode ? campusMapStudentDark : campusMapStudentLight;
      default:
        return isDarkMode ? campusMapScienceDark : campusMapScienceLight;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-dark-card w-full max-w-5xl rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            쓰레기통 상세 정보
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Info */}
            <div className="space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  기본 정보
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <span className="text-gray-500 dark:text-gray-400 w-24">
                      Device ID:
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {bin.deviceId}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 dark:text-gray-400 w-24">
                      위치:
                    </span>
                    <span className="text-gray-900 dark:text-white font-medium">
                      {bin.location}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-500 dark:text-gray-400 w-24">
                      상태:
                    </span>
                    <span className={`font-medium ${getStatusColor(bin.status)}`}>
                      {bin.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Info */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  현재 상태
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                      <Battery className="w-4 h-4" />
                      배터리
                    </div>
                    <div className="text-xl font-semibold text-gray-900 dark:text-white">
                      {bin.batteryLevel}%
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-1">
                      <Flame className="w-4 h-4" />
                      화재 감지
                    </div>
                    <div
                      className={`text-xl font-semibold ${
                        bin.flameDetected ? "text-red-500" : "text-green-500"
                      }`}
                    >
                      {bin.flameDetected ? "감지됨" : "정상"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Update History */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  업데이트 정보
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="text-gray-500 dark:text-gray-400">
                      마지막 업데이트:
                    </span>
                    <span className="ml-2 text-gray-900 dark:text-white">
                      {format(new Date(bin.lastUpdated), "yyyy-MM-dd HH:mm:ss")}{" "}
                      ({formatDistanceToNow(new Date(bin.lastUpdated))} ago)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Map */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                위치
              </h3>
              <div className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                <img 
                  src={getMapImage()} 
                  alt={`${bin.location} 위치`} 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 text-center">
                {bin.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};