import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Text } from './Text';

type Variant = 'chart' | 'list' | 'grid';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface AnalyticsTrackerProps {
  data: Array<{ id: string; label: string; value: number; type?: string }>;
  title?: string;
  filters?: Array<{ id: string; label: string; options: string[] }>;
  variant?: Variant;
  isLoading?: boolean;
  maxItems?: number;
  dataModel?: 'need' | 'module' | 'bundle';
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onFilter?: (filterId: string, value: string) => void;
  onExport?: (data: any) => void;
  className?: string;
}

export const AnalyticsTracker: React.FC<AnalyticsTrackerProps> = ({
  data,
  title,
  filters = [],
  variant = 'list',
  isLoading = false,
  maxItems,
  dataModel,
  onSelect,
  onAdd,
  onFilter,
  onExport,
  className,
}) => {
  const [state, setState] = useState<State>('default');
  const [focusedId, setFocusedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    if (state === 'disabled') return;
    if (onSelect) onSelect(id);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') setState('default');
    if (event.key === 'Enter' && focusedId) handleSelect(focusedId);
  };

  const variants: Record<Variant, string> = {
    chart: 'flex flex-col items-center',
    list: 'space-y-2',
    grid: 'grid grid-cols-2 gap-4',
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
        'bg-[var(--couleur-light)] rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-subtil)] p-6',
        variants[variant],
        stateClasses[state],
        className
      )}
      role="region"
      aria-label={title || "Tracker d'analytics"}
      aria-live="polite"
      onMouseEnter={() => setState('hover')}
      onMouseLeave={() => setState('default')}
      onFocus={() => setState('focus')}
      onBlur={() => setState('default')}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {isLoading && <Text className="text-muted">Chargement des données...</Text>}
      {!isLoading && (
        <>
          {title && <Text size="lg" className="font-medium mb-4">{title}</Text>}
          {filters.length > 0 && (
            <div className="mb-4">
              {filters.map((filter) => (
                <Button key={filter.id} size="sm" onClick={() => onFilter?.(filter.id, filter.options[0])}>
                  {filter.label}
                </Button>
              ))}
            </div>
          )}
          <div className={variants[variant]}>
            {data.slice(0, maxItems).map((item) => (
              <div
                key={item.id}
                className="p-2 border rounded cursor-pointer"
                onClick={() => handleSelect(item.id)}
                onFocus={() => setFocusedId(item.id)}
                onBlur={() => setFocusedId(null)}
                aria-label={`${item.label}: ${item.value}`}
              >
                <Text>{item.label}: {item.value}</Text>
              </div>
            ))}
          </div>
          {onExport && (
            <Button size="sm" variant="primary" onClick={() => onExport(data)}>
              Exporter
            </Button>
          )}
        </>
      )}
    </div>
  );
};
