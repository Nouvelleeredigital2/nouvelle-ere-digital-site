import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './Badge';
import { Text } from './Text';

type Variant = 'default' | 'ringed' | 'gaseous';
type Size = 'sm' | 'md' | 'lg';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface PlanetBadgeProps {
  label: string;
  planet: { name: string; color: string; size: number };
  variant?: Variant;
  size?: Size;
  animated?: boolean;
  dataModel?: 'need' | 'module' | 'bundle';
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onClick?: () => void;
  onHover?: (id: string) => void;
  className?: string;
}

export const PlanetBadge: React.FC<PlanetBadgeProps> = ({
  label,
  planet,
  variant = 'default',
  size = 'md',
  animated = true,
  dataModel,
  onSelect,
  onAdd,
  onClick,
  onHover,
  className,
}) => {
  const [state, setState] = useState<State>('default');

  const sizes: Record<Size, string> = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-base',
  };

  const variants: Record<Variant, string> = {
    default: 'rounded-full',
    ringed: 'rounded-full border-2 border-yellow-400',
    gaseous: 'rounded-full opacity-80',
  };

  const stateClasses: Record<State, string> = {
    default: '',
    hover: 'scale-110',
    active: 'scale-95',
    focus: 'ring-2 ring-[var(--color-primary)]',
    disabled: 'opacity-50 cursor-not-allowed',
    selected: 'ring-4 ring-yellow-400',
    invalid: 'border-2 border-red-500',
    dragging: 'cursor-grabbing',
  };

  return (
    <div
      className={cn(
        'flex items-center gap-2 cursor-pointer transition-transform',
        sizes[size],
        variants[variant],
        animated && 'hover:rotate-12',
        stateClasses[state],
        className
      )}
      onMouseEnter={() => {
        setState('hover');
        onHover?.(planet.name);
      }}
      onMouseLeave={() => setState('default')}
      onFocus={() => setState('focus')}
      onBlur={() => setState('default')}
      onClick={onClick}
      role="img"
      aria-label={`${label}: ${planet.name}`}
    >
      <div
        className={cn(
          'rounded-full flex items-center justify-center text-white font-bold',
          sizes[size]
        )}
        style={{ backgroundColor: planet.color }}
      >
        {planet.name.charAt(0).toUpperCase()}
      </div>
      <Text size={size === 'sm' ? 'sm' : 'base'}>{label}</Text>
    </div>
  );
};
