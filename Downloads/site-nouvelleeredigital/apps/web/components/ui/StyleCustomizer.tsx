"use client";

import React, { useState, useEffect } from 'react';
import { useStyle } from '@/contexts/StyleContext';
import { X, Palette, Type, Layout, Download, Upload, RotateCcw, Sparkles, Eye, Zap, Wand2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemePresets, SaveCustomTheme } from './ThemePresets';
import { AccessibilityChecker } from './AccessibilityChecker';
import { AnimationCustomizerComponent } from './AnimationCustomizer';
import { SmartColorGenerator } from './SmartColorGenerator';

export const StyleCustomizer = () => {
  const { config, saveConfig, resetConfig } = useStyle();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'typography' | 'colors' | 'layout' | 'themes' | 'accessibility' | 'animations' | 'generator'>('typography');

  // Export/Import des thèmes
  const exportTheme = () => {
    const dataStr = JSON.stringify(config, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = `theme-${Date.now()}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  // Écouter l'événement pour ouvrir le personnaliseur depuis l'extérieur
  useEffect(() => {
    const handleOpenCustomizer = () => setIsOpen(true);
    window.addEventListener('open-style-customizer', handleOpenCustomizer);
    return () => window.removeEventListener('open-style-customizer', handleOpenCustomizer);
  }, []);

  return (
    <>
      {/* Bouton flottant */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full shadow-lg flex items-center justify-center text-white hover:shadow-xl transition-shadow"
        aria-label="Ouvrir le personnalisateur"
      >
        <Palette size={24} />
      </motion.button>

      {/* Panneau latéral */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
            />

            {/* Panneau */}
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
                  Personnalisation
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                  aria-label="Fermer"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-gray-200 dark:border-zinc-700">
                <button
                  onClick={() => setActiveTab('typography')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 transition-colors ${
                    activeTab === 'typography'
                      ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-b-2 border-purple-600'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Type size={18} />
                  <span className="text-sm font-medium">Typo</span>
                </button>
                <button
                  onClick={() => setActiveTab('colors')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 transition-colors ${
                    activeTab === 'colors'
                      ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-b-2 border-purple-600'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Palette size={18} />
                  <span className="text-sm font-medium">Couleurs</span>
                </button>
                <button
                  onClick={() => setActiveTab('layout')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 transition-colors ${
                    activeTab === 'layout'
                      ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-b-2 border-purple-600'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Layout size={18} />
                  <span className="text-sm font-medium">Mise en page</span>
                </button>
                <button
                  onClick={() => setActiveTab('themes')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 transition-colors ${
                    activeTab === 'themes'
                      ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-b-2 border-purple-600'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Sparkles size={18} />
                  <span className="text-sm font-medium">Thèmes</span>
                </button>
                <button
                  onClick={() => setActiveTab('accessibility')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 transition-colors ${
                    activeTab === 'accessibility'
                      ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-b-2 border-purple-600'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Eye size={18} />
                  <span className="text-sm font-medium">Accessibilité</span>
                </button>
                <button
                  onClick={() => setActiveTab('animations')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 transition-colors ${
                    activeTab === 'animations'
                      ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-b-2 border-purple-600'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Zap size={18} />
                  <span className="text-sm font-medium">Animations</span>
                </button>
                <button
                  onClick={() => setActiveTab('generator')}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 transition-colors ${
                    activeTab === 'generator'
                      ? 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-b-2 border-purple-600'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Wand2 size={18} />
                  <span className="text-sm font-medium">Générateur</span>
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {/* Onglet Typographie */}
                {activeTab === 'typography' && (
                  <div className="space-y-6">
                    {/* Style des titres */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        Style des titres
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { value: 'default', label: 'Par défaut', preview: 'Titre Simple' },
                          { value: 'underlined', label: 'Souligné', preview: 'Titre Souligné' },
                          { value: 'shadow', label: 'Ombre', preview: 'Titre Ombre' },
                          { value: 'fade', label: 'Dégradé', preview: 'Titre Dégradé' },
                          { value: 'slide', label: 'Glissant', preview: 'Titre Glissant' },
                          { value: 'bold', label: 'Gras', preview: 'Titre Gras' },
                          { value: 'minimal', label: 'Minimal', preview: 'Titre Minimal' },
                        ].map((variant) => (
                          <button
                            key={variant.value}
                            onClick={() => saveConfig({ ...config, headingVariant: variant.value as any })}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              config.headingVariant === variant.value
                                ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                                : 'border-gray-200 dark:border-zinc-700 hover:border-purple-300'
                            }`}
                          >
                            <div className="text-xs font-medium mb-1">{variant.label}</div>
                            <div className="text-xs text-gray-500">{variant.preview}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Police du corps */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        Police du texte
                      </label>
                      <div className="space-y-2">
                        {[
                          { value: 'inter', label: 'Inter', class: 'font-sans' },
                          { value: 'roboto', label: 'Roboto', class: 'font-sans' },
                          { value: 'playfair', label: 'Playfair', class: 'font-serif' },
                          { value: 'mono', label: 'Monospace', class: 'font-mono' },
                        ].map((font) => (
                          <button
                            key={font.value}
                            onClick={() => saveConfig({ ...config, bodyFont: font.value as any })}
                            className={`w-full p-3 rounded-lg border-2 text-left transition-all ${font.class} ${
                              config.bodyFont === font.value
                                ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                                : 'border-gray-200 dark:border-zinc-700 hover:border-purple-300'
                            }`}
                          >
                            <div className="font-medium">{font.label}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              Exemple de texte avec cette police
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Onglet Couleurs */}
                {activeTab === 'colors' && (
                  <div className="space-y-6">
                    {/* Couleur primaire */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        Couleur primaire
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={config.primaryColor}
                          onChange={(e) => saveConfig({ ...config, primaryColor: e.target.value })}
                          className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200"
                        />
                        <input
                          type="text"
                          value={config.primaryColor}
                          onChange={(e) => saveConfig({ ...config, primaryColor: e.target.value })}
                          className="flex-1 px-4 py-2 border-2 border-gray-200 dark:border-zinc-700 rounded-lg font-mono text-sm"
                        />
                      </div>
                    </div>

                    {/* Couleur secondaire */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        Couleur secondaire
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={config.secondaryColor}
                          onChange={(e) => saveConfig({ ...config, secondaryColor: e.target.value })}
                          className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200"
                        />
                        <input
                          type="text"
                          value={config.secondaryColor}
                          onChange={(e) => saveConfig({ ...config, secondaryColor: e.target.value })}
                          className="flex-1 px-4 py-2 border-2 border-gray-200 dark:border-zinc-700 rounded-lg font-mono text-sm"
                        />
                      </div>
                    </div>

                    {/* Couleur d'accent */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        Couleur d'accent
                      </label>
                      <div className="flex items-center gap-3">
                        <input
                          type="color"
                          value={config.accentColor}
                          onChange={(e) => saveConfig({ ...config, accentColor: e.target.value })}
                          className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-200"
                        />
                        <input
                          type="text"
                          value={config.accentColor}
                          onChange={(e) => saveConfig({ ...config, accentColor: e.target.value })}
                          className="flex-1 px-4 py-2 border-2 border-gray-200 dark:border-zinc-700 rounded-lg font-mono text-sm"
                        />
                      </div>
                    </div>

                    {/* Aperçu */}
                    <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg space-y-2">
                      <div className="text-xs font-semibold text-gray-500 mb-3">Aperçu</div>
                      <div
                        className="h-12 rounded-lg flex items-center justify-center text-white font-medium"
                        style={{ backgroundColor: config.primaryColor }}
                      >
                        Primaire
                      </div>
                      <div
                        className="h-12 rounded-lg flex items-center justify-center text-white font-medium"
                        style={{ backgroundColor: config.secondaryColor }}
                      >
                        Secondaire
                      </div>
                      <div
                        className="h-12 rounded-lg flex items-center justify-center text-white font-medium"
                        style={{ backgroundColor: config.accentColor }}
                      >
                        Accent
                      </div>
                    </div>
                  </div>
                )}

                {/* Onglet Mise en page */}
                {activeTab === 'layout' && (
                  <div className="space-y-6">
                    {/* Arrondi des bordures */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        Arrondi des bordures
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { value: 'none', label: 'Aucun', preview: 'rounded-none' },
                          { value: 'small', label: 'Petit', preview: 'rounded-sm' },
                          { value: 'medium', label: 'Moyen', preview: 'rounded-md' },
                          { value: 'large', label: 'Large', preview: 'rounded-lg' },
                          { value: 'xl', label: 'XL', preview: 'rounded-xl' },
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => saveConfig({ ...config, borderRadius: option.value as any })}
                            className={`p-3 rounded-lg border-2 transition-all ${
                              config.borderRadius === option.value
                                ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                                : 'border-gray-200 dark:border-zinc-700 hover:border-purple-300'
                            }`}
                          >
                            <div className={`w-full h-8 bg-gray-300 ${option.preview} mb-2`}></div>
                            <div className="text-xs font-medium">{option.label}</div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Espacement */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        Espacement
                      </label>
                      <div className="space-y-2">
                        {[
                          { value: 'compact', label: 'Compact', size: 'p-2' },
                          { value: 'comfortable', label: 'Confortable', size: 'p-4' },
                          { value: 'spacious', label: 'Spacieux', size: 'p-6' },
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => saveConfig({ ...config, spacing: option.value as any })}
                            className={`w-full rounded-lg border-2 text-left transition-all ${option.size} ${
                              config.spacing === option.value
                                ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                                : 'border-gray-200 dark:border-zinc-700 hover:border-purple-300'
                            }`}
                          >
                            <div className="font-medium">{option.label}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              Exemple avec espacement {option.label.toLowerCase()}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Mode clair/sombre */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                        Mode d'affichage
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => saveConfig({ ...config, mode: 'light' })}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            config.mode === 'light'
                              ? 'border-purple-600 bg-purple-50'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <div className="w-full h-12 bg-white border border-gray-200 rounded mb-2"></div>
                          <div className="text-sm font-medium">Clair</div>
                        </button>
                        <button
                          onClick={() => saveConfig({ ...config, mode: 'dark' })}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            config.mode === 'dark'
                              ? 'border-purple-600 bg-purple-900/20'
                              : 'border-gray-200 hover:border-purple-300'
                          }`}
                        >
                          <div className="w-full h-12 bg-gray-900 rounded mb-2"></div>
                          <div className="text-sm font-medium">Sombre</div>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Onglet Thèmes */}
                {activeTab === 'themes' && (
                  <div className="space-y-6">
                    <ThemePresets />
                    <SaveCustomTheme />
                  </div>
                )}

                {/* Onglet Accessibilité */}
                {activeTab === 'accessibility' && (
                  <AccessibilityChecker />
                )}

                {/* Onglet Générateur */}
                {activeTab === 'generator' && (
                  <SmartColorGenerator />
                )}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={exportTheme}
                    className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 dark:border-zinc-600 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <Download size={16} />
                    <span className="text-sm font-medium">Exporter</span>
                  </button>
                  <label className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-gray-300 dark:border-zinc-600 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
                    <Upload size={16} />
                    <span className="text-sm font-medium">Importer</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={importTheme}
                      className="hidden"
                    />
                  </label>
                </div>
                <button
                  onClick={resetConfig}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                >
                  <RotateCcw size={16} />
                  <span className="text-sm font-medium">Réinitialiser</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
