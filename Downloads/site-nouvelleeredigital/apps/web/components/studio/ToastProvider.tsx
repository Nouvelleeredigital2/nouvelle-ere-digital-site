'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { generateUUID } from '@/lib/utils/id';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  success: (title: string, message?: string, action?: Toast['action']) => void;
  error: (title: string, message?: string, action?: Toast['action']) => void;
  warning: (title: string, message?: string, action?: Toast['action']) => void;
  info: (title: string, message?: string, action?: Toast['action']) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = useCallback((toastData: Omit<Toast, 'id'>) => {
    const id = generateUUID('toast');
    
    const toast: Toast = {
      id,
      duration: 5000, // 5 secondes par défaut
      ...toastData,
    };

    setToasts(prev => [...prev, toast]);

    // Auto-suppression après la durée spécifiée
    if (toast.duration && toast.duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration);
    }
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  const success = useCallback((title: string, message?: string, action?: Toast['action']) => {
    addToast({ type: 'success', title, message, action });
  }, [addToast]);

  const error = useCallback((title: string, message?: string, action?: Toast['action']) => {
    addToast({ type: 'error', title, message, action, duration: 8000 });
  }, [addToast]);

  const warning = useCallback((title: string, message?: string, action?: Toast['action']) => {
    addToast({ type: 'warning', title, message, action, duration: 6000 });
  }, [addToast]);

  const info = useCallback((title: string, message?: string, action?: Toast['action']) => {
    addToast({ type: 'info', title, message, action });
  }, [addToast]);

  return (
    <ToastContext.Provider value={{
      toasts,
      addToast,
      removeToast,
      success,
      error,
      warning,
      info,
    }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// Composant conteneur pour les toasts
function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
}

// Composant individuel pour chaque toast
function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const colors = {
    success: 'bg-success/10 border-success/20 text-success',
    error: 'bg-error/10 border-error/20 text-error',
    warning: 'bg-warning/10 border-warning/20 text-warning',
    info: 'bg-primary/10 border-primary/20 text-primary',
  };

  const Icon = icons[toast.type];

  return (
    <div className={`${colors[toast.type]} border rounded-lg shadow-lg p-4 pr-10 relative animate-in slide-in-from-right-2 fade-in duration-300`}>
      {/* Bouton de fermeture */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 p-1 hover:bg-background/10 rounded transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Contenu du toast */}
      <div className="flex items-start gap-3">
        <Icon className="w-5 h-5 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm">{toast.title}</div>
          {toast.message && (
            <div className="text-sm mt-1 opacity-90">{toast.message}</div>
          )}
          {toast.action && (
            <button
              onClick={() => {
                toast.action?.onClick();
                onClose();
              }}
              className="mt-2 text-sm underline hover:no-underline"
            >
              {toast.action.label}
            </button>
          )}
        </div>
      </div>

      {/* Barre de progression pour les toasts avec durée */}
      {toast.duration && toast.duration > 0 && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-background/10 rounded-b-lg overflow-hidden">
          <div
            className="h-full bg-current opacity-30 transition-all duration-100 ease-linear"
            style={{
              animation: `shrink ${toast.duration}ms linear`,
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}
