import React from 'react';
import { Link } from 'react-router-dom';
import { Moon, Sun, Bell, Menu } from 'lucide-react';
import { useThemeStore } from '../../store/useThemeStore';
import { Logo } from '../common/Logo';

interface HeaderProps {
  onMenuClick: () => void;
}

export const Header = ({ onMenuClick }: HeaderProps) => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <header className="bg-gray-50 dark:bg-dark-secondary shadow-md border-b border-gray-200 dark:border-gray-700 relative z-40">
      <div className="w-full px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-2">
            <button
              onClick={onMenuClick}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-dark-hover rounded-md"
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6 text-gray-500 dark:text-gray-400" />
            </button>
            <Logo />
            <Link to="/" className="ml-2 text-xl font-bold text-primary dark:text-dark-text-primary hidden sm:block">
              Trash Network
            </Link>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              className="p-2 text-gray-500 dark:text-dark-text-secondary hover:bg-gray-100 dark:hover:bg-dark-hover rounded-full"
              aria-label="Notifications"
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
