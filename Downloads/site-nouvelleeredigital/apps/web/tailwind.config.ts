import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.25rem",
        lg: "2rem",
        xl: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      // ==============================================
      // DESIGN SYSTEM - COULEURS HIÉRARCHISÉES
      // ==============================================
      colors: {
        // Couleurs sémantiques avec rôles clairs
        primary: {
          50: 'var(--color-primary-50)',
          100: 'var(--color-primary-100)',
          200: 'var(--color-primary-200)',
          300: 'var(--color-primary-300)',
          400: 'var(--color-primary-400)',
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
          800: 'var(--color-primary-800)',
          900: 'var(--color-primary-900)',
          950: 'var(--color-primary-950)',
        },
        secondary: {
          50: 'var(--color-secondary-50)',
          100: 'var(--color-secondary-100)',
          200: 'var(--color-secondary-200)',
          300: 'var(--color-secondary-300)',
          400: 'var(--color-secondary-400)',
          500: 'var(--color-secondary-500)',
          600: 'var(--color-secondary-600)',
          700: 'var(--color-secondary-700)',
          800: 'var(--color-secondary-800)',
          900: 'var(--color-secondary-900)',
          950: 'var(--color-secondary-950)',
        },
        surface: {
          50: 'var(--color-surface-50)',
          100: 'var(--color-surface-100)',
          200: 'var(--color-surface-200)',
          300: 'var(--color-surface-300)',
          400: 'var(--color-surface-400)',
          500: 'var(--color-surface-500)',
          600: 'var(--color-surface-600)',
          700: 'var(--color-surface-700)',
          800: 'var(--color-surface-800)',
          900: 'var(--color-surface-900)',
          950: 'var(--color-surface-950)',
        },

        // Couleurs sémantiques pour les composants
        background: {
          DEFAULT: 'var(--color-background)',
          subtle: 'var(--color-background-subtle)',
        },
        foreground: 'var(--color-text-primary)',
        card: {
          DEFAULT: 'var(--color-surface-elevated)',
          foreground: 'var(--color-text-primary)',
        },
        popover: {
          DEFAULT: 'var(--color-surface-elevated)',
          foreground: 'var(--color-text-primary)',
        },
        muted: {
          DEFAULT: 'var(--color-surface-100)',
          foreground: 'var(--color-text-muted)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
          foreground: 'var(--color-text-inverse)',
        },
        border: 'var(--color-border)',
        input: 'var(--color-border)',
        ring: 'var(--color-interactive)',

        // Couleurs de statut avec rôles clairs
        success: {
          DEFAULT: 'var(--color-success)',
          foreground: 'var(--color-text-inverse)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
          foreground: 'var(--color-text-primary)',
        },
        error: {
          DEFAULT: 'var(--color-error)',
          foreground: 'var(--color-text-inverse)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
          foreground: 'var(--color-text-inverse)',
        },

        // Couleurs de texte avec hiérarchie
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
          subtle: 'var(--color-text-subtle)',
          inverse: 'var(--color-text-inverse)',
        },

        // Couleurs interactives
        interactive: {
          DEFAULT: 'var(--color-interactive)',
          hover: 'var(--color-interactive-hover)',
          active: 'var(--color-interactive-active)',
        },
      },

      // ==============================================
      // DESIGN SYSTEM - ESPACEMENT COHÉRENT
      // ==============================================
      spacing: {
        // Échelle d'espacement (multiples de 4px)
        'xs': 'var(--space-xs)',      // 4px
        'sm': 'var(--space-sm)',      // 8px
        'md': 'var(--space-md)',      // 12px
        'lg': 'var(--space-lg)',      // 16px
        'xl': 'var(--space-xl)',      // 24px
        '2xl': 'var(--space-2xl)',    // 32px
        '3xl': 'var(--space-3xl)',    // 48px
        '4xl': 'var(--space-4xl)',    // 64px
        '5xl': 'var(--space-5xl)',    // 96px

        // Espacement horizontal
        'inline-xs': 'var(--space-inline-xs)',
        'inline-sm': 'var(--space-inline-sm)',
        'inline-md': 'var(--space-inline-md)',
        'inline-lg': 'var(--space-inline-lg)',
        'inline-xl': 'var(--space-inline-xl)',
        'inline-2xl': 'var(--space-inline-2xl)',
        'inline-3xl': 'var(--space-inline-3xl)',
      },

      // ==============================================
      // DESIGN SYSTEM - TYPOGRAPHIE HIÉRARCHISÉE
      // ==============================================
      fontSize: {
        // Display sizes (gros titres)
        'display-2xl': ['var(--text-display-2xl)', {
          lineHeight: 'var(--leading-tight)',
          fontWeight: '700',
        }],
        'display-xl': ['var(--text-display-xl)', {
          lineHeight: 'var(--leading-tight)',
          fontWeight: '700',
        }],
        'display-lg': ['var(--text-display-lg)', {
          lineHeight: 'var(--leading-tight)',
          fontWeight: '700',
        }],
        'display-md': ['var(--text-display-md)', {
          lineHeight: 'var(--leading-snug)',
          fontWeight: '600',
        }],
        'display-sm': ['var(--text-display-sm)', {
          lineHeight: 'var(--leading-snug)',
          fontWeight: '600',
        }],

        // Heading sizes (titres)
        'heading-2xl': ['var(--text-heading-2xl)', {
          lineHeight: 'var(--leading-tight)',
          fontWeight: '600',
        }],
        'heading-xl': ['var(--text-heading-xl)', {
          lineHeight: 'var(--leading-snug)',
          fontWeight: '600',
        }],
        'heading-lg': ['var(--text-heading-lg)', {
          lineHeight: 'var(--leading-snug)',
          fontWeight: '500',
        }],
        'heading-md': ['var(--text-heading-md)', {
          lineHeight: 'var(--leading-normal)',
          fontWeight: '500',
        }],
        'heading-sm': ['var(--text-heading-sm)', {
          lineHeight: 'var(--leading-normal)',
          fontWeight: '500',
        }],
        'heading-xs': ['var(--text-heading-xs)', {
          lineHeight: 'var(--leading-normal)',
          fontWeight: '500',
        }],

        // Body text (corps de texte)
        'body-2xl': ['var(--text-body-2xl)', {
          lineHeight: 'var(--leading-relaxed)',
        }],
        'body-xl': ['var(--text-body-xl)', {
          lineHeight: 'var(--leading-relaxed)',
        }],
        'body-lg': ['var(--text-body-lg)', {
          lineHeight: 'var(--leading-relaxed)',
        }],
        'body-md': ['var(--text-body-md)', {
          lineHeight: 'var(--leading-relaxed)',
        }],
        'body-sm': ['var(--text-body-sm)', {
          lineHeight: 'var(--leading-normal)',
        }],
        'body-xs': ['var(--text-body-xs)', {
          lineHeight: 'var(--leading-normal)',
        }],

        // Labels and captions
        'label-lg': ['var(--text-label-lg)', {
          lineHeight: 'var(--leading-normal)',
        }],
        'label-md': ['var(--text-label-md)', {
          lineHeight: 'var(--leading-normal)',
        }],
        'label-sm': ['var(--text-label-sm)', {
          lineHeight: 'var(--leading-tight)',
        }],
        'caption': ['var(--text-caption)', {
          lineHeight: 'var(--leading-normal)',
        }],
      },

      // ==============================================
      // DESIGN SYSTEM - ANIMATIONS ET TRANSITIONS
      // ==============================================
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-in-up': 'slideInUp 0.6s ease-out',
        'slide-in-down': 'slideInDown 0.6s ease-out',
        'bounce-subtle': 'bounceSubtle 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInUp: {
          '0%': { opacity: '0', transform: 'translateY(1rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInDown: {
          '0%': { opacity: '0', transform: 'translateY(-1rem)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
      },

      // ==============================================
      // DESIGN SYSTEM - BORDURES ET OMBRES
      // ==============================================
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',      // 4px
        'md': '0.5rem',       // 8px
        'lg': '0.75rem',      // 12px
        'xl': '1rem',         // 16px
        '2xl': '1.5rem',      // 24px
        '3xl': '2rem',        // 32px
        'full': '9999px',
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'md': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'lg': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        'xl': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
        'none': '0 0 #0000',
      },
    },
  },
  plugins: [],
};

export default config;
