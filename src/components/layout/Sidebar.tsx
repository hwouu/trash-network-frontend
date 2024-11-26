import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X } from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="w-64 bg-gray-50 dark:bg-dark-card border-r border-gray-200 dark:border-gray-700 flex-shrink-0 h-full">
      {/* Mobile Close Button */}
      <div className="flex justify-end p-2 lg:hidden">
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
          aria-label="Close menu"
        >
          <X className="h-6 w-6 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      <div className="p-4">
        <div className="space-y-4">
          <Link
            to="/"
            className={`block px-4 py-2 rounded-md transition-colors ${
              isActive('/') 
                ? 'bg-primary text-white' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/statistics"
            className={`block px-4 py-2 rounded-md transition-colors ${
              isActive('/statistics') 
                ? 'bg-primary text-white' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            Statistics
          </Link>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="px-4 text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase">
              Admin
            </h3>
            <Link
              to="/admin/bins"
              className={`block px-4 py-2 mt-2 rounded-md transition-colors ${
                isActive('/admin/bins') 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Manage Bins
            </Link>
            <Link
              to="/admin/schedule"
              className={`block px-4 py-2 rounded-md transition-colors ${
                isActive('/admin/schedule') 
                  ? 'bg-primary text-white' 
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
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