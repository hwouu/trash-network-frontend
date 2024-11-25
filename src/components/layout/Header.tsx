// src/components/layout/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl font-bold text-primary">
                Trash Network
              </Link>
            </div>
          </div>
          <nav className="flex space-x-8">
            <Link
              to="/"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
            >
              Dashboard
            </Link>
            <Link
              to="/statistics"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              Statistics
            </Link>
            <Link
              to="/admin/bins"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              Manage Bins
            </Link>
            <Link
              to="/settings"
              className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-500 hover:text-gray-900"
            >
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};
