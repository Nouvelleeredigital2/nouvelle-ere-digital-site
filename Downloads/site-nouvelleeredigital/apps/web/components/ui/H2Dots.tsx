import React, { useState } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'default' | 'colored' | 'minimal';
type Size = 'sm' | 'md' | 'lg';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface H2DotsProps {
  dots: Array<{ id: string; label: string; level: number; color?: string }>;
  selectedIds?: string[];
  variant?: Variant;
  size?: Size;
  maxVisible?: number;
  dataModel?: 'need' | 'module' | 'bundle';
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
  onNavigate?: (id: string) => void;
  className?: string;
}

export const H2Dots: React.FC<H2DotsProps> = ({
  dots,
  selectedIds = [],
  variant = 'default',
  size = 'md',
  maxVisible,
  dataModel,
  onSelect,
  onAdd,
  onRemove,
  onNavigate,
  className,
}) => {
  const [state, setState] = useState<State>('default');

  const handleSelect = (id: string) => {
    if (state === 'disabled') return;
    if (onSelect) onSelect(id);
  };

  const sizes: Record<Size, string> = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4',
  };

  const variants: Record<Variant, string> = {
    default: 'bg-[var(--color-primary)]',
    colored: 'bg-gradient-to-r from-blue-500 to-purple-500',
    minimal: 'bg-gray-500',
  };

  const stateClasses: Record<State, string> = {
    default: '',
    hover: 'opacity-75',
    active: 'scale-110',
    focus: 'ring-2 ring-[var(--color-primary)]',
    disabled: 'opacity-50 cursor-not-allowed',
    selected: 'ring-2 ring-yellow-400',
    invalid: 'bg-red-500',
    dragging: 'cursor-grabbing',
  };

  const visibleDots = maxVisible ? dots.slice(0, maxVisible) : dots;

  return (
    <div
      className={cn(
        'flex flex-wrap gap-2 p-4 bg-[var(--couleur-light)] rounded-[var(--border-radius-large)]',
        stateClasses[state],
        className
      )}
      role="list"
      aria-label="Points H2"
      onMouseEnter={() => setState('hover')}
      onMouseLeave={() => setState('default')}
      onFocus={() => setState('focus')}
      onBlur={() => setState('default')}
    >
      {visibleDots.map((dot) => (
        <div
          key={dot.id}
          className={cn(
            'rounded-full cursor-pointer transition-transform',
            sizes[size],
            variants[variant],
            selectedIds.includes(dot.id) && 'ring-2 ring-yellow-400',
            stateClasses[selectedIds.includes(dot.id) ? 'selected' : 'default']
          )}
          style={{ backgroundColor: dot.color || undefined }}
          onClick={() => handleSelect(dot.id)}
          role="listitem"
          aria-level={dot.level}
          aria-label={`Dot ${dot.level}: ${dot.label}`}
        />
      ))}
    </div>
  );
};
