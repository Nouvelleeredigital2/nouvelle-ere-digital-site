import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Text } from './Text';

type Variant = 'default' | 'orbital' | 'minimal';
type Size = 'sm' | 'md' | 'lg';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface OrbitBreadcrumbsProps {
  items: Array<{ id: string; label: string; href?: string; level: number }>;
  currentId?: string;
  variant?: Variant;
  size?: Size;
  animated?: boolean;
  dataModel?: 'need' | 'module' | 'bundle';
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onNavigate?: (id: string) => void;
  onReset?: () => void;
  className?: string;
}

export const OrbitBreadcrumbs: React.FC<OrbitBreadcrumbsProps> = ({
  items,
  currentId,
  variant = 'default',
  size = 'md',
  animated = true,
  dataModel,
  onSelect,
  onAdd,
  onNavigate,
  onReset,
  className,
}) => {
  const [state, setState] = useState<State>('default');

  const handleSelect = (id: string) => {
    if (state === 'disabled') return;
    if (onSelect) onSelect(id);
  };

  const sizes: Record<Size, string> = {
    sm: 'text-sm p-1',
    md: 'text-base p-2',
    lg: 'text-lg p-3',
  };

  const variants: Record<Variant, string> = {
    default: 'flex items-center gap-2',
    orbital: 'flex items-center gap-2 relative',
    minimal: 'flex items-center gap-1',
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
    <nav
      className={cn(
        'bg-[var(--couleur-light)] rounded-[var(--border-radius-large)] p-4',
        variants[variant],
        stateClasses[state],
        className
      )}
      role="navigation"
      aria-label="Fil d'Ariane orbital"
      onMouseEnter={() => setState('hover')}
      onMouseLeave={() => setState('default')}
      onFocus={() => setState('focus')}
      onBlur={() => setState('default')}
    >
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <div
            className={cn(
              'flex items-center gap-1 cursor-pointer transition-transform',
              currentId === item.id && 'font-bold text-[var(--color-primary)]',
              sizes[size],
              animated && 'hover:scale-105'
            )}
            onClick={() => handleSelect(item.id)}
            role="listitem"
            aria-current={currentId === item.id ? 'page' : undefined}
            aria-level={item.level}
          >
            {variant === 'orbital' && (
              <div className="w-4 h-4 bg-[var(--color-primary)] rounded-full animate-spin" />
            )}
            <Text>{item.label}</Text>
          </div>
          {index < items.length - 1 && (
            <Text className="text-muted">/</Text>
          )}
        </React.Fragment>
      ))}
      {onReset && (
        <button onClick={onReset} className="ml-2 text-sm text-[var(--color-primary)] underline">
          Réinitialiser
        </button>
      )}
    </nav>
  );
};
