'use client';

import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import { generateUUID } from '@/lib/utils/id';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info' | 'loading';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  onDismiss?: () => void;
}

interface NotificationSystem {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => string;
  removeNotification: (id: string) => void;
  updateNotification: (id: string, updates: Partial<Notification>) => void;
  clearAll: () => void;
}

export function useNotificationSystem(): NotificationSystem {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = generateUUID('notification');
    const newNotification: Notification = {
      id,
      duration: 5000,
      ...notification,
    };

    setNotifications(prev => [...prev, newNotification]);

    // Auto-suppression après la durée spécifiée
    if (newNotification.duration && newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => {
      const notification = prev.find(n => n.id === id);
      if (notification?.onDismiss) {
        notification.onDismiss();
      }
      return prev.filter(n => n.id !== id);
    });
  }, []);

  const updateNotification = useCallback((id: string, updates: Partial<Notification>) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, ...updates } : n)
    );
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
    updateNotification,
    clearAll,
  };
}

// Composant pour afficher les notifications
export function NotificationContainer({ notifications, onRemove }: {
  notifications: Notification[];
  onRemove: (id: string) => void;
}) {
  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          notification={notification}
          onRemove={onRemove}
        />
      ))}
    </div>
  );
}

function NotificationItem({ notification, onRemove }: {
  notification: Notification;
  onRemove: (id: string) => void;
}) {
  const { id, type, title, message, action } = notification;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      case 'loading':
        return '⏳';
      default:
        return '📢';
    }
  };

  const getColors = () => {
    switch (type) {
      case 'success':
        return 'bg-success/10 border-success/20 text-success';
      case 'error':
        return 'bg-error/10 border-error/20 text-error';
      case 'warning':
        return 'bg-warning/10 border-warning/20 text-warning';
      case 'info':
        return 'bg-primary/10 border-primary/20 text-primary';
      case 'loading':
        return 'bg-muted border-border text-muted-foreground';
      default:
        return 'bg-muted border-border text-muted-foreground';
    }
  };

  return (
    <div className={`${getColors()} border rounded-lg shadow-lg p-4 animate-in slide-in-from-right-2 fade-in duration-300`}>
      <div className="flex items-start gap-3">
        <span className="text-lg">{getIcon()}</span>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm">{title}</div>
          {message && (
            <div className="text-sm mt-1 opacity-90">{message}</div>
          )}
          {action && (
            <button
              onClick={() => {
                action.onClick();
                onRemove(id);
              }}
              className="mt-2 text-sm underline hover:no-underline"
            >
              {action.label}
            </button>
          )}
        </div>
        <button
          onClick={() => onRemove(id)}
          className="p-1 hover:bg-background/10 rounded transition-colors"
        >
          ×
        </button>
      </div>
    </div>
  );
}
