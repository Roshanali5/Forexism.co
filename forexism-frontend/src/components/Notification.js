import React from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const Notification = ({ notification, setNotification }) => {
  if (!notification.show) return null;

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return <CheckCircle className="h-5 w-5" />;
      case 'error':
        return <AlertCircle className="h-5 w-5" />;
      case 'info':
        return <Info className="h-5 w-5" />;
      default:
        return <CheckCircle className="h-5 w-5" />;
    }
  };

  const getBackgroundColor = () => {
    switch (notification.type) {
      case 'success':
        return 'bg-green-600';
      case 'error':
        return 'bg-red-600';
      case 'info':
        return 'bg-blue-600';
      default:
        return 'bg-green-600';
    }
  };

  return (
    <div className="fixed top-20 right-4 z-50 animate-slide-in max-w-md">
      <div className={`${getBackgroundColor()} px-6 py-4 rounded-lg shadow-2xl flex items-center justify-between space-x-3 text-white`}>
        <div className="flex items-center space-x-3">
          {getIcon()}
          <span className="font-medium">{notification.message}</span>
        </div>
        <button
          onClick={() => setNotification({ show: false, message: '', type: '' })}
          className="hover:bg-white/20 p-1 rounded transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Notification;