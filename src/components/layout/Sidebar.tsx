import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, LayoutDashboard, BarChart3, Bell, Boxes, Calendar } from 'lucide-react';

interface SidebarProps {
  onClose?: () => void;
}

export const Sidebar = ({ onClose }: SidebarProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const mainMenuItems = [
    {
      path: '/',
      name: 'Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      path: '/statistics',
      name: 'Statistics',
      icon: <BarChart3 className="w-5 h-5" />
    },
    {
      path: '/notifications',
      name: 'Notifications',
      icon: <Bell className="w-5 h-5" />
    }
  ];

  const adminMenuItems = [
    {
      path: '/admin/bins',
      name: 'Manage Bins',
      icon: <Boxes className="w-5 h-5" />
    },
    {
      path: '/admin/schedule',
      name: 'Schedule',
      icon: <Calendar className="w-5 h-5" />
    }
  ];

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
          {/* Main Menu Items */}
          {mainMenuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
                isActive(item.path)
                  ? 'bg-primary text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}

          {/* Admin Section */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
            <h3 className="px-4 text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase">
              Admin
            </h3>
            {adminMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-2 mt-2 rounded-md transition-colors ${
                  isActive(item.path)
                    ? 'bg-primary text-white'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};