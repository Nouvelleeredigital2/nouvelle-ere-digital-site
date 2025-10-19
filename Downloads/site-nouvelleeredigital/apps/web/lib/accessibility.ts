// Utilitaires pour l'accessibilité

// Fonction pour générer des IDs uniques pour les éléments ARIA
export function generateAriaId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

// Fonction pour vérifier le contraste des couleurs
export function getContrastRatio(color1: string, color2: string): number {
  // Convertir les couleurs hex en RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 0;

  // Calculer la luminance relative
  const getLuminance = (r: number, g: number, b: number) => {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const luminance1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const luminance2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(luminance1, luminance2);
  const darkest = Math.min(luminance1, luminance2);

  return (brightest + 0.05) / (darkest + 0.05);
}

// Fonction pour vérifier si un contraste est conforme WCAG
export function isContrastCompliant(foreground: string, background: string, level: 'AA' | 'AAA' = 'AA'): boolean {
  const ratio = getContrastRatio(foreground, background);
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
}

// Fonction pour obtenir la couleur de contraste optimale
export function getOptimalContrastColor(background: string): string {
  const white = '#ffffff';
  const black = '#000000';
  
  const whiteRatio = getContrastRatio(white, background);
  const blackRatio = getContrastRatio(black, background);
  
  return whiteRatio > blackRatio ? white : black;
}

// Hook pour la gestion du focus
export function useFocusManagement() {
  const focusableElements = [
    'button',
    'input',
    'select',
    'textarea',
    'a[href]',
    'area[href]',
    'iframe',
    'object',
    'embed',
    '[tabindex]:not([tabindex="-1"])',
    '[contenteditable="true"]'
  ].join(', ');

  const trapFocus = (container: HTMLElement) => {
    const focusable = Array.from(container.querySelectorAll(focusableElements)) as HTMLElement[];
    const firstFocusable = focusable[0];
    const lastFocusable = focusable[focusable.length - 1];

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          lastFocusable?.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusable) {
          firstFocusable?.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstFocusable?.focus();

    return () => {
      container.removeEventListener('keydown', handleTabKey);
    };
  };

  const restoreFocus = (element: HTMLElement) => {
    element.focus();
  };

  return { trapFocus, restoreFocus };
}

// Fonction pour annoncer les changements aux lecteurs d'écran
export function announceToScreenReader(message: string, priority: 'polite' | 'assertive' = 'polite') {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = message;

  document.body.appendChild(announcement);

  // Supprimer l'annonce après un délai
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Fonction pour gérer la navigation au clavier
export function handleKeyboardNavigation(
  event: KeyboardEvent,
  onEnter?: () => void,
  onEscape?: () => void,
  onArrowUp?: () => void,
  onArrowDown?: () => void,
  onArrowLeft?: () => void,
  onArrowRight?: () => void
) {
  switch (event.key) {
    case 'Enter':
    case ' ':
      onEnter?.();
      event.preventDefault();
      break;
    case 'Escape':
      onEscape?.();
      event.preventDefault();
      break;
    case 'ArrowUp':
      onArrowUp?.();
      event.preventDefault();
      break;
    case 'ArrowDown':
      onArrowDown?.();
      event.preventDefault();
      break;
    case 'ArrowLeft':
      onArrowLeft?.();
      event.preventDefault();
      break;
    case 'ArrowRight':
      onArrowRight?.();
      event.preventDefault();
      break;
  }
}

// Fonction pour créer des labels accessibles
export function createAccessibleLabel(text: string, required = false): string {
  return required ? `${text} (requis)` : text;
}

// Fonction pour valider les attributs ARIA
export function validateAriaAttributes(element: HTMLElement): string[] {
  const errors: string[] = [];
  
  // Vérifier aria-labelledby
  const labelledBy = element.getAttribute('aria-labelledby');
  if (labelledBy && !document.getElementById(labelledBy)) {
    errors.push(`aria-labelledby référence un élément inexistant: ${labelledBy}`);
  }
  
  // Vérifier aria-describedby
  const describedBy = element.getAttribute('aria-describedby');
  if (describedBy && !document.getElementById(describedBy)) {
    errors.push(`aria-describedby référence un élément inexistant: ${describedBy}`);
  }
  
  // Vérifier aria-controls
  const controls = element.getAttribute('aria-controls');
  if (controls && !document.getElementById(controls)) {
    errors.push(`aria-controls référence un élément inexistant: ${controls}`);
  }
  
  return errors;
}

// Fonction pour créer des descriptions d'erreur accessibles
export function createErrorDescription(errors: string[]): string {
  if (errors.length === 0) return '';
  
  return `Erreurs: ${errors.join(', ')}`;
}

// Fonction pour gérer les états de chargement accessibles
export function createLoadingState(loading: boolean, loadingText: string): {
  'aria-busy': boolean;
  'aria-live': 'polite';
  'aria-label': string;
} {
  return {
    'aria-busy': loading,
    'aria-live': 'polite',
    'aria-label': loading ? loadingText : '',
  };
}

// Fonction pour créer des descriptions de statut
export function createStatusDescription(status: string, details?: string): string {
  return details ? `${status}: ${details}` : status;
}

// Fonction pour gérer la navigation par onglets
export function createTabNavigation(tabs: Array<{ id: string; label: string; content: string }>) {
  return {
    role: 'tablist',
    'aria-label': 'Navigation par onglets',
    tabs: tabs.map(tab => ({
      ...tab,
      role: 'tab',
      'aria-selected': false,
      'aria-controls': `${tab.id}-panel`,
      'aria-describedby': `${tab.id}-description`,
    })),
    panels: tabs.map(tab => ({
      id: `${tab.id}-panel`,
      role: 'tabpanel',
      'aria-labelledby': tab.id,
      'aria-describedby': `${tab.id}-description`,
    })),
  };
}

// Fonction pour créer des descriptions de formulaire
export function createFormDescription(fields: Array<{ name: string; label: string; required: boolean; description?: string }>) {
  return {
    'aria-describedby': 'form-description',
    description: fields.map(field => 
      `${field.label}${field.required ? ' (requis)' : ''}${field.description ? `: ${field.description}` : ''}`
    ).join(', '),
  };
}
