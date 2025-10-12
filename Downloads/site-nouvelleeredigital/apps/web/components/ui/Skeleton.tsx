"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'text' | 'rect' | 'circle' | 'card';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface SkeletonProps {
  variant: Variant;
  lines?: number;
  width?: string | number;
  height?: string | number;
  animated?: boolean;
  dataModel?: 'need' | 'module' | 'bundle';
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onLoad?: () => void;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant,
  lines = 1,
  width,
  height,
  animated = true,
  dataModel,
  onSelect,
  onAdd,
  onLoad,
  className,
}) => {
  const [state, setState] = useState<State>('default');

  const variants: Record<Variant, string> = {
    text: 'h-4 bg-gray-300 rounded',
    rect: 'bg-gray-300 rounded',
    circle: 'bg-gray-300 rounded-full',
    card: 'bg-gray-300 rounded-[var(--border-radius-large)]',
  };

  const stateClasses: Record<State, string> = {
    default: '',
    hover: 'bg-gray-400',
    active: 'bg-gray-500',
    focus: 'ring-2 ring-[var(--color-primary)]',
    disabled: 'opacity-50',
    selected: 'border-2 border-[var(--color-primary)]',
    invalid: 'border-2 border-red-500',
    dragging: 'cursor-grabbing',
  };

  const renderSkeleton = () => {
    if (variant === 'text') {
      return (
        <div className="space-y-2">
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={cn(
                'h-4 bg-gray-300 rounded',
                animated && 'animate-pulse',
                stateClasses[state]
              )}
              style={{ width: index === lines - 1 ? '60%' : '100%' }}
            />
          ))}
        </div>
      );
    }
    return (
      <div
        className={cn(
          variants[variant],
          animated && 'animate-pulse',
          stateClasses[state],
          className
        )}
        style={{ width, height }}
      />
    );
  };

  return (
    <div
      className={cn('skeleton', className)}
      role="status"
      aria-label="Contenu en chargement"
      onMouseEnter={() => setState('hover')}
      onMouseLeave={() => setState('default')}
      onFocus={() => setState('focus')}
      onBlur={() => setState('default')}
    >
      {renderSkeleton()}
    </div>
  );
};
