"use client";

import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'default' | 'grid' | 'free';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface DragCanvasProps {
  items: Array<{ id: string; x: number; y: number; content: React.ReactNode }>;
  width?: number;
  height?: number;
  variant?: Variant;
  snapToGrid?: boolean;
  dataModel?: 'need' | 'module' | 'bundle';
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onDrop?: (id: string, x: number, y: number) => void;
  onMove?: (id: string, x: number, y: number) => void;
  className?: string;
}

export const DragCanvas: React.FC<DragCanvasProps> = ({
  items,
  width = 800,
  height = 600,
  variant = 'free',
  snapToGrid = false,
  dataModel,
  onSelect,
  onAdd,
  onDrop,
  onMove,
  className,
}) => {
  const [state, setState] = useState<State>('default');
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (id: string) => {
    setDraggedId(id);
    setState('dragging');
  };

  const handleMouseUp = (id: string, x: number, y: number) => {
    setDraggedId(null);
    setState('default');
    if (onDrop) onDrop(id, x, y);
  };

  const variants: Record<Variant, string> = {
    default: 'relative overflow-hidden',
    grid: 'relative overflow-hidden bg-gray-100',
    free: 'relative overflow-hidden',
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
      ref={canvasRef}
      className={cn(
        'bg-[var(--couleur-light)] rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-subtil)]',
        variants[variant],
        stateClasses[state],
        className
      )}
      style={{ width, height }}
      role="application"
      aria-label="Canvas de glisser-déposer"
      tabIndex={0}
      onMouseEnter={() => setState('hover')}
      onMouseLeave={() => setState('default')}
      onFocus={() => setState('focus')}
      onBlur={() => setState('default')}
    >
      {items.map((item) => (
        <div
          key={item.id}
          className={cn(
            'absolute p-2 bg-white border rounded shadow cursor-move',
            draggedId === item.id && 'opacity-50'
          )}
          style={{
            left: item.x,
            top: item.y,
            transform: snapToGrid ? 'translate(0, 0)' : undefined,
          }}
          onMouseDown={() => handleMouseDown(item.id)}
          onMouseUp={() => handleMouseUp(item.id, item.x, item.y)}
          onClick={() => onSelect?.(item.id)}
          draggable
        >
          {item.content}
        </div>
      ))}
    </div>
  );
};
