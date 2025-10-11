import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './Badge';

type Variant = 'default' | 'numbered' | 'iconic';
type Size = 'sm' | 'md' | 'lg';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface H2StepsProps {
  steps: Array<{ id: string; label: string; description?: string; level: number; status: 'pending' | 'active' | 'completed' }>;
  selectedIds?: string[];
  variant?: Variant;
  size?: Size;
  maxVisible?: number;
  dataModel?: 'need' | 'module' | 'bundle';
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
  onNext?: (id: string) => void;
  className?: string;
}

export const H2Steps: React.FC<H2StepsProps> = ({
  steps,
  selectedIds = [],
  variant = 'default',
  size = 'md',
  maxVisible,
  dataModel,
  onSelect,
  onAdd,
  onRemove,
  onNext,
  className,
}) => {
  const [state, setState] = useState<State>('default');

  const handleSelect = (id: string) => {
    if (state === 'disabled') return;
    if (onSelect) onSelect(id);
  };

  const sizes: Record<Size, string> = {
    sm: 'text-sm p-2',
    md: 'text-base p-3',
    lg: 'text-lg p-4',
  };

  const variants: Record<Variant, string> = {
    default: 'flex flex-col gap-2',
    numbered: 'flex flex-col gap-2',
    iconic: 'flex flex-col gap-2',
  };

  const stateClasses: Record<State, string> = {
    default: '',
    hover: 'opacity-75',
    active: 'scale-105',
    focus: 'ring-2 ring-[var(--color-primary)]',
    disabled: 'opacity-50 cursor-not-allowed',
    selected: 'border-2 border-[var(--color-primary)]',
    invalid: 'border-2 border-red-500',
    dragging: 'cursor-grabbing',
  };

  const visibleSteps = maxVisible ? steps.slice(0, maxVisible) : steps;

  return (
    <div
      className={cn(
        'p-4 bg-[var(--couleur-light)] rounded-[var(--border-radius-large)]',
        variants[variant],
        stateClasses[state],
        className
      )}
      role="list"
      aria-label="Étapes H2"
      onMouseEnter={() => setState('hover')}
      onMouseLeave={() => setState('default')}
      onFocus={() => setState('focus')}
      onBlur={() => setState('default')}
    >
      {visibleSteps.map((step, index) => (
        <div
          key={step.id}
          className={cn(
            'flex items-center gap-2 cursor-pointer transition-transform',
            selectedIds.includes(step.id) && 'ring-2 ring-yellow-400',
            sizes[size]
          )}
          onClick={() => handleSelect(step.id)}
          role="listitem"
          aria-level={step.level}
          aria-label={`Étape ${index + 1} (H${step.level}): ${step.label}`}
        >
          <div className={cn(
            'w-6 h-6 rounded-full flex items-center justify-center text-white text-sm',
            step.status === 'completed' ? 'bg-green-500' : step.status === 'active' ? 'bg-blue-500' : 'bg-gray-500'
          )}>
            {variant === 'numbered' ? index + 1 : step.status === 'completed' ? '✓' : step.status === 'active' ? '●' : '○'}
          </div>
          <div>
            <div className="font-medium">{step.label}</div>
            {step.description && <div className="text-sm text-muted">{step.description}</div>}
          </div>
        </div>
      ))}
    </div>
  );
};
