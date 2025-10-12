"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Text } from './Text';

type Variant = 'default' | 'compact' | 'detailed';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface BundleCardProps {
  bundle: { id: string; title: string; description: string; items: Array<{ id: string; name: string }> };
  image?: string;
  price?: number | string;
  variant?: Variant;
  isSelected?: boolean;
  maxItems?: number;
  dataModel?: 'need' | 'module' | 'bundle';
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  onRemove?: (id: string) => void;
  className?: string;
}

export const BundleCard: React.FC<BundleCardProps> = ({
  bundle,
  image,
  price,
  variant = 'default',
  isSelected = false,
  maxItems,
  dataModel,
  onSelect,
  onAdd,
  onViewDetails,
  onRemove,
  className,
}) => {
  const [state, setState] = useState<State>('default');

  const handleSelect = () => {
    if (onSelect) onSelect(bundle.id);
  };

  const variants: Record<Variant, string> = {
    default: 'w-full max-w-sm p-4',
    compact: 'w-full max-w-xs p-2',
    detailed: 'w-full max-w-md p-6',
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
        'bg-[var(--couleur-light)] rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-subtil)] transition-all duration-200',
        variants[variant],
        stateClasses[state],
        isSelected && 'border-2 border-[var(--color-primary)]',
        className
      )}
      role="article"
      aria-label={`Bundle: ${bundle.title}`}
      onMouseEnter={() => setState('hover')}
      onMouseLeave={() => setState('default')}
      onFocus={() => setState('focus')}
      onBlur={() => setState('default')}
      onClick={handleSelect}
      tabIndex={0}
    >
      {image && <img src={image} alt={bundle.title} className="w-full h-32 object-cover rounded mb-4" />}
      <Text size="lg" className="font-medium mb-2">{bundle.title}</Text>
      <Text size="base" className="mb-4">{bundle.description}</Text>
      {price && <Text className="mb-4 font-bold">Prix: {price}</Text>}
      <div className="mb-4">
        <Text size="sm">Items: {bundle.items.slice(0, maxItems).map(item => item.name).join(', ')}</Text>
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={handleSelect}>Sélectionner</Button>
        {onViewDetails && <Button size="sm" variant="outline" onClick={() => onViewDetails(bundle.id)}>Détails</Button>}
      </div>
    </div>
  );
};
