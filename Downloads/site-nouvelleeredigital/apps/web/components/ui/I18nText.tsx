'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

type Variant = 'default' | 'bold' | 'italic';
type Size = 'sm' | 'md' | 'lg';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface I18nTextProps {
  key: string;
  params?: Record<string, any>;
  fallback?: string;
  variant?: Variant;
  size?: Size;
  dataModel?: 'need' | 'module' | 'bundle';
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onLanguageChange?: (lang: string) => void;
  onMissingKey?: (key: string) => void;
  className?: string;
}

export const I18nText: React.FC<I18nTextProps> = ({
  key: translationKey,
  params,
  fallback,
  variant = 'default',
  size = 'md',
  dataModel,
  onSelect,
  onAdd,
  onLanguageChange,
  onMissingKey,
  className,
}) => {
  const { t, i18n } = useTranslation();
  const [state, setState] = useState<State>('default');

  const translate = (key: string) => {
    const translated = t(key, params);
    if (translated === key && onMissingKey) {
      onMissingKey(key);
    }
    return translated !== key ? translated : fallback || key;
  };

  const sizes: Record<Size, string> = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const variants: Record<Variant, string> = {
    default: '',
    bold: 'font-bold',
    italic: 'italic',
  };

  const stateClasses: Record<State, string> = {
    default: '',
    hover: 'underline',
    active: 'bg-yellow-200',
    focus: 'ring-2 ring-[var(--color-primary)]',
    disabled: 'opacity-50 cursor-not-allowed',
    selected: 'border-2 border-[var(--color-primary)]',
    invalid: 'border-2 border-red-500',
    dragging: 'cursor-grabbing',
  };

  return (
    <span
      className={cn(
        sizes[size],
        variants[variant],
        stateClasses[state],
        className
      )}
      onMouseEnter={() => setState('hover')}
      onMouseLeave={() => setState('default')}
      onFocus={() => setState('focus')}
      onBlur={() => setState('default')}
      onClick={() => onSelect?.(translationKey)}
      role="text"
      aria-label={translate(translationKey)}
    >
      {translate(translationKey)}
    </span>
  );
};
