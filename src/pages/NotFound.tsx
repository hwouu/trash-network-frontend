// src/pages/NotFound.tsx
import React from 'react';

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-dark-primary">404</h1>
        <p className="mt-2 text-gray-600 dark:text-dark-secondary">Page not found</p>
      </div>
    </div>
  );
};

export default NotFound;