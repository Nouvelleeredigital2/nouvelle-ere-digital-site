import React, { useState, useRef, useEffect } from 'react';
import { useFocusManagement, announceToScreenReader, handleKeyboardNavigation } from '@/lib/accessibility';

// Composant Button accessible
interface AccessibleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  loadingText?: string;
  description?: string;
}

export function AccessibleButton({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  loadingText = 'Chargement...',
  description,
  className = '',
  onClick,
  ...props
}: AccessibleButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading) return;
    onClick?.(e);
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary hover:bg-primary text-card-foreground focus:ring-blue-500';
      case 'secondary':
        return 'bg-muted hover:bg-muted text-card-foreground focus:ring-gray-500';
      case 'outline':
        return 'border border-gray-300 hover:bg-muted text-muted-foreground focus:ring-blue-500';
      case 'ghost':
        return 'hover:bg-muted text-muted-foreground focus:ring-blue-500';
      case 'destructive':
        return 'bg-error hover:bg-error text-card-foreground focus:ring-red-500';
      default:
        return 'bg-primary hover:bg-primary text-card-foreground focus:ring-blue-500';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-3 py-1.5 text-sm';
      case 'md':
        return 'px-4 py-2 text-sm';
      case 'lg':
        return 'px-6 py-3 text-base';
      default:
        return 'px-4 py-2 text-sm';
    }
  };

  return (
    <button
      ref={buttonRef}
      className={`
        inline-flex items-center justify-center rounded-md font-medium
        transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        ${getVariantClasses()} ${getSizeClasses()} ${className}
      `}
      onClick={handleClick}
      disabled={loading || props.disabled}
      aria-busy={loading}
      aria-describedby={description ? `${props.id || 'button'}-description` : undefined}
      {...props}
    >
      {loading && (
        <>
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          {loadingText}
        </>
      )}
      {!loading && children}
      {description && (
        <span id={`${props.id || 'button'}-description`} className="sr-only">
          {description}
        </span>
      )}
    </button>
  );
}

// Composant Modal accessible
interface AccessibleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  description?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function AccessibleModal({
  isOpen,
  onClose,
  title,
  children,
  description,
  size = 'md'
}: AccessibleModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const { trapFocus, restoreFocus } = useFocusManagement();
  const [previousActiveElement, setPreviousActiveElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setPreviousActiveElement(document.activeElement as HTMLElement);
      if (modalRef.current) {
        const cleanup = trapFocus(modalRef.current);
        return cleanup;
      }
    } else if (previousActiveElement) {
      restoreFocus(previousActiveElement);
    }
  }, [isOpen, trapFocus, restoreFocus, previousActiveElement]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'max-w-md';
      case 'md':
        return 'max-w-lg';
      case 'lg':
        return 'max-w-2xl';
      case 'xl':
        return 'max-w-4xl';
      default:
        return 'max-w-lg';
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby={description ? "modal-description" : undefined}
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Overlay */}
        <div
          className="fixed inset-0 bg-muted0 bg-opacity-75 transition-opacity"
          aria-hidden="true"
          onClick={onClose}
        />

        {/* Modal */}
        <div
          ref={modalRef}
          className={`inline-block align-bottom bg-card rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:w-full ${getSizeClasses()}`}
        >
          <div className="bg-card px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3
                  id="modal-title"
                  className="text-lg leading-6 font-medium text-muted-foreground mb-4"
                >
                  {title}
                </h3>
                {description && (
                  <p id="modal-description" className="text-sm text-muted-foreground0 mb-4">
                    {description}
                  </p>
                )}
                {children}
              </div>
            </div>
          </div>
          <div className="bg-muted px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <AccessibleButton
              onClick={onClose}
              variant="primary"
              className="w-full sm:w-auto sm:ml-3"
            >
              Fermer
            </AccessibleButton>
          </div>
        </div>
      </div>
    </div>
  );
}

