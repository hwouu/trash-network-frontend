import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Bell } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { Logo } from '../common/Logo';

export const Header = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <header className="bg-gray-50 dark:bg-dark-secondary shadow-md border-b border-gray-200 dark:border-gray-700">
      <div className="w-full px-6"> {/* max-w-7xl과 큰 마진/패딩 제거 */}
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Logo />
            <Link to="/" className="ml-2 text-xl font-bold text-primary dark:text-dark-text-primary"> {/* ml-3 → ml-2로 변경 */}
              Trash Network
            </Link>
          </div>
          
          <div className="flex items-center space-x-2"> {/* space-x-4 → space-x-2로 변경 */}
            <button
              className="p-2 text-gray-500 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full"
            >
              <Bell className="h-5 w-5" />
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 text-gray-500 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};