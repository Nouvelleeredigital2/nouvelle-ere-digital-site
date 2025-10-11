import React, { useState } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'clockwise' | 'counterclockwise' | 'random';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface HeroOrbitMaskProps {
  center: { content: React.ReactNode; size: number };
  orbitals: Array<{ id: string; content: React.ReactNode; radius: number; speed: number }>;
  variant?: Variant;
  animated?: boolean;
  dataModel?: 'need' | 'module' | 'bundle';
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onOrbitChange?: (direction: string) => void;
  onSpeedChange?: (speed: number) => void;
  className?: string;
}

export const HeroOrbitMask: React.FC<HeroOrbitMaskProps> = ({
  center,
  orbitals,
  variant = 'clockwise',
  animated = true,
  dataModel,
  onSelect,
  onAdd,
  onOrbitChange,
  onSpeedChange,
  className,
}) => {
  const [state, setState] = useState<State>('default');

  const variants: Record<Variant, string> = {
    clockwise: 'animate-spin',
    counterclockwise: 'animate-spin-reverse',
    random: 'animate-bounce',
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
        'relative bg-[var(--couleur-light)] rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-subtil)] overflow-hidden h-96 flex items-center justify-center',
        animated && variants[variant],
        stateClasses[state],
        className
      )}
      role="img"
      aria-label="Masque orbital héroïque"
      onMouseEnter={() => setState('hover')}
      onMouseLeave={() => setState('default')}
      onFocus={() => setState('focus')}
      onBlur={() => setState('default')}
    >
      <div className="relative">
        <div className={`w-${center.size} h-${center.size} flex items-center justify-center`}>
          {center.content}
        </div>
        {orbitals.map((orbital, index) => (
          <div
            key={orbital.id}
            className={cn(
              'absolute rounded-full border-2 border-[var(--color-primary)]',
              `w-${orbital.radius * 2} h-${orbital.radius * 2}`,
              animated && 'animate-spin'
            )}
            style={{
              top: `${50 - orbital.radius}%`,
              left: `${50 - orbital.radius}%`,
              animationDuration: `${orbital.speed}s`,
            }}
            onClick={() => onSelect?.(orbital.id)}
          >
            <div className="w-full h-full flex items-center justify-center">
              {orbital.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
