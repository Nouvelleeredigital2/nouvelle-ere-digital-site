"use client";

import { useState } from 'react';
import { useTheme } from '@/components/context/ThemeProvider';
import { Button } from './Button';
import { Palette, Sun, Moon, Sparkles, Building } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = ({ className = '' }: ThemeSwitcherProps) => {
  const { theme, setTheme, currentTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const themeOptions = [
    {
      id: 'galaxy' as const,
      name: 'Galaxie',
      icon: Sparkles,
      description: 'Thème sombre et coloré inspiré de l\'espace',
      colors: ['#818cf8', '#fde047', '#34d399']
    },
    {
      id: 'corporate' as const,
      name: 'Corporate',
      icon: Building,
      description: 'Thème professionnel et sobre',
      colors: ['#2563eb', '#475569', '#16a34a']
    }
  ];

  const openCustomizer = () => {
    // Ouvrir le personnaliseur avancé
    const event = new CustomEvent('open-style-customizer');
    window.dispatchEvent(event);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Bouton principal */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-sm hover:shadow-md transition-all"
        aria-label="Sélecteur de thème"
      >
        <Palette size={18} className="text-purple-600" />
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {currentTheme.name}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          className="transition-transform"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6,9 12,15 18,9"></polyline>
          </svg>
        </motion.div>
      </motion.button>

      {/* Menu déroulant */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40"
            />

            {/* Menu */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute top-full mt-2 w-64 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-lg shadow-lg z-50 overflow-hidden"
            >
              {/* Thèmes prédéfinis */}
              <div className="p-2">
                <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2 px-2">
                  Thèmes prédéfinis
                </div>
                {themeOptions.map((themeOption) => {
                  const Icon = themeOption.icon;
                  return (
                    <motion.button
                      key={themeOption.id}
                      onClick={() => setTheme(themeOption.id)}
                      className={`w-full flex items-start gap-3 p-3 rounded-md transition-all ${
                        theme === themeOption.id
                          ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                          : 'hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-700 dark:text-gray-300'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Icon size={20} className="mt-0.5 flex-shrink-0" />
                      <div className="flex-1 text-left">
                        <div className="font-medium text-sm">{themeOption.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {themeOption.description}
                        </div>
                        <div className="flex gap-1 mt-2">
                          {themeOption.colors.map((color, index) => (
                            <div
                              key={index}
                              className="w-4 h-4 rounded-full border border-white dark:border-zinc-600"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                      {theme === themeOption.id && (
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0" />
                      )}
                    </motion.button>
                  );
                })}
              </div>

              {/* Séparateur */}
              <div className="border-t border-gray-200 dark:border-zinc-700" />

              {/* Bouton personnalisé */}
              <div className="p-2">
                <motion.button
                  onClick={openCustomizer}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Palette size={16} />
                  <span className="text-sm font-medium">Personnalisé-moi</span>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
