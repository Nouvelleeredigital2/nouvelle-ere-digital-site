"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { OrbitBreadcrumbs } from './OrbitBreadcrumbs';
import { Text } from './Text';

type Variant = 'default' | 'hero' | 'minimal';
type Size = 'sm' | 'md' | 'lg';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface HeroSectionWithBreadcrumbsProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Array<{ id: string; label: string; href?: string; level: number }>;
  currentBreadcrumbId?: string;
  variant?: Variant;
  size?: Size;
  dataModel?: 'need' | 'module' | 'bundle';
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onNavigate?: (id: string) => void;
  onReset?: () => void;
  className?: string;
}

export const HeroSectionWithBreadcrumbs: React.FC<HeroSectionWithBreadcrumbsProps> = ({
  title,
  subtitle,
  breadcrumbs = [],
  currentBreadcrumbId,
  variant = 'default',
  size = 'md',
  dataModel,
  onSelect,
  onAdd,
  onNavigate,
  onReset,
  className,
}) => {
  const [state, setState] = useState<State>('default');

  const sizes: Record<Size, string> = {
    sm: 'p-4 text-sm',
    md: 'p-6 text-base',
    lg: 'p-8 text-lg',
  };

  const variants: Record<Variant, string> = {
    default: 'bg-[var(--couleur-light)] border-b border-gray-200',
    hero: 'bg-gradient-to-r from-blue-500 to-purple-600 text-white',
    minimal: 'bg-transparent border-b border-gray-100',
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
    <header
      className={cn(
        'flex flex-col gap-4',
        sizes[size],
        variants[variant],
        stateClasses[state],
        className
      )}
      role="banner"
      aria-label={`En-tête héroïque: ${title}`}
      onMouseEnter={() => setState('hover')}
      onMouseLeave={() => setState('default')}
      onFocus={() => setState('focus')}
      onBlur={() => setState('default')}
    >
      <Text size="lg" className="font-bold">
        {title}
      </Text>
      {subtitle && (
        <Text size="sm" className="text-muted">
          {subtitle}
        </Text>
      )}
      {breadcrumbs.length > 0 && (
        <OrbitBreadcrumbs
          items={breadcrumbs}
          currentId={currentBreadcrumbId}
          variant="orbital"
          onSelect={onSelect}
          onNavigate={onNavigate}
          onReset={onReset}
        />
      )}
    </header>
  );
};
