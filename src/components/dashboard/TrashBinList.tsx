import React, { useState, useMemo } from "react";
import { TrashBinCard } from "./TrashBinCard";
import { Search, SortAsc, Filter } from "lucide-react";
import type { TrashBin } from "../../types/trash";
import { TrashBinModal } from "./TrashBinModal";

interface TrashBinListProps {
  bins: TrashBin[];
}

type SortOption = "deviceId" | "capacity" | "location" | "lastUpdated";

export const TrashBinList = ({ bins }: TrashBinListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("deviceId");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedBin, setSelectedBin] = useState<TrashBin | null>(null);

  const filteredAndSortedBins = useMemo(() => {
    return bins
      .filter((bin) => {
        const matchesSearch =
          bin.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bin.deviceId.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus =
          statusFilter === "all" || bin.status === statusFilter;
        return matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "deviceId":
            return a.deviceId.localeCompare(b.deviceId);
          case "capacity":
            return b.capacity - a.capacity;
          case "location":
            return a.location.localeCompare(b.location);
          case "lastUpdated":
            return (
              new Date(b.lastUpdated).getTime() -
              new Date(a.lastUpdated).getTime()
            );
          default:
            return 0;
        }
      });
  }, [bins, searchQuery, sortBy, statusFilter]);

  return (
    <div className="space-y-6">
      {/* Controls Section */}
      <div className="flex flex-wrap sm:flex-nowrap gap-4 items-center justify-between bg-white dark:bg-dark-card p-4 rounded-lg shadow-sm border dark:border-gray-700">
        {/* Search */}
        <div className="w-full sm:max-w-md relative flex-grow">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5 pointer-events-none" />
            <input
              type="text"
              placeholder="장소 또는 디바이스 ID로 검색"
              className="pl-10 pr-4 py-2 w-full border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filters */}
        <div className="w-full sm:w-auto flex flex-wrap sm:flex-nowrap gap-4 justify-start sm:justify-end">
          {/* Sort Dropdown */}
          <div className="relative">
            <div className="flex items-center">
              <SortAsc className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="deviceId">디바이스 ID</option>
                <option value="capacity">용량</option>
                <option value="location">위치</option>
                <option value="lastUpdated">마지막 업데이트</option>
              </select>
            </div>
          </div>

          {/* Status Filter */}
          <div className="relative">
            <div className="flex items-center">
              <Filter className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="appearance-none bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="all">모든 상태</option>
                <option value="normal">보통</option>
                <option value="warning">경고</option>
                <option value="full">가득 참</option>
                <option value="error">에러</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Trash Bin Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredAndSortedBins.length > 0 ? (
          filteredAndSortedBins.map((bin) => (
            <TrashBinCard
              key={bin.deviceId}
              bin={bin}
              onClick={() => setSelectedBin(bin)}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-8 bg-white rounded-lg">
            <p className="text-gray-500">
              조건과 일치하는 쓰레기통을 찾을 수 없습니다
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedBin && (
        <TrashBinModal bin={selectedBin} onClose={() => setSelectedBin(null)} />
      )}
    </div>
  );
};
