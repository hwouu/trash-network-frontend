import React, { useState, useMemo } from "react";
import { TrashBinCard } from "./TrashBinCard";
import { Search, SortAsc, Filter } from "lucide-react";
import type { TrashBin } from "../../types/trash";
import { TrashBinModal } from "./TrashBinModal";

interface TrashBinListProps {
  bins: TrashBin[];
}

type SortOption = "deviceId" | "capacity" | "location" | "lastUpdated"; // deviceId 추가

export const TrashBinList = ({ bins }: TrashBinListProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("deviceId"); // 기본값을 deviceId로 변경
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
      <div className="flex flex-wrap gap-4 items-center justify-between bg-white dark:bg-dark-card p-4 rounded-lg shadow-sm border dark:border-gray-700">
        {/* Search */}
        <div className="relative flex-grow max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by location or ID..."
            className="pl-10 pr-4 py-2 w-full border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-dark-card text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent placeholder-gray-400 dark:placeholder-gray-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex gap-4">
          {/* Sort Dropdown */}
          <div className="relative">
            <div className="flex items-center">
              <SortAsc className="w-5 h-5 text-gray-500 dark:text-gray-400 mr-2" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="appearance-none bg-white dark:bg-dark-card border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="deviceId">Device ID</option>
                <option value="capacity">Capacity</option>
                <option value="location">Location</option>
                <option value="lastUpdated">Last Updated</option>
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
                <option value="all">All Status</option>
                <option value="normal">Normal</option>
                <option value="warning">Warning</option>
                <option value="full">Full</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Grid of Trash Bin Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
              No trash bins found matching your criteria.
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
