// components/ui/AccessibilityChecker.tsx
"use client";

import { useState, useEffect } from 'react';
import { useStyle } from '@/contexts/StyleContext';
import { Eye, AlertTriangle, CheckCircle, Info, Zap } from 'lucide-react';

// ==================== UTILITAIRES DE CALCUL ====================

/**
 * Convertit une couleur hex en RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

/**
 * Calcule la luminance relative selon WCAG
 */
function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

/**
 * Calcule le ratio de contraste selon WCAG
 */
function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  if (!rgb1 || !rgb2) return 0;

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);

  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Vérifie si le contraste est conforme WCAG
 */
function checkWCAGCompliance(ratio: number, level: 'AA' | 'AAA', size: 'normal' | 'large') {
  const thresholds = {
    AA: { normal: 4.5, large: 3 },
    AAA: { normal: 7, large: 4.5 }
  };

  return ratio >= thresholds[level][size];
}

/**
 * Suggère une couleur alternative avec meilleur contraste
 */
function suggestBetterColor(color: string, background: string, targetRatio: number = 4.5): string {
  const rgb = hexToRgb(color);
  if (!rgb) return color;

  let { r, g, b } = rgb;
  const bgRgb = hexToRgb(background);
  if (!bgRgb) return color;

  const bgLum = getLuminance(bgRgb.r, bgRgb.g, bgRgb.b);
  const shouldDarken = bgLum > 0.5;

  // Ajuster progressivement
  for (let i = 0; i < 100; i++) {
    const factor = shouldDarken ? 0.95 : 1.05;
    r = Math.max(0, Math.min(255, r * factor));
    g = Math.max(0, Math.min(255, g * factor));
    b = Math.max(0, Math.min(255, b * factor));

    const testColor = `#${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
    const ratio = getContrastRatio(testColor, background);

    if (ratio >= targetRatio) {
      return testColor;
    }
  }

  return shouldDarken ? '#000000' : '#ffffff';
}

// ==================== TYPES ====================

interface ContrastIssue {
  id: string;
  severity: 'error' | 'warning' | 'success';
  title: string;
  description: string;
  ratio: number;
  recommendation?: string;
  suggestedColor?: string;
}

// ==================== COMPOSANT PRINCIPAL ====================

export const AccessibilityChecker = () => {
  const { config, saveConfig } = useStyle();
  const [issues, setIssues] = useState<ContrastIssue[]>([]);
  const [score, setScore] = useState(0);
  const [autoFixEnabled, setAutoFixEnabled] = useState(false);

  useEffect(() => {
    analyzeAccessibility();
  }, [config]);

  const analyzeAccessibility = () => {
    const newIssues: ContrastIssue[] = [];
    const backgrounds = {
      light: '#ffffff',
      dark: '#000000'
    };

    const currentBg = backgrounds[config.mode as keyof typeof backgrounds];

    // Vérifier le contraste de la couleur primaire sur fond
    const primaryRatio = getContrastRatio(config.primaryColor, currentBg);
    if (primaryRatio < 4.5) {
      newIssues.push({
        id: 'primary-contrast',
        severity: 'error',
        title: 'Contraste insuffisant - Couleur primaire',
        description: `Le ratio de contraste est de ${primaryRatio.toFixed(2)}:1. Le minimum recommandé (WCAG AA) est de 4.5:1.`,
        ratio: primaryRatio,
        recommendation: 'Utilisez une couleur plus sombre ou plus claire pour améliorer la lisibilité.',
        suggestedColor: suggestBetterColor(config.primaryColor, currentBg)
      });
    } else if (primaryRatio < 7) {
      newIssues.push({
        id: 'primary-contrast-aaa',
        severity: 'warning',
        title: 'Contraste bon (AA) - Couleur primaire',
        description: `Le ratio de contraste est de ${primaryRatio.toFixed(2)}:1. Conforme WCAG AA mais pas AAA.`,
        ratio: primaryRatio,
        recommendation: 'Pour atteindre le niveau AAA, visez un ratio de 7:1.',
      });
    } else {
      newIssues.push({
        id: 'primary-contrast-excellent',
        severity: 'success',
        title: 'Excellent contraste - Couleur primaire',
        description: `Le ratio de contraste est de ${primaryRatio.toFixed(2)}:1. Conforme WCAG AAA !`,
        ratio: primaryRatio,
      });
    }

    // Vérifier le contraste de la couleur secondaire
    const secondaryRatio = getContrastRatio(config.secondaryColor, currentBg);
    if (secondaryRatio < 4.5) {
      newIssues.push({
        id: 'secondary-contrast',
        severity: 'error',
        title: 'Contraste insuffisant - Couleur secondaire',
        description: `Le ratio de contraste est de ${secondaryRatio.toFixed(2)}:1.`,
        ratio: secondaryRatio,
        suggestedColor: suggestBetterColor(config.secondaryColor, currentBg)
      });
    } else {
      newIssues.push({
        id: 'secondary-contrast-ok',
        severity: 'success',
        title: 'Bon contraste - Couleur secondaire',
        description: `Le ratio de contraste est de ${secondaryRatio.toFixed(2)}:1.`,
        ratio: secondaryRatio,
      });
    }

    // Vérifier le contraste de la couleur d'accent
    const accentRatio = getContrastRatio(config.accentColor, currentBg);
    if (accentRatio < 3) {
      newIssues.push({
        id: 'accent-contrast',
        severity: 'warning',
        title: 'Attention - Couleur d\'accent',
        description: `Le ratio de contraste est de ${accentRatio.toFixed(2)}:1. Acceptable pour les grands textes uniquement.`,
        ratio: accentRatio,
        suggestedColor: suggestBetterColor(config.accentColor, currentBg)
      });
    }

    // Calculer le score global
    const totalChecks = 3;
    const passedChecks = newIssues.filter(i => i.severity === 'success').length;
    const warningChecks = newIssues.filter(i => i.severity === 'warning').length;
    const calculatedScore = ((passedChecks + warningChecks * 0.5) / totalChecks) * 100;

    setIssues(newIssues);
    setScore(Math.round(calculatedScore));
  };

  const applyFix = (issue: ContrastIssue) => {
    if (!issue.suggestedColor) return;

    const updates: any = { ...config };

    if (issue.id.includes('primary')) {
      updates.primaryColor = issue.suggestedColor;
    } else if (issue.id.includes('secondary')) {
      updates.secondaryColor = issue.suggestedColor;
    } else if (issue.id.includes('accent')) {
      updates.accentColor = issue.suggestedColor;
    }

    saveConfig(updates);
  };

  const autoFixAll = () => {
    const backgrounds = {
      light: '#ffffff',
      dark: '#000000'
    };
    const currentBg = backgrounds[config.mode as keyof typeof backgrounds];

    const updates = {
      ...config,
      primaryColor: suggestBetterColor(config.primaryColor, currentBg, 4.5),
      secondaryColor: suggestBetterColor(config.secondaryColor, currentBg, 4.5),
      accentColor: suggestBetterColor(config.accentColor, currentBg, 3),
    };

    saveConfig(updates);
  };

  return (
    <div className="space-y-6">
      {/* En-tête avec score */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 p-6 text-white">
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Eye size={24} />
              <div>
                <h3 className="text-xl font-bold">Score d'Accessibilité</h3>
                <p className="text-sm text-white/80">Conformité WCAG</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold">{score}%</div>
              <div className="text-sm text-white/80">
                {score >= 80 ? 'Excellent' : score >= 60 ? 'Bon' : 'À améliorer'}
              </div>
            </div>
          </div>

          {/* Barre de progression */}
          <div className="h-2 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-500"
              style={{ width: `${score}%` }}
            />
          </div>
        </div>
      </div>

      {/* Bouton auto-fix */}
      {issues.some(i => i.severity === 'error' || i.severity === 'warning') && (
        <button
          onClick={autoFixAll}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-medium hover:from-green-700 hover:to-emerald-700 transition-all"
        >
          <Zap size={18} />
          Corriger automatiquement tous les problèmes
        </button>
      )}

      {/* Liste des problèmes */}
      <div className="space-y-3">
        {issues.map((issue) => {
          const icons = {
            error: AlertTriangle,
            warning: Info,
            success: CheckCircle
          };
          const Icon = icons[issue.severity];

          const colors = {
            error: 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20',
            warning: 'border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20',
            success: 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20'
          };

          const iconColors = {
            error: 'text-red-600 dark:text-red-400',
            warning: 'text-yellow-600 dark:text-yellow-400',
            success: 'text-green-600 dark:text-green-400'
          };

          return (
            <div
              key={issue.id}
              className={`p-4 rounded-lg border ${colors[issue.severity]}`}
            >
              <div className="flex gap-3">
                <Icon className={`flex-shrink-0 ${iconColors[issue.severity]}`} size={20} />
                <div className="flex-1 space-y-2">
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {issue.title}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {issue.description}
                    </div>
                  </div>

                  {issue.recommendation && (
                    <div className="text-sm text-gray-700 dark:text-gray-300 bg-white/50 dark:bg-black/20 p-2 rounded">
                      💡 {issue.recommendation}
                    </div>
                  )}

                  {issue.suggestedColor && (
                    <div className="flex items-center gap-3">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">
                        Correction suggérée :
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className="w-10 h-10 rounded border-2 border-white shadow-sm"
                          style={{ backgroundColor: issue.suggestedColor }}
                        />
                        <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                          {issue.suggestedColor}
                        </span>
                      </div>
                      <button
                        onClick={() => applyFix(issue)}
                        className="ml-auto px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
                      >
                        Appliquer
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Infos WCAG */}
      <div className="p-4 bg-gray-50 dark:bg-zinc-800 rounded-lg space-y-2">
        <div className="font-semibold text-gray-900 dark:text-white mb-3">
          📚 Niveaux WCAG
        </div>
        <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex justify-between">
            <span>Niveau AA (recommandé)</span>
            <span className="font-mono">4.5:1 texte normal, 3:1 grand texte</span>
          </div>
          <div className="flex justify-between">
            <span>Niveau AAA (optimal)</span>
            <span className="font-mono">7:1 texte normal, 4.5:1 grand texte</span>
          </div>
        </div>
      </div>

      {/* Preview des contrastes */}
      <div className="space-y-3">
        <div className="font-semibold text-gray-900 dark:text-white">
          Prévisualisation des contrastes
        </div>

        {[
          { color: config.primaryColor, label: 'Primaire', key: 'primary' },
          { color: config.secondaryColor, label: 'Secondaire', key: 'secondary' },
          { color: config.accentColor, label: 'Accent', key: 'accent' },
        ].map((item) => {
          const bg = config.mode === 'dark' ? '#000000' : '#ffffff';
          const ratio = getContrastRatio(item.color, bg);
          const isAA = ratio >= 4.5;
          const isAAA = ratio >= 7;

          return (
            <div
              key={item.key}
              className="p-4 rounded-lg border border-gray-200 dark:border-zinc-700"
              style={{ backgroundColor: bg }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium" style={{ color: item.color }}>
                  {item.label}
                </span>
                <div className="flex gap-2">
                  <span className={`text-xs px-2 py-1 rounded ${isAA ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {isAA ? '✓ AA' : '✗ AA'}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${isAAA ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {isAAA ? '✓ AAA' : '✗ AAA'}
                  </span>
                </div>
              </div>
              <div className="text-lg font-bold" style={{ color: item.color }}>
                Exemple de texte (ratio: {ratio.toFixed(2)}:1)
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
