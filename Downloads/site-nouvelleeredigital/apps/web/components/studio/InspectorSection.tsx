'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Info, AlertCircle, CheckCircle, AlertTriangle } from 'lucide-react';

interface InspectorSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  info?: string;
  className?: string;
}

interface InspectorTipProps {
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'success' | 'error';
}

export function InspectorSection({ 
  title, 
  children, 
  defaultOpen = true, 
  info,
  className = ''
}: InspectorSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border border-gray-200 rounded-lg ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-gray-900">{title}</h4>
          {info && (
            <Info className="w-4 h-4 text-gray-400" title={info} />
          )}
        </div>
        {isOpen ? (
          <ChevronDown className="w-4 h-4 text-gray-400" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-400" />
        )}
      </button>
      
      {isOpen && (
        <div className="px-4 pb-4 space-y-4">
          {children}
        </div>
      )}
    </div>
  );
}

export function InspectorTip({ children, type = 'info' }: InspectorTipProps) {
  const getIcon = () => {
    switch (type) {
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  const getTextColor = () => {
    switch (type) {
      case 'warning':
        return 'text-yellow-800';
      case 'success':
        return 'text-green-800';
      case 'error':
        return 'text-red-800';
      default:
        return 'text-blue-800';
    }
  };

  return (
    <div className={`p-3 rounded-lg border ${getBgColor()}`}>
      <div className="flex items-start gap-2">
        {getIcon()}
        <p className={`text-sm ${getTextColor()}`}>
          {children}
        </p>
      </div>
    </div>
  );
}
