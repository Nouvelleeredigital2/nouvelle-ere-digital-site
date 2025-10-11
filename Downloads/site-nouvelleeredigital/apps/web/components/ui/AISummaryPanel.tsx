import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Text } from './Text';

type Variant = 'default' | 'compact' | 'expanded';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface AISummaryPanelProps {
  summary: string | { title: string; content: string; metadata?: Record<string, any> };
  actions?: Array<{ id: string; label: string; type: 'select' | 'add' }>;
  variant?: Variant;
  isLoading?: boolean;
  maxHeight?: string | number;
  dataModel?: 'need' | 'module' | 'bundle';
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onClose?: () => void;
  onError?: (error: string) => void;
  className?: string;
}

export const AISummaryPanel: React.FC<AISummaryPanelProps> = ({
  summary,
  actions = [],
  variant = 'default',
  isLoading = false,
  maxHeight,
  dataModel,
  onSelect,
  onAdd,
  onClose,
  onError,
  className,
}) => {
  const [state, setState] = useState<State>('default');
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const handleAction = (actionId: string, type: 'select' | 'add') => {
    if (state === 'disabled') return;
    try {
      if (type === 'select' && onSelect) onSelect(actionId);
      if (type === 'add' && onAdd) onAdd(actionId);
    } catch (error) {
      if (onError) onError('Erreur lors de l\'action');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && onClose) {
      onClose();
    }
    if (event.key === 'Enter' && focusedId) {
      const action = actions.find(a => a.id === focusedId);
      if (action) handleAction(action.id, action.type);
    }
  };

  const variants: Record<Variant, string> = {
    default: 'w-full max-w-md',
    compact: 'w-full max-w-sm p-4',
    expanded: 'w-full max-w-lg p-6',
  };

  const stateClasses: Record<State, string> = {
    default: '',
    hover: 'bg-[var(--couleur-light-hover)]',
    active: 'bg-[var(--couleur-light-active)]',
    focus: 'ring-2 ring-[var(--color-primary)]',
    disabled: 'opacity-50 cursor-not-allowed',
    selected: 'border-2 border-[var(--color-primary)]',
    invalid: 'border-2 border-red-500',
    dragging: 'cursor-grabbing',
  };

  return (
    <div
      className={cn(
        'bg-[var(--couleur-light)] rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-subtil)] p-6 transition-all duration-200',
        variants[variant],
        stateClasses[state],
        className
      )}
      style={{ maxHeight: maxHeight ? `${maxHeight}px` : undefined }}
      role="region"
      aria-label="Résumé IA"
      aria-live="polite"
      onMouseEnter={() => setState('hover')}
      onMouseLeave={() => setState('default')}
      onFocus={() => setState('focus')}
      onBlur={() => setState('default')}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {isLoading && <Text className="text-muted">Chargement du résumé...</Text>}
      {!isLoading && (
        <>
          {typeof summary === 'string' ? (
            <Text size="base" className="mb-4">
              {summary}
            </Text>
          ) : (
            <>
              <Text size="lg" className="font-medium mb-2">
                {summary.title}
              </Text>
              <Text size="base" className="mb-4">
                {summary.content}
              </Text>
            </>
          )}
          {actions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {actions.map((action) => (
                <Button
                  key={action.id}
                  size="sm"
                  variant="primary"
                  onClick={() => handleAction(action.id, action.type)}
                  onFocus={() => setFocusedId(action.id)}
                  onBlur={() => setFocusedId(null)}
                  aria-label={`${action.label} (${action.type})`}
                  disabled={state === 'disabled'}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
          {onClose && (
            <Button
              size="sm"
              variant="ghost"
              onClick={onClose}
              className="mt-4"
              aria-label="Fermer le panneau"
            >
              Fermer
            </Button>
          )}
        </>
      )}
    </div>
  );
};
