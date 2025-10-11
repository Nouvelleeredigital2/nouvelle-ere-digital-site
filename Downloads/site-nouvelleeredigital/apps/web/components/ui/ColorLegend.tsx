import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Text } from './Text';

type Orientation = 'horizontal' | 'vertical';
type Variant = 'default' | 'compact' | 'detailed';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface ColorLegendProps {
  items: Array<{ id: string; label: string; color: string; shape?: 'circle' | 'square' }>;
  title?: string;
  orientation?: Orientation;
  variant?: Variant;
  interactive?: boolean;
  dataModel?: 'need' | 'module' | 'bundle';
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onToggle?: (id: string) => void;
  onHover?: (id: string) => void;
  className?: string;
}

export const ColorLegend: React.FC<ColorLegendProps> = ({
  items,
  title,
  orientation = 'vertical',
  variant = 'default',
  interactive = false,
  dataModel,
  onSelect,
  onAdd,
  onToggle,
  onHover,
  className,
}) => {
  const [state, setState] = useState<State>('default');

  const handleSelect = (id: string) => {
    if (state === 'disabled' || !interactive) return;
    if (onSelect) onSelect(id);
  };

  const orientations: Record<Orientation, string> = {
    horizontal: 'flex flex-wrap gap-4',
    vertical: 'space-y-2',
  };

  const variants: Record<Variant, string> = {
    default: 'p-4',
    compact: 'p-2',
    detailed: 'p-6',
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
        'bg-[var(--couleur-light)] rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-subtil)]',
        orientations[orientation],
        variants[variant],
        stateClasses[state],
        className
      )}
      role="list"
      aria-label={title || "Légende des couleurs"}
      onMouseEnter={() => setState('hover')}
      onMouseLeave={() => setState('default')}
      onFocus={() => setState('focus')}
      onBlur={() => setState('default')}
    >
      {title && <Text size="lg" className="font-medium mb-2">{title}</Text>}
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            'flex items-center gap-2 cursor-pointer',
            interactive && 'hover:bg-[var(--couleur-light-hover)]'
          )}
          onClick={() => handleSelect(item.id)}
          onMouseEnter={() => onHover?.(item.id)}
          role="listitem"
          aria-label={`${item.label}: ${item.color}`}
        >
          <div
            className={cn(
              'w-4 h-4 border border-gray-300',
              item.shape === 'circle' ? 'rounded-full' : 'rounded',
            )}
            style={{ backgroundColor: item.color }}
          />
          <Text size="base">{item.label}</Text>
        </div>
      ))}
    </div>
  );
};
