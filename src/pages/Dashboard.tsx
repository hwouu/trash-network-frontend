// src/pages/Dashboard.tsx 업데이트
import React from 'react';
import { TrashBinCard } from '../components/dashboard/TrashBinCard';
import { DUMMY_TRASH_BIN } from '../utils/constants';

export const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
      <div className="mt-6">
        <TrashBinCard bin={DUMMY_TRASH_BIN} />
      </div>
    </div>
  );
};