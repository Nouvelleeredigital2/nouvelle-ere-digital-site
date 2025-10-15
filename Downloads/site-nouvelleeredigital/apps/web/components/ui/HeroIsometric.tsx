"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'wireframe' | 'solid' | 'textured';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface HeroIsometricProps {
  scene: { objects: Array<{ id: string; position: { x: number; y: number; z: number }; color: string }> };
  camera?: { angle: number; zoom: number };
  variant?: Variant;
  animated?: boolean;
  dataModel?: 'need' | 'module' | 'bundle';
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onRotate?: (angle: number) => void;
  onZoom?: (zoom: number) => void;
  className?: string;
}

export const HeroIsometric: React.FC<HeroIsometricProps> = ({
  scene,
  camera = { angle: 45, zoom: 1 },
  variant = 'solid',
  animated = true,
  dataModel,
  onSelect,
  onAdd,
  onRotate,
  onZoom,
  className,
}) => {
  const [state, setState] = useState<State>('default');

  const variants: Record<Variant, string> = {
    wireframe: 'border-2 border-dashed border-primary',
    solid: 'bg-gradient-to-br from-muted to-muted-foreground',
    textured: 'bg-gradient-to-br from-primary to-secondary',
  };

  const stateClasses: Record<State, string> = {
    default: '',
    hover: 'opacity-90',
    active: 'scale-105',
    focus: 'ring-2 ring-primary',
    disabled: 'opacity-50 cursor-not-allowed',
    selected: 'border-2 border-primary',
    invalid: 'border-2 border-destructive',
    dragging: 'cursor-grabbing',
  };

  return (
    <div
      className={cn(
        'relative bg-background rounded-lg shadow-sm overflow-hidden h-96',
        variants[variant],
        animated && 'transition-all duration-300',
        stateClasses[state],
        className
      )}
      role="img"
      aria-label="Scène isométrique héroïque"
      onMouseEnter={() => setState('hover')}
      onMouseLeave={() => setState('default')}
      onFocus={() => setState('focus')}
      onBlur={() => setState('default')}
    >
      <div className="absolute inset-0 flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Hero Isometric</h2>
          <p className="text-sm">Vue 3D stylisée</p>
        </div>
      </div>
      {scene.objects.map((obj) => (
        <div
          key={obj.id}
          className="absolute w-8 h-8 rounded"
          style={{
            backgroundColor: obj.color,
            left: `${obj.position.x}px`,
            top: `${obj.position.y}px`,
            transform: `translateZ(${obj.position.z}px)`,
          }}
          onClick={() => onSelect?.(obj.id)}
        />
      ))}
    </div>
  );
};
