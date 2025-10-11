import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Text } from './Text';

type Variant = 'panel' | 'modal' | 'inline';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface ExportPanelProps {
  formats: Array<{ id: string; label: string; extension: string }>;
  selectedFormat?: string;
  options?: Array<{ id: string; label: string; type: 'checkbox' | 'select' }>;
  variant?: Variant;
  isOpen?: boolean;
  dataModel?: 'need' | 'module' | 'bundle';
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onExport?: () => void;
  onCancel?: () => void;
  className?: string;
}

export const ExportPanel: React.FC<ExportPanelProps> = ({
  formats,
  selectedFormat,
  options = [],
  variant = 'panel',
  isOpen = true,
  dataModel,
  onSelect,
  onAdd,
  onExport,
  onCancel,
  className,
}) => {
  const [state, setState] = useState<State>('default');
  const [currentFormat, setCurrentFormat] = useState(selectedFormat || formats[0]?.id);

  const handleSelect = (id: string) => {
    setCurrentFormat(id);
    if (onSelect) onSelect(id);
  };

  const variants: Record<Variant, string> = {
    modal: 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50',
    panel: 'w-full max-w-md p-6',
    inline: 'w-full p-4',
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
    <div className={cn(variants[variant], className)}>
      {variant === 'modal' && !isOpen ? null : (
        <div
          className={cn(
            'bg-[var(--couleur-light)] rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-subtil)] p-6',
            variant === 'modal' && 'relative',
            stateClasses[state]
          )}
          role="dialog"
          aria-label="Panneau d'export"
          onMouseEnter={() => setState('hover')}
          onMouseLeave={() => setState('default')}
          onFocus={() => setState('focus')}
          onBlur={() => setState('default')}
        >
          <Text size="lg" className="font-medium mb-4">Exporter les données</Text>
          <div className="mb-4">
            <Text size="base" className="mb-2">Format d'export</Text>
            <div role="radiogroup">
              {formats.map((format) => (
                <label key={format.id} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    value={format.id}
                    checked={currentFormat === format.id}
                    onChange={() => handleSelect(format.id)}
                  />
                  <Text>{format.label} (.{format.extension})</Text>
                </label>
              ))}
            </div>
          </div>
          {options.length > 0 && (
            <div className="mb-4">
              <Text size="base" className="mb-2">Options</Text>
              {options.map((option) => (
                <div key={option.id}>
                  <input type={option.type} id={option.id} />
                  <label htmlFor={option.id}>{option.label}</label>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Button onClick={onExport}>Exporter</Button>
            <Button variant="outline" onClick={onCancel}>Annuler</Button>
          </div>
        </div>
      )}
    </div>
  );
};
