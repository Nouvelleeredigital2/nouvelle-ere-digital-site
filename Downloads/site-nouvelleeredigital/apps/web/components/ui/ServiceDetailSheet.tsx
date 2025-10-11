import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Text } from './Text';
import { Button } from './Button';

type Variant = 'sheet' | 'modal' | 'drawer';
type Size = 'sm' | 'md' | 'lg';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface ServiceDetailSheetProps {
  service: { id: string; title: string; description: string; features: string[]; price?: number };
  isOpen?: boolean;
  variant?: Variant;
  size?: Size;
  dataModel?: 'need' | 'module' | 'bundle';
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onClose?: () => void;
  onEdit?: (id: string) => void;
  className?: string;
}

export const ServiceDetailSheet: React.FC<ServiceDetailSheetProps> = ({
  service,
  isOpen = true,
  variant = 'sheet',
  size = 'md',
  dataModel,
  onSelect,
  onAdd,
  onClose,
  onEdit,
  className,
}) => {
  const [state, setState] = useState<State>('default');

  const handleSelect = (id: string) => {
    if (state === 'disabled') return;
    if (onSelect) onSelect(id);
  };

  const sizes: Record<Size, string> = {
    sm: 'w-80 h-96',
    md: 'w-96 h-[32rem]',
    lg: 'w-[28rem] h-[36rem]',
  };

  const variants: Record<Variant, string> = {
    sheet: 'fixed right-0 top-0 h-full bg-white shadow-lg',
    modal: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
    drawer: 'fixed bottom-0 left-0 right-0 bg-white rounded-t-lg shadow-lg',
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

  if (!service) return null;

  return (
    <div className={cn(variants[variant], className)}>
      {variant === 'modal' && !isOpen ? null : (
        <div
          className={cn(
            'bg-[var(--couleur-light)] rounded-[var(--border-radius-large)] p-6',
            sizes[size],
            variant === 'modal' && 'relative',
            stateClasses[state]
          )}
          role="dialog"
          aria-label={`Détails du service: ${service.title}`}
          onMouseEnter={() => setState('hover')}
          onMouseLeave={() => setState('default')}
          onFocus={() => setState('focus')}
          onBlur={() => setState('default')}
        >
          <div className="flex justify-between items-start mb-4">
            <Text size="lg" className="font-bold">{service.title}</Text>
            {onClose && (
              <Button variant="ghost" onClick={onClose} aria-label="Fermer">
                ×
              </Button>
            )}
          </div>
          <Text size="base" className="mb-4">{service.description}</Text>
          <div className="mb-4">
            <Text size="sm" className="font-medium mb-2">Fonctionnalités :</Text>
            <ul className="list-disc list-inside space-y-1">
              {service.features.map((feature, index) => (
                <li key={index}>
                  <Text size="sm">{feature}</Text>
                </li>
              ))}
            </ul>
          </div>
          {service.price && (
            <Text size="lg" className="font-bold mb-4">Prix: {service.price}€</Text>
          )}
          <div className="flex gap-2">
            <Button onClick={() => handleSelect(service.id)}>Sélectionner</Button>
            {onEdit && <Button variant="outline" onClick={() => onEdit(service.id)}>Éditer</Button>}
          </div>
        </div>
      )}
    </div>
  );
};
