import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Text } from './Text';

type Variant = 'cosmic' | 'stellar' | 'nebula';
type Size = 'sm' | 'md' | 'lg';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface GalaxyRibbonProps {
  content: React.ReactNode;
  title?: string;
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

export const GalaxyRibbon: React.FC<GalaxyRibbonProps> = ({
  content,
  title,
  variant = 'cosmic',
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
    sm: 'p-2 text-sm',
    md: 'p-4 text-base',
    lg: 'p-6 text-lg',
  };

  const variants: Record<Variant, string> = {
    cosmic: 'bg-gradient-to-r from-purple-900 to-blue-900',
    stellar: 'bg-gradient-to-r from-black to-gray-900',
    nebula: 'bg-gradient-to-r from-pink-500 to-purple-500',
  };

  const stateClasses: Record<State, string> = {
    default: '',
    hover: 'transform scale-105',
    active: 'transform scale-95',
    focus: 'ring-2 ring-yellow-400',
    disabled: 'opacity-50 cursor-not-allowed',
    selected: 'border-2 border-yellow-400',
    invalid: 'border-2 border-red-500',
    dragging: 'cursor-grabbing',
  };

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-full text-white shadow-lg',
        sizes[size],
        variants[variant],
        animated && 'transition-transform duration-300',
        stateClasses[state],
        className
      )}
      onMouseEnter={() => {
        setState('hover');
        onHover?.('ribbon');
      }}
      onMouseLeave={() => setState('default')}
      onFocus={() => setState('focus')}
      onBlur={() => setState('default')}
      onClick={onClick}
      role="banner"
      aria-label={title || "Ruban galactique"}
      tabIndex={0}
    >
      {title && <Text size="lg" className="font-bold mb-2">{title}</Text>}
      {content}
    </div>
  );
};
