import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        foreground: 'var(--color-foreground)',
        primary: {
          DEFAULT: 'var(--color-primary)',
          foreground: '#ffffff', // Couleur du texte sur un bouton primaire
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)',
          foreground: '#1e293b', // Couleur du texte sur un bouton secondaire
        },
        card: 'var(--color-card)',
        border: 'var(--color-border)',
        'muted-foreground': 'var(--color-muted-foreground)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        serif: ['var(--font-serif)', 'serif'],
      },
      borderRadius: {
        lg: `var(--border-radius)`,
        md: `calc(var(--border-radius) - 4px)`,
        sm: `calc(var(--border-radius) - 6px)`,
      },
      boxShadow: {
        'card-shadow': 'var(--card-shadow)',
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
