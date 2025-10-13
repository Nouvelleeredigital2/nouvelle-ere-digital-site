// apps/web/components/context/ThemeProvider.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { galaxyTheme, corporateTheme, oceanTheme, sunsetTheme, forestTheme, midnightTheme } from '@/themes'; // Importez vos thèmes
import type { Theme } from '@/shared/theme.types';

const themes = {
  galaxy: galaxyTheme,
  corporate: corporateTheme,
  ocean: oceanTheme,
  sunset: sunsetTheme,
  forest: forestTheme,
  midnight: midnightTheme,
};

type ThemeName = keyof typeof themes;

interface ThemeContextType {
  theme: ThemeName;
  setTheme: (name: ThemeName) => void;
  currentTheme: Theme;
  customTheme?: Theme; // Pour les thèmes personnalisés
  setCustomTheme: (theme: Theme) => void;
  // État pour le personnaliseur
  isCustomizerOpen: boolean;
  openCustomizer: () => void;
  closeCustomizer: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeName>('galaxy'); // Thème par défaut
  const [customTheme, setCustomThemeState] = useState<Theme | undefined>(undefined);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  // Charger le thème personnalisé depuis localStorage au montage
  useEffect(() => {
    const savedCustomTheme = localStorage.getItem('custom-theme');
    if (savedCustomTheme) {
      try {
        setCustomThemeState(JSON.parse(savedCustomTheme));
      } catch (error) {
        console.error('Erreur lors du chargement du thème personnalisé:', error);
      }
    }
  }, []);

  // Effet pour appliquer les variables CSS au changement de thème
  useEffect(() => {
    const activeTheme = customTheme || themes[theme];
    const root = window.document.documentElement;

    // Appliquer les couleurs
    Object.entries(activeTheme.colors).forEach(([key, value]) => {
      root.style.setProperty(`--color-${key}`, value);
    });

    // Appliquer la typographie
    root.style.setProperty('--font-sans', activeTheme.typography.fontFamily.sans);
    root.style.setProperty('--font-serif', activeTheme.typography.fontFamily.serif);

    // Appliquer les tailles de police
    Object.entries(activeTheme.typography.fontSize).forEach(([key, value]) => {
      root.style.setProperty(`--font-size-${key}`, value);
    });

    // Appliquer les styles
    root.style.setProperty('--border-radius', activeTheme.styles.borderRadius);
    root.style.setProperty('--card-shadow', activeTheme.styles.cardShadow);

    // Classe CSS pour le thème actif
    root.classList.remove(...Object.keys(themes));
    root.classList.add(theme);

    // Sauvegarder le thème personnalisé si présent
    if (customTheme) {
      localStorage.setItem('custom-theme', JSON.stringify(customTheme));
    }
  }, [theme, customTheme]);

  const setCustomTheme = (newCustomTheme: Theme) => {
    setCustomThemeState(newCustomTheme);
    localStorage.setItem('custom-theme', JSON.stringify(newCustomTheme));
  };

  const openCustomizer = () => setIsCustomizerOpen(true);
  const closeCustomizer = () => setIsCustomizerOpen(false);

  const value = useMemo(() => ({
    theme,
    setTheme,
    currentTheme: customTheme || themes[theme],
    customTheme,
    setCustomTheme,
    isCustomizerOpen,
    openCustomizer,
    closeCustomizer,
  }), [theme, customTheme, isCustomizerOpen]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
