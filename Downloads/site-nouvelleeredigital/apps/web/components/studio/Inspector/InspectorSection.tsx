'use client';

import React, { useState } from 'react';
import { ChevronDown, Info, HelpCircle } from 'lucide-react';

interface InspectorSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  info?: string;
  className?: string;
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
    <div className={`border border-border rounded-lg overflow-hidden ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-muted hover:bg-muted transition-colors flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <h5 className="text-sm font-semibold text-muted-foreground">{title}</h5>
          {info && (
            <div className="group relative">
              <Info className="w-4 h-4 text-muted-foreground cursor-help" />
              <div className="absolute left-0 top-6 w-64 p-3 bg-muted text-card-foreground text-xs rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                {info}
                <div className="absolute -top-1 left-4 w-2 h-2 bg-muted transform rotate-45"></div>
              </div>
            </div>
          )}
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-muted-foreground0 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </button>
      
      {isOpen && (
        <div className="p-4 space-y-4 bg-card">
          {children}
        </div>
      )}
    </div>
  );
}

// Composant pour les tips/conseils
interface InspectorTipProps {
  children: React.ReactNode;
  type?: 'info' | 'warning' | 'success';
}

export function InspectorTip({ children, type = 'info' }: InspectorTipProps) {
  const styles = {
    info: 'bg-primary/10 border-primary/20 text-primary',
    warning: 'bg-orange-50 border-orange-200 text-orange-700',
    success: 'bg-success/10 border-success/20 text-success',
  };

  const icons = {
    info: <HelpCircle className="w-4 h-4 flex-shrink-0" />,
    warning: <Info className="w-4 h-4 flex-shrink-0" />,
    success: <Info className="w-4 h-4 flex-shrink-0" />,
  };

  return (
    <div className={`flex items-start gap-2 p-3 border rounded-lg ${styles[type]}`}>
      {icons[type]}
      <p className="text-xs leading-relaxed">{children}</p>
    </div>
  );
}

// Composant pour prévisualisation inline
interface InspectorPreviewProps {
  children: React.ReactNode;
  label?: string;
}

export function InspectorPreview({ children, label }: InspectorPreviewProps) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      {label && (
        <div className="px-3 py-2 bg-muted border-b border-border">
          <p className="text-xs font-medium text-muted-foreground">{label}</p>
        </div>
      )}
      <div className="p-3 bg-card">
        {children}
      </div>
    </div>
  );
}
