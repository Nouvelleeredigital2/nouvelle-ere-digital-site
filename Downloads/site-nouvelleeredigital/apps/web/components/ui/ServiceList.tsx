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
    hover: 'hover:bg-muted/50',
    active: 'bg-muted',
    focus: 'ring-2 ring-primary',
    disabled: 'opacity-50 cursor-not-allowed',
    selected: 'border-2 border-primary bg-primary/5',
    invalid: 'border-2 border-error',
    dragging: 'cursor-grabbing',
  };

  const visibleServices = maxItems ? services.slice(0, maxItems) : services;

  return (
    <div
      className={cn(
        'bg-card border rounded-lg p-4',
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
            'flex items-center justify-between p-2 border rounded cursor-pointer transition-colors',
            selectedIds.includes(service.id) && 'border-primary bg-primary/5',
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
            service.status === 'active' ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
          )}>
            {service.status}
          </Badge>
        </div>
      ))}
    </div>
  );
};
