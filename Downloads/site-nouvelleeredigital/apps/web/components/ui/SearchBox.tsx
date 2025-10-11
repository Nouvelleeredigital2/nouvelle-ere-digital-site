import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Text } from './Text';

type Variant = 'default' | 'outlined' | 'filled';
type Size = 'sm' | 'md' | 'lg';
type State = 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'selected' | 'invalid' | 'dragging';

interface SearchBoxProps {
  placeholder: string;
  value?: string;
  suggestions?: Array<{ id: string; label: string; type?: string }>;
  variant?: Variant;
  size?: Size;
  dataModel?: 'need' | 'module' | 'bundle';
  apiUrl?: string; // Nouvelle prop pour l'API
  onSearch?: (query: string) => void;
  onSelect?: (id: string) => void;
  onAdd?: (id: string) => void;
  onChange?: (query: string) => void;
  onClear?: () => void;
  className?: string;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder,
  value = '',
  suggestions = [],
  variant = 'default',
  size = 'md',
  dataModel,
  apiUrl,
  onSearch,
  onSelect,
  onAdd,
  onChange,
  onClear,
  className,
}) => {
  const [state, setState] = useState<State>('default');
  const [query, setQuery] = useState(value);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [focusedId, setFocusedId] = useState<string | null>(null);
  const [apiSuggestions, setApiSuggestions] = useState<Array<{ id: string; label: string; type?: string }>>([]);

  // Fetch suggestions from API if apiUrl is provided
  useEffect(() => {
    if (apiUrl && query.length > 2) {
      fetch(`${apiUrl}?q=${encodeURIComponent(query)}`)
        .then(response => response.json())
        .then(data => setApiSuggestions(data.suggestions || []))
        .catch(error => console.error('API Error:', error));
    } else {
      setApiSuggestions([]);
    }
  }, [query, apiUrl]);

  const allSuggestions = [...suggestions, ...apiSuggestions];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    onChange?.(newQuery);
    setShowSuggestions(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
    setShowSuggestions(false);
  };

  const handleSelect = (id: string) => {
    if (onSelect) onSelect(id);
    setShowSuggestions(false);
  };

  const sizes: Record<Size, string> = {
    sm: 'text-sm p-2',
    md: 'text-base p-3',
    lg: 'text-lg p-4',
  };

  const variants: Record<Variant, string> = {
    default: 'border border-gray-300 bg-white',
    outlined: 'border-2 border-[var(--color-primary)] bg-transparent',
    filled: 'bg-[var(--couleur-light)] border border-gray-300',
  };

  const stateClasses: Record<State, string> = {
    default: '',
    hover: 'border-[var(--color-primary)]',
    active: 'bg-[var(--couleur-light-active)]',
    focus: 'ring-2 ring-[var(--color-primary)]',
    disabled: 'opacity-50 cursor-not-allowed',
    selected: 'border-2 border-[var(--color-primary)]',
    invalid: 'border-2 border-red-500',
    dragging: 'cursor-grabbing',
  };

  return (
    <div className={cn('relative', className)}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={cn(
            'w-full rounded-[var(--border-radius-large)] shadow-[var(--box-shadow-subtil)]',
            sizes[size],
            variants[variant],
            stateClasses[state]
          )}
          onMouseEnter={() => setState('hover')}
          onMouseLeave={() => setState('default')}
          onFocus={() => setState('focus')}
          onBlur={() => {
            setState('default');
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          role="searchbox"
          aria-label="Boîte de recherche"
        />
        {onClear && query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              onClear();
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500"
          >
            ×
          </button>
        )}
      </form>
      {showSuggestions && allSuggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border rounded mt-1 shadow-lg z-10">
          {allSuggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className={cn(
                'p-2 cursor-pointer',
                focusedId === suggestion.id && 'bg-[var(--couleur-light-hover)]'
              )}
              onClick={() => handleSelect(suggestion.id)}
              onMouseEnter={() => setFocusedId(suggestion.id)}
              onMouseLeave={() => setFocusedId(null)}
              role="option"
              aria-selected={focusedId === suggestion.id}
            >
              <Text>{suggestion.label}</Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
