'use client';

import React from 'react';
import { useHistory } from '@/hooks/useHistory';
import { Button } from '@/components/ui/Button';
import { Undo2, Redo2, Save, RefreshCw } from 'lucide-react';

interface GlobalToolbarProps {
  onSave?: () => void;
  onRefresh?: () => void;
  isSaving?: boolean;
  hasUnsavedChanges?: boolean;
  className?: string;
}

export function GlobalToolbar({ 
  onSave, 
  onRefresh, 
  isSaving = false, 
  hasUnsavedChanges = false,
  className = ''
}: GlobalToolbarProps) {
  const { undo, redo, canUndo, canRedo } = useHistory();

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {/* Contrôles Undo/Redo */}
      <div className="flex items-center space-x-1 border-r border-gray-200 pr-2">
        <Button
          variant="outline"
          size="sm"
          onClick={undo}
          disabled={!canUndo}
          title="Annuler (Ctrl+Z)"
          className="h-8 w-8 p-0"
        >
          <Undo2 className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={redo}
          disabled={!canRedo}
          title="Rétablir (Ctrl+Shift+Z)"
          className="h-8 w-8 p-0"
        >
          <Redo2 className="w-4 h-4" />
        </Button>
      </div>

      {/* Actions globales */}
      {onRefresh && (
        <Button
          variant="outline"
          size="sm"
          onClick={onRefresh}
          title="Actualiser"
          className="h-8 w-8 p-0"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      )}

      {onSave && (
        <Button
          size="sm"
          onClick={onSave}
          disabled={isSaving || !hasUnsavedChanges}
          className="h-8 bg-blue-600 hover:bg-blue-700 text-white"
          title={hasUnsavedChanges ? "Sauvegarder les modifications" : "Aucune modification à sauvegarder"}
        >
          <Save className="w-4 h-4 mr-1" />
          {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
        </Button>
      )}
    </div>
  );
}
