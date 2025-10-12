"use client";

import React, { useState } from 'react';
import { useTheme } from '@/components/context/ThemeProvider';
import { Button } from './Button';
import { Palette, Save, RotateCcw, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Theme } from '@/shared/theme.types';

interface ThemeCustomizerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ThemeCustomizer = ({ isOpen, onClose }: ThemeCustomizerProps) => {
  const { currentTheme, setCustomTheme } = useTheme();
  const [customTheme, setLocalCustomTheme] = useState<Theme>(currentTheme);

  // Mettre à jour le thème local
  const updateCustomTheme = (updates: Partial<Theme>) => {
    setLocalCustomTheme(prev => ({ ...prev, ...updates }));
  };

  // Appliquer le thème personnalisé
  const applyCustomTheme = () => {
    setCustomTheme(customTheme);
    onClose();
  };

  // Réinitialiser aux valeurs par défaut
  const resetToDefault = () => {
    setLocalCustomTheme(currentTheme);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <>
        {/* Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        />

        {/* Panneau de personnalisation */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-zinc-900 shadow-2xl z-50 overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-zinc-700">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Personnalisation Avancée
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
              aria-label="Fermer"
            >
              <X size={20} />
            </button>
          </div>

          {/* Contenu */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Couleurs principales */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Couleurs principales
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(customTheme.colors).map(([key, value]) => (
                  <div key={key}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 capitalize">
                      {key === 'primary' ? 'Primaire' :
                       key === 'secondary' ? 'Secondaire' :
                       key === 'accent' ? 'Accent' :
                       key === 'background' ? 'Fond' :
                       key === 'foreground' ? 'Texte' :
                       key === 'card' ? 'Cartes' : key}
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="color"
                        value={value}
                        onChange={(e) => updateCustomTheme({
                          colors: { ...customTheme.colors, [key]: e.target.value }
                        })}
                        className="w-12 h-12 rounded-lg cursor-pointer border-2 border-gray-200"
                      />
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => updateCustomTheme({
                          colors: { ...customTheme.colors, [key]: e.target.value }
                        })}
                        className="flex-1 px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white text-sm font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typographie */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Typographie
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Police Sans-serif
                  </label>
                  <select
                    value={customTheme.typography.fontFamily.sans}
                    onChange={(e) => updateCustomTheme({
                      typography: {
                        ...customTheme.typography,
                        fontFamily: { ...customTheme.typography.fontFamily, sans: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                  >
                    <option value='"Inter", sans-serif'>Inter</option>
                    <option value='"Roboto", sans-serif'>Roboto</option>
                    <option value='"Open Sans", sans-serif'>Open Sans</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Police Serif
                  </label>
                  <select
                    value={customTheme.typography.fontFamily.serif}
                    onChange={(e) => updateCustomTheme({
                      typography: {
                        ...customTheme.typography,
                        fontFamily: { ...customTheme.typography.fontFamily, serif: e.target.value }
                      }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                  >
                    <option value='"Playfair Display", serif'>Playfair Display</option>
                    <option value='"Roboto", serif'>Roboto</option>
                    <option value='"Georgia", serif'>Georgia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Styles */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Styles
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Arrondi des bordures
                  </label>
                  <select
                    value={customTheme.styles.borderRadius}
                    onChange={(e) => updateCustomTheme({
                      styles: { ...customTheme.styles, borderRadius: e.target.value }
                    })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white"
                  >
                    <option value="0rem">Aucun</option>
                    <option value="0.25rem">Petit</option>
                    <option value="0.5rem">Moyen</option>
                    <option value="0.75rem">Large</option>
                    <option value="1rem">Extra large</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Aperçu en temps réel */}
            <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Aperçu en temps réel
              </h4>
              <div
                className="p-4 rounded-lg text-white text-center"
                style={{
                  backgroundColor: customTheme.colors.primary,
                  fontFamily: customTheme.typography.fontFamily.sans,
                  borderRadius: customTheme.styles.borderRadius
                }}
              >
                <div className="text-lg font-bold">Titre Principal</div>
                <div className="text-sm mt-2 opacity-90">
                  Texte secondaire avec la nouvelle palette
                </div>
              </div>
            </div>
          </div>

          {/* Footer avec boutons d'action */}
          <div className="border-t border-gray-200 dark:border-zinc-700 p-6">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={resetToDefault}
                className="flex items-center gap-2"
              >
                <RotateCcw size={16} />
                Réinitialiser
              </Button>
              <Button
                onClick={applyCustomTheme}
                className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700"
              >
                <Save size={16} />
                Appliquer le thème
              </Button>
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
};
