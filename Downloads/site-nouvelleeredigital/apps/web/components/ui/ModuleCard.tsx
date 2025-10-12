"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Text } from './Text';

type Variant = 'default' | 'compact' | 'detailed';
type Size = 'sm' | 'md' | 'lg';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface ModuleCardProps {
  module: { id: string; title: string; description: string; status: 'active' | 'inactive' };
  actions?: Array<{ id: string; label: string; type: 'button' | 'link' }>;
  variant?: Variant;
  size?: Size;
  dataModel?: 'need' | 'module' | 'bundle';
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  className?: string;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  module,
  actions = [],
  variant = 'default',
  size = 'md',
  dataModel,
  onSelect,
  onAdd,
  onEdit,
  onDelete,
  className,
}) => {
  const [state, setState] = useState<State>('default');

  const sizes: Record<Size, string> = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };

  const variants: Record<Variant, string> = {
    default: 'w-full max-w-sm',
    compact: 'w-full max-w-xs',
    detailed: 'w-full max-w-md',
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
        sizes[size],
        variants[variant],
        stateClasses[state],
        className
      )}
      role="article"
      aria-label={`Module: ${module.title}`}
      onMouseEnter={() => setState('hover')}
      onMouseLeave={() => setState('default')}
      onFocus={() => setState('focus')}
      onBlur={() => setState('default')}
      onClick={() => onSelect?.(module.id)}
    >
      <Text size="lg" className="font-medium mb-2">{module.title}</Text>
      <Text size="base" className="mb-4">{module.description}</Text>
      <div className="mb-4">
        <span className={cn(
          'px-2 py-1 rounded text-sm',
          module.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
        )}>
          {module.status}
        </span>
      </div>
      {actions.length > 0 && (
        <div className="flex gap-2">
          {actions.map((action) => (
            <Button key={action.id} size="sm" onClick={() => onAdd?.(action.id)}>
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
