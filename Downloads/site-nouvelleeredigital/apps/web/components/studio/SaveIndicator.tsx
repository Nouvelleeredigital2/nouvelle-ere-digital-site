'use client';

import React from 'react';
import { Check, Loader2, AlertCircle, Clock } from 'lucide-react';

interface SaveIndicatorProps {
  isSaving: boolean;
  hasUnsavedChanges: boolean;
  lastSaved: Date | null;
  className?: string;
}

export function SaveIndicator({ 
  isSaving, 
  hasUnsavedChanges, 
  lastSaved,
  className = '' 
}: SaveIndicatorProps) {
  const formatLastSaved = (date: Date | null) => {
    if (!date) return 'Jamais enregistré';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 5) return 'À l\'instant';
    if (seconds < 60) return `Il y a ${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `Il y a ${minutes}min`;
    const hours = Math.floor(minutes / 60);
    return `Il y a ${hours}h`;
  };

  if (isSaving) {
    return (
      <div className={`flex items-center gap-2 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-lg ${className}`}>
        <Loader2 className="w-4 h-4 text-primary animate-spin" />
        <span className="text-sm font-medium text-primary">
          Enregistrement...
        </span>
      </div>
    );
  }

  if (hasUnsavedChanges) {
    return (
      <div className={`flex items-center gap-2 px-3 py-1.5 bg-orange-50 border border-orange-200 rounded-lg ${className}`}>
        <AlertCircle className="w-4 h-4 text-orange-600" />
        <span className="text-sm font-medium text-orange-700">
          Modifications non enregistrées
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 bg-success/10 border border-success/20 rounded-lg ${className}`}>
      <Check className="w-4 h-4 text-success" />
      <div className="flex items-center gap-1.5 text-sm font-medium text-success">
        <span>Enregistré</span>
        <span className="text-success/70">•</span>
        <span className="text-success/70 font-normal flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {formatLastSaved(lastSaved)}
        </span>
      </div>
    </div>
  );
}

// Composant minimaliste pour affichage compact
export function SaveIndicatorCompact({ 
  isSaving, 
  hasUnsavedChanges, 
  lastSaved,
  className = '' 
}: SaveIndicatorProps) {
  const formatLastSaved = (date: Date | null) => {
    if (!date) return 'Jamais';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 5) return 'À l\'instant';
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}min`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h`;
  };

  return (
    <div className={`flex items-center gap-2 text-xs ${className}`}>
      {isSaving ? (
        <>
          <Loader2 className="w-3 h-3 text-indigo-600 animate-spin" />
          <span className="text-indigo-600 font-medium">Enregistrement...</span>
        </>
      ) : hasUnsavedChanges ? (
        <>
          <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
          <span className="text-orange-600 font-medium">Non enregistré</span>
        </>
      ) : (
        <>
          <div className="w-2 h-2 bg-success rounded-full" />
          <span className="text-muted-foreground">
            Enregistré <span className="text-muted-foreground">• {formatLastSaved(lastSaved)}</span>
          </span>
        </>
      )}
    </div>
  );
}
