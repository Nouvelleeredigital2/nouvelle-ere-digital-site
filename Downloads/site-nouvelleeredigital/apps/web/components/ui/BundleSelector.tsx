import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from './Button';
import { Text } from './Text';

type Variant = 'dropdown' | 'grid' | 'list';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface BundleSelectorProps {
  bundles: Array<{ id: string; title: string; description: string; image?: string }>;
  selectedIds?: string[];
  multiple?: boolean;
  variant?: Variant;
  placeholder?: string;
  maxSelections?: number;
  dataModel?: 'need' | 'module' | 'bundle';
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onRemove?: (id: string) => void;
  onSearch?: (query: string) => void;
  className?: string;
}

export const BundleSelector: React.FC<BundleSelectorProps> = ({
  bundles,
  selectedIds = [],
  multiple = false,
  variant = 'list',
  placeholder = "Sélectionnez un bundle",
  maxSelections,
  dataModel,
  onSelect,
  onAdd,
  onRemove,
  onSearch,
  className,
}) => {
  const [state, setState] = useState<State>('default');
  const [searchQuery, setSearchQuery] = useState('');

  const handleSelect = (id: string) => {
    if (state === 'disabled') return;
    if (onSelect) onSelect(id);
  };

  const variants: Record<Variant, string> = {
    dropdown: 'relative',
    grid: 'grid grid-cols-2 gap-4',
    list: 'space-y-2',
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

  const filteredBundles = bundles.filter(bundle =>
    bundle.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      className={cn(
        'bg-[var(--couleur-light)] rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-subtil)] p-4',
        variants[variant],
        stateClasses[state],
        className
      )}
      role="listbox"
      aria-label="Sélecteur de bundles"
      onMouseEnter={() => setState('hover')}
      onMouseLeave={() => setState('default')}
      onFocus={() => setState('focus')}
      onBlur={() => setState('default')}
      tabIndex={0}
    >
      <Text className="mb-2">{placeholder}</Text>
      {onSearch && (
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="Rechercher..."
        />
      )}
      <div className={variants[variant]}>
        {filteredBundles.map((bundle) => (
          <div
            key={bundle.id}
            className={cn(
              'p-2 border rounded cursor-pointer',
              selectedIds.includes(bundle.id) && 'border-[var(--color-primary)]'
            )}
            onClick={() => handleSelect(bundle.id)}
            role="option"
            aria-selected={selectedIds.includes(bundle.id)}
          >
            {bundle.image && <img src={bundle.image} alt={bundle.title} className="w-full h-16 object-cover mb-2" />}
            <Text size="base">{bundle.title}</Text>
            <Text size="sm" className="text-muted">{bundle.description}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};
