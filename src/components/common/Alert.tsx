import React from 'react';
import { AlertCircle, CheckCircle, Info, XCircle } from 'lucide-react';

type AlertType = 'success' | 'error' | 'info' | 'warning';

interface AlertProps {
  type: AlertType;
  message: string;
  description?: string;
}

export const Alert = ({ type, message, description }: AlertProps) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-success" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-danger" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-warning" />;
      case 'info':
        return <Info className="w-5 h-5 text-primary" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-success/10 dark:bg-success/20';
      case 'error':
        return 'bg-danger/10 dark:bg-danger/20';
      case 'warning':
        return 'bg-warning/10 dark:bg-warning/20';
      case 'info':
        return 'bg-primary/10 dark:bg-primary/20';
    }
  };

  return (
    <div className={`p-4 rounded-lg ${getBackgroundColor()}`}>
      <div className="flex">
        <div className="flex-shrink-0">{getIcon()}</div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-gray-900 dark:text-dark-primary">
            {message}
          </h3>
          {description && (
            <div className="mt-2 text-sm text-gray-500 dark:text-dark-secondary">
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};