"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Text } from './Text';
import { Badge } from './Badge';

type Variant = 'list' | 'grid' | 'card';
type Size = 'sm' | 'md' | 'lg';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface ServiceListProps {
  services: Array<{ id: string; title: string; description: string; status: 'active' | 'inactive' }>;
  selectedIds?: string[];
  variant?: Variant;
  size?: Size;
  maxItems?: number;
  dataModel?: 'need' | 'module' | 'bundle';
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
  onEdit?: (id: string) => void;
  className?: string;
}

export const ServiceList: React.FC<ServiceListProps> = ({
  services,
  selectedIds = [],
  variant = 'list',
  size = 'md',
  maxItems,
  dataModel,
  onSelect,
  onAdd,
  onRemove,
  onEdit,
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
    list: 'space-y-2',
    grid: 'grid grid-cols-2 gap-4',
    card: 'space-y-4',
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

  const visibleServices = maxItems ? services.slice(0, maxItems) : services;

  return (
    <div
      className={cn(
        'bg-[var(--couleur-light)] rounded-[var(--border-radius-large)] p-4',
        variants[variant],
        stateClasses[state],
        className
      )}
      role="list"
      aria-label="Liste de services"
      onMouseEnter={() => setState('hover')}
      onMouseLeave={() => setState('default')}
      onFocus={() => setState('focus')}
      onBlur={() => setState('default')}
    >
      {visibleServices.map((service) => (
        <div
          key={service.id}
          className={cn(
            'flex items-center justify-between p-2 border rounded cursor-pointer',
            selectedIds.includes(service.id) && 'border-[var(--color-primary)]',
            sizes[size]
          )}
          onClick={() => handleSelect(service.id)}
          role="listitem"
          aria-selected={selectedIds.includes(service.id)}
        >
          <div>
            <Text size="base" className="font-medium">{service.title}</Text>
            <Text size="sm" className="text-muted">{service.description}</Text>
          </div>
          <Badge className={cn(
            service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          )}>
            {service.status}
          </Badge>
        </div>
      ))}
    </div>
  );
};