// Composant Input accessible
interface AccessibleInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  description?: string;
  required?: boolean;
}

export function AccessibleInput({
  label,
  error,
  description,
  required = false,
  id,
  className = '',
  ...props
}: AccessibleInputProps) {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = `${inputId}-error`;
  const descriptionId = `${inputId}-description`;

  return (
    <div className="space-y-2">
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-muted-foreground"
      >
        {label}
        {required && <span className="text-error ml-1" aria-label="requis">*</span>}
      </label>
      
      <input
        id={inputId}
        className={`
          block w-full px-3 py-2 border rounded-md shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          ${error ? 'border-error/30' : 'border-gray-300'}
          ${className}
        `}
        aria-describedby={`${description ? descriptionId : ''} ${error ? errorId : ''}`.trim()}
        aria-invalid={error ? 'true' : 'false'}
        required={required}
        {...props}
      />
      
      {description && (
        <p id={descriptionId} className="text-sm text-muted-foreground0">
          {description}
        </p>
      )}
      
      {error && (
        <p id={errorId} className="text-sm text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// Composant Tabs accessible
interface AccessibleTabsProps {
  tabs: Array<{ id: string; label: string; content: React.ReactNode }>;
  defaultTab?: string;
  onChange?: (tabId: string) => void;
}

export function AccessibleTabs({ tabs, defaultTab, onChange }: AccessibleTabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
    announceToScreenReader(`Onglet ${tabs.find(t => t.id === tabId)?.label} sélectionné`);
  };

  const handleKeyDown = (e: React.KeyboardEvent, tabId: string) => {
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    
    handleKeyboardNavigation(
      e.nativeEvent,
      () => handleTabClick(tabId),
      undefined,
      () => {
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
        handleTabClick(tabs[prevIndex].id);
      },
      () => {
        const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
        handleTabClick(tabs[nextIndex].id);
      }
    );
  };

  return (
    <div className="w-full">
      <div
        role="tablist"
        aria-label="Navigation par onglets"
        className="flex border-b border-gray-200"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            id={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`${tab.id}-panel`}
            tabIndex={activeTab === tab.id ? 0 : -1}
            className={`
              px-4 py-2 text-sm font-medium border-b-2 transition-colors
              ${activeTab === tab.id
                ? 'border-blue-500 text-primary'
                : 'border-transparent text-muted-foreground0 hover:text-muted-foreground hover:border-gray-300'
              }
            `}
            onClick={() => handleTabClick(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      {tabs.map((tab) => (
        <div
          key={tab.id}
          id={`${tab.id}-panel`}
          role="tabpanel"
          aria-labelledby={tab.id}
          hidden={activeTab !== tab.id}
          className="p-4"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}

// Composant Alert accessible
interface AccessibleAlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  children?: React.ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function AccessibleAlert({
  type,
  title,
  children,
  dismissible = false,
  onDismiss
}: AccessibleAlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
    announceToScreenReader('Alerte fermée');
  };

  if (!isVisible) return null;

  const getTypeClasses = () => {
    switch (type) {
      case 'success':
        return 'bg-success/10 border-success/20 text-success';
      case 'error':
        return 'bg-error/10 border-error/20 text-error';
      case 'warning':
        return 'bg-warning/10 border-warning/20 text-warning';
      case 'info':
        return 'bg-primary/10 border-primary/20 text-primary';
      default:
        return 'bg-muted border-gray-200 text-muted-foreground';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '📢';
    }
  };

  return (
    <div
      role="alert"
      className={`border rounded-lg p-4 ${getTypeClasses()}`}
      aria-live="polite"
    >
      <div className="flex items-start">
        <span className="text-lg mr-3" aria-hidden="true">
          {getIcon()}
        </span>
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          {children && <div className="mt-1">{children}</div>}
        </div>
        {dismissible && (
          <button
            onClick={handleDismiss}
            className="ml-3 text-current opacity-50 hover:opacity-75"
            aria-label="Fermer l'alerte"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}
