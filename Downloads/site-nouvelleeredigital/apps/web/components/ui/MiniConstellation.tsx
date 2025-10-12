"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'static' | 'twinkling' | 'animated';
type Size = 'sm' | 'md' | 'lg';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface MiniConstellationProps {
  stars: Array<{ id: string; x: number; y: number; size: number; color: string }>;
  connections?: Array<{ from: string; to: string; color: string }>;
  variant?: Variant;
  size?: Size;
  dataModel?: 'need' | 'module' | 'bundle';
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onConnect?: (from: string, to: string) => void;
  onAnimate?: () => void;
  className?: string;
}

export const MiniConstellation: React.FC<MiniConstellationProps> = ({
  stars,
  connections = [],
  variant = 'static',
  size = 'md',
  dataModel,
  onSelect,
  onAdd,
  onConnect,
  onAnimate,
  className,
}) => {
  const [state, setState] = useState<State>('default');

  const sizes: Record<Size, string> = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
  };

  const variants: Record<Variant, string> = {
    static: '',
    twinkling: 'animate-pulse',
    animated: 'animate-spin',
  };

  const stateClasses: Record<State, string> = {
    default: '',
    hover: 'opacity-90',
    active: 'scale-105',
    focus: 'ring-2 ring-[var(--color-primary)]',
    disabled: 'opacity-50 cursor-not-allowed',
    selected: 'border-2 border-[var(--color-primary)]',
    invalid: 'border-2 border-red-500',
    dragging: 'cursor-grabbing',
  };

  return (
    <div
      className={cn(
        'relative bg-black rounded-[var(--border-radius-large)] overflow-hidden',
        sizes[size],
        variants[variant],
        stateClasses[state],
        className
      )}
      role="img"
      aria-label="Mini-constellation"
      onMouseEnter={() => setState('hover')}
      onMouseLeave={() => setState('default')}
      onFocus={() => setState('focus')}
      onBlur={() => setState('default')}
    >
      <svg className="w-full h-full">
        {connections.map((conn, index) => {
          const fromStar = stars.find(s => s.id === conn.from);
          const toStar = stars.find(s => s.id === conn.to);
          return fromStar && toStar ? (
            <line
              key={index}
              x1={fromStar.x}
              y1={fromStar.y}
              x2={toStar.x}
              y2={toStar.y}
              stroke={conn.color}
              strokeWidth="1"
            />
          ) : null;
        })}
        {stars.map((star) => (
          <circle
            key={star.id}
            cx={star.x}
            cy={star.y}
            r={star.size}
            fill={star.color}
            onClick={() => onSelect?.(star.id)}
            className="cursor-pointer"
          />
        ))}
      </svg>
    </div>
  );
};
