import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useExoplanet } from '../context/ExoplanetContext';

const NotificationSystem = () => {
  const { state, actions } = useExoplanet();
  const notifications = state.app.notifications;

  // Auto-remove notifications after their duration
  useEffect(() => {
    notifications.forEach(notification => {
      if (notification.duration) {
        const timer = setTimeout(() => {
          actions.removeNotification(notification.id);
        }, notification.duration);

        return () => clearTimeout(timer);
      }
    });
  }, [notifications, actions]);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return CheckCircle;
      case 'error':
        return AlertCircle;
      case 'warning':
        return AlertTriangle;
      case 'info':
      default:
        return Info;
    }
  };

  const getNotificationColors = (type) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-500/20',
          border: 'border-green-500/50',
          icon: 'text-green-400',
          text: 'text-green-300'
        };
      case 'error':
        return {
          bg: 'bg-red-500/20',
          border: 'border-red-500/50',
          icon: 'text-red-400',
          text: 'text-red-300'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-500/20',
          border: 'border-yellow-500/50',
          icon: 'text-yellow-400',
          text: 'text-yellow-300'
        };
      case 'info':
      default:
        return {
          bg: 'bg-blue-500/20',
          border: 'border-blue-500/50',
          icon: 'text-blue-400',
          text: 'text-blue-300'
        };
    }
  };

  if (notifications.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => {
          const Icon = getNotificationIcon(notification.type);
          const colors = getNotificationColors(notification.type);

          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`${colors.bg} ${colors.border} backdrop-blur-sm border rounded-lg p-4 shadow-lg max-w-sm`}
            >
              <div className="flex items-start space-x-3">
                <Icon className={`w-5 h-5 ${colors.icon} flex-shrink-0 mt-0.5`} />
                
                <div className="flex-1 min-w-0">
                  {notification.title && (
                    <h4 className={`font-medium ${colors.text} mb-1`}>
                      {notification.title}
                    </h4>
                  )}
                  <p className={`text-sm ${colors.text} break-words`}>
                    {notification.message}
                  </p>
                  
                  {notification.timestamp && (
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(notification.timestamp).toLocaleTimeString()}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => actions.removeNotification(notification.id)}
                  className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {notification.action && (
                <div className="mt-3 pt-3 border-t border-gray-600/50">
                  <button
                    onClick={notification.action.callback}
                    className={`text-sm font-medium ${colors.text} hover:underline`}
                  >
                    {notification.action.label}
                  </button>
                </div>
              )}

              {/* Progress bar for timed notifications */}
              {notification.duration && (
                <div className="mt-3">
                  <div className="w-full bg-gray-600/30 rounded-full h-1">
                    <motion.div
                      initial={{ width: '100%' }}
                      animate={{ width: '0%' }}
                      transition={{ duration: notification.duration / 1000, ease: 'linear' }}
                      className={colors.bg.replace('/20', '/50')}
                      style={{ height: '100%', borderRadius: '9999px' }}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default NotificationSystem; 