// src/components/layout/Header.tsx 업데이트 - 다크모드 토글 버튼 추가
import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';

export const Header = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <header className="bg-white dark:bg-dark-secondary shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-primary dark:text-primary">
                Trash Network
              </Link>
            </div>
          </div>
          <nav className="flex space-x-8 items-center">
            <Link
              to="/"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 dark:text-dark-primary"
            >
              Dashboard
            </Link>
            <Link
              to="/statistics"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-dark-secondary dark:hover:text-dark-primary"
            >
              Statistics
            </Link>
            <Link
              to="/admin/bins"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-dark-secondary dark:hover:text-dark-primary"
            >
              Manage Bins
            </Link>
            <Link
              to="/settings"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900 dark:text-dark-secondary dark:hover:text-dark-primary"
            >
              Settings
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-primary"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-dark-primary" />
              ) : (
                <Moon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

