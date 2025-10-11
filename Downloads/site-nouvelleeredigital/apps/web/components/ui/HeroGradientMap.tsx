import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Media } from './Media';

type Variant = 'heatmap' | 'contour' | 'overlay';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface HeroGradientMapProps {
  src: string;
  alt: string;
  gradients: Array<{ color: string; position: { x: number; y: number } }>;
  variant?: Variant;
  animated?: boolean;
  dataModel?: 'need' | 'module' | 'bundle';
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onZoom?: (position: { x: number; y: number }) => void;
  onFilter?: (gradient: string) => void;
  className?: string;
}

export const HeroGradientMap: React.FC<HeroGradientMapProps> = ({
  src,
  alt,
  gradients,
  variant = 'overlay',
  animated = true,
  dataModel,
  onSelect,
  onAdd,
  onZoom,
  onFilter,
  className,
}) => {
  const [state, setState] = useState<State>('default');

  const variants: Record<Variant, string> = {
    heatmap: 'relative',
    contour: 'relative border-2 border-dashed',
    overlay: 'relative',
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
        'bg-[var(--couleur-light)] rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-subtil)] overflow-hidden',
        variants[variant],
        animated && 'transition-all duration-300',
        stateClasses[state],
        className
      )}
      role="img"
      aria-label={alt}
      onMouseEnter={() => setState('hover')}
      onMouseLeave={() => setState('default')}
      onFocus={() => setState('focus')}
      onBlur={() => setState('default')}
    >
      <Media src={src} alt={alt} className="w-full h-96 object-cover" />
      {gradients.map((gradient, index) => (
        <div
          key={index}
          className="absolute w-8 h-8 rounded-full opacity-70"
          style={{
            backgroundColor: gradient.color,
            left: `${gradient.position.x}%`,
            top: `${gradient.position.y}%`,
          }}
          onClick={() => onSelect?.(`gradient-${index}`)}
        />
      ))}
    </div>
  );
};
