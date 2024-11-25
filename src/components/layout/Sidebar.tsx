// src/components/layout/Sidebar.tsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="h-full w-64 bg-white shadow-md">
      <div className="p-4">
        <div className="space-y-4">
          <Link
            to="/"
            className={`block px-4 py-2 rounded-md ${
              isActive('/') ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/statistics"
            className={`block px-4 py-2 rounded-md ${
              isActive('/statistics') ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Statistics
          </Link>
          <div className="pt-4 border-t">
            <h3 className="px-4 text-sm font-semibold text-gray-400 uppercase">Admin</h3>
            <Link
              to="/admin/bins"
              className={`block px-4 py-2 mt-2 rounded-md ${
                isActive('/admin/bins') ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Manage Bins
            </Link>
            <Link
              to="/admin/schedule"
              className={`block px-4 py-2 rounded-md ${
                isActive('/admin/schedule') ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Schedule
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
