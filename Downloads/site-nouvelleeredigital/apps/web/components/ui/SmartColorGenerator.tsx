// components/ui/SmartColorGenerator.tsx
"use client";

import { useState } from 'react';
import { useStyle } from '@/contexts/StyleContext';
import { Sparkles, RefreshCw, Wand2, Palette, TrendingUp } from 'lucide-react';

// ==================== ALGORITHMES DE GÉNÉRATION ====================

/**
 * Convertit HSL en HEX
 */
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Convertit HEX en HSL
 */
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 0, l: 0 };

  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
      case g: h = ((b - r) / d + 2) / 6; break;
      case b: h = ((r - g) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

/**
 * Génère une palette complémentaire
 */
function generateComplementary(baseColor: string): string[] {
  const hsl = hexToHsl(baseColor);
  return [
    baseColor,
    hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
    hslToHex(hsl.h, hsl.s, Math.max(10, hsl.l - 20)),
  ];
}

/**
 * Génère une palette analogique
 */
function generateAnalogous(baseColor: string): string[] {
  const hsl = hexToHsl(baseColor);
  return [
    hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
    baseColor,
    hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
  ];
}

/**
 * Génère une palette triadique
 */
function generateTriadic(baseColor: string): string[] {
  const hsl = hexToHsl(baseColor);
  return [
    baseColor,
    hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
    hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
  ];
}

/**
 * Génère une palette monochromatique
 */
function generateMonochromatic(baseColor: string): string[] {
  const hsl = hexToHsl(baseColor);
  return [
    hslToHex(hsl.h, hsl.s, Math.min(90, hsl.l + 20)),
    baseColor,
    hslToHex(hsl.h, hsl.s, Math.max(10, hsl.l - 20)),
  ];
}

/**
 * Génère une palette basée sur une émotion
 */
function generateByMood(mood: string): string[] {
  const moodPalettes: { [key: string]: string[] } = {
    calm: ['#a7c6da', '#7fa1b3', '#c4dfe6'],
    energetic: ['#ff6b6b', '#f06595', '#ffd93d'],
    professional: ['#1e40af', '#0369a1', '#0891b2'],
    creative: ['#ec4899', '#8b5cf6', '#f59e0b'],
    nature: ['#059669', '#10b981', '#84cc16'],
    luxury: ['#7c3aed', '#9333ea', '#a855f7'],
  };

  return moodPalettes[mood] || moodPalettes.professional;
}

/**
 * Génère une palette tendance pour une année
 */
function generateTrending(year: number): string[] {
  const trendingPalettes: { [key: number]: string[] } = {
    2024: ['#b5838d', '#6d597a', '#e5989b'],
    2025: ['#00d4aa', '#0891b2', '#6366f1'],
  };

  return trendingPalettes[year] || trendingPalettes[2025];
}

/**
 * Génère une palette aléatoire harmonieuse
 */
function generateRandom(): string[] {
  const baseHue = Math.floor(Math.random() * 360);
  const baseSat = 60 + Math.floor(Math.random() * 30);
  const baseLig = 50 + Math.floor(Math.random() * 20);

  return [
    hslToHex(baseHue, baseSat, baseLig),
    hslToHex((baseHue + 30) % 360, baseSat, baseLig),
    hslToHex((baseHue + 60) % 360, baseSat, baseLig),
  ];
}

// ==================== TYPES ====================

interface ColorPalette {
  id: string;
  name: string;
  description: string;
  colors: string[];
  category: string;
}

// ==================== COMPOSANT PRINCIPAL ====================

export const SmartColorGenerator = () => {
  const { config, saveConfig } = useStyle();
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('complementary');
  const [baseColor, setBaseColor] = useState(config.primaryColor);
  const [generatedPalettes, setGeneratedPalettes] = useState<ColorPalette[]>([]);
  const [selectedMood, setSelectedMood] = useState<string>('professional');

  const algorithms = [
    { id: 'complementary', name: 'Complémentaire', desc: 'Couleurs opposées sur le cercle chromatique', icon: '🎨' },
    { id: 'analogous', name: 'Analogique', desc: 'Couleurs adjacentes harmonieuses', icon: '🌈' },
    { id: 'triadic', name: 'Triadique', desc: 'Trois couleurs équidistantes', icon: '🔺' },
    { id: 'monochromatic', name: 'Monochromatique', desc: 'Variations d\'une seule couleur', icon: '📊' },
    { id: 'mood', name: 'Par Émotion', desc: 'Basé sur un sentiment', icon: '😊' },
    { id: 'trending', name: 'Tendance 2025', desc: 'Couleurs actuelles', icon: '🔥' },
    { id: 'random', name: 'Aléatoire', desc: 'Palette surprise harmonieuse', icon: '🎲' },
  ];

  const moods = [
    { id: 'calm', name: 'Calme', emoji: '🌊', desc: 'Apaisant et serein' },
    { id: 'energetic', name: 'Énergique', emoji: '⚡', desc: 'Dynamique et vif' },
    { id: 'professional', name: 'Professionnel', emoji: '💼', desc: 'Sérieux et fiable' },
    { id: 'creative', name: 'Créatif', emoji: '🎨', desc: 'Audacieux et original' },
    { id: 'nature', name: 'Nature', emoji: '🌿', desc: 'Naturel et organique' },
    { id: 'luxury', name: 'Luxe', emoji: '👑', desc: 'Élégant et raffiné' },
  ];

  const generatePalette = () => {
    let colors: string[] = [];

    switch (selectedAlgorithm) {
      case 'complementary':
        colors = generateComplementary(baseColor);
        break;
      case 'analogous':
        colors = generateAnalogous(baseColor);
        break;
      case 'triadic':
        colors = generateTriadic(baseColor);
        break;
      case 'monochromatic':
        colors = generateMonochromatic(baseColor);
        break;
      case 'mood':
        colors = generateByMood(selectedMood);
        break;
      case 'trending':
        colors = generateTrending(2025);
        break;
      case 'random':
        colors = generateRandom();
        break;
    }

    const newPalette: ColorPalette = {
      id: Date.now().toString(),
      name: algorithms.find(a => a.id === selectedAlgorithm)?.name || 'Palette',
      description: algorithms.find(a => a.id === selectedAlgorithm)?.desc || '',
      colors,
      category: selectedAlgorithm,
    };

    setGeneratedPalettes([newPalette, ...generatedPalettes.slice(0, 4)]);
  };

  const applyPalette = (palette: ColorPalette) => {
    saveConfig({
      ...config,
      primaryColor: palette.colors[0],
      secondaryColor: palette.colors[1],
      accentColor: palette.colors[2],
    });
  };

  const generateMultiple = () => {
    const palettes: ColorPalette[] = [];

    algorithms.filter(a => a.id !== 'mood').forEach((algo) => {
      let colors: string[] = [];

      switch (algo.id) {
        case 'complementary':
          colors = generateComplementary(baseColor);
          break;
        case 'analogous':
          colors = generateAnalogous(baseColor);
          break;
        case 'triadic':
          colors = generateTriadic(baseColor);
          break;
        case 'monochromatic':
          colors = generateMonochromatic(baseColor);
          break;
        case 'trending':
          colors = generateTrending(2025);
          break;
        case 'random':
          colors = generateRandom();
          break;
      }

      palettes.push({
        id: `${algo.id}-${Date.now()}`,
        name: algo.name,
        description: algo.desc,
        colors,
        category: algo.id,
      });
    });

    setGeneratedPalettes(palettes);
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="text-purple-600" size={24} />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Générateur de Palettes
          </h3>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Créez des palettes de couleurs harmonieuses automatiquement
        </p>
      </div>

      {/* Couleur de base */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Couleur de base
        </label>
        <div className="flex gap-3">
          <input
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="w-20 h-20 rounded-lg cursor-pointer border-2 border-gray-200"
          />
          <div className="flex-1">
            <input
              type="text"
              value={baseColor}
              onChange={(e) => setBaseColor(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-gray-900 dark:text-white font-mono"
            />
            <div className="text-xs text-gray-500 mt-2">
              Cette couleur servira de base pour générer les palettes
            </div>
          </div>
        </div>
      </div>

      {/* Algorithmes */}
      <div>
        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
          Algorithme de génération
        </label>
        <div className="grid grid-cols-2 gap-2">
          {algorithms.map((algo) => (
            <button
              key={algo.id}
              onClick={() => setSelectedAlgorithm(algo.id)}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                selectedAlgorithm === algo.id
                  ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                  : 'border-gray-200 dark:border-zinc-700 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">{algo.icon}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {algo.name}
                </span>
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                {algo.desc}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Options pour l'algorithme "mood" */}
      {selectedAlgorithm === 'mood' && (
        <div>
          <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Émotion
          </label>
          <div className="grid grid-cols-3 gap-2">
            {moods.map((mood) => (
              <button
                key={mood.id}
                onClick={() => setSelectedMood(mood.id)}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  selectedMood === mood.id
                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20'
                    : 'border-gray-200 dark:border-zinc-700 hover:border-purple-300'
                }`}
              >
                <div className="text-2xl mb-1">{mood.emoji}</div>
                <div className="text-xs font-medium text-gray-900 dark:text-white">
                  {mood.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Boutons d'action */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={generatePalette}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
        >
          <Wand2 size={18} />
          Générer 1 palette
        </button>
        <button
          onClick={generateMultiple}
          className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
        >
          <Sparkles size={18} />
          Générer toutes
        </button>
      </div>

      {/* Palettes générées */}
      {generatedPalettes.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white">
              Palettes générées
            </label>
            <button
              onClick={() => setGeneratedPalettes([])}
              className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Effacer tout
            </button>
          </div>

          <div className="space-y-3">
            {generatedPalettes.map((palette) => (
              <div
                key={palette.id}
                className="p-4 bg-white dark:bg-zinc-800 rounded-lg border border-gray-200 dark:border-zinc-700 hover:border-purple-300 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {palette.name}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {palette.description}
                    </div>
                  </div>
                  <button
                    onClick={() => applyPalette(palette)}
                    className="px-3 py-1 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Appliquer
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {palette.colors.map((color, index) => (
                    <div key={index} className="text-center">
                      <div
                        className="h-16 rounded-lg border-2 border-white dark:border-zinc-700 shadow-sm mb-2"
                        style={{ backgroundColor: color }}
                      />
                      <div className="text-xs font-mono text-gray-600 dark:text-gray-400">
                        {color}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        {index === 0 ? 'Primaire' : index === 1 ? 'Secondaire' : 'Accent'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Informations */}
      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex gap-3">
          <div className="text-blue-600 dark:text-blue-400 text-xl">
            💡
          </div>
          <div className="flex-1 text-sm text-blue-900 dark:text-blue-200">
            <div className="font-medium mb-1">Comment ça marche ?</div>
            <ul className="space-y-1 list-disc list-inside">
              <li>Choisissez une couleur de base</li>
              <li>Sélectionnez un algorithme</li>
              <li>Générez des palettes harmonieuses</li>
              <li>Appliquez celle qui vous plaît</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tendances */}
      <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
        <div className="flex items-center gap-3 mb-3">
          <TrendingUp className="text-purple-600" size={20} />
          <div className="font-medium text-gray-900 dark:text-white">
            Tendances 2025
          </div>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          Les palettes tendances intègrent les couleurs populaires de l'année en cours,
          basées sur les prévisions des institutions de design comme Pantone.
        </div>
      </div>
    </div>
  );
};
