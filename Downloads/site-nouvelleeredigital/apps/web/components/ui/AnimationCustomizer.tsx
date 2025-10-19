// components/ui/AnimationCustomizer.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, RotateCcw, Zap, Wind } from "lucide-react";

// ==================== TYPES ====================

interface AnimationConfig {
  enabled: boolean;
  intensity: "subtle" | "normal" | "dramatic";
  speed: "slow" | "normal" | "fast";
  easing: "linear" | "easeIn" | "easeOut" | "easeInOut" | "spring" | "bounce";
  pageTransitions: boolean;
  hoverEffects: boolean;
  scrollAnimations: boolean;
  loadingAnimations: boolean;
}

// ==================== CONTEXT ====================

// À ajouter dans votre StyleContext
const defaultAnimationConfig: AnimationConfig = {
  enabled: true,
  intensity: "normal",
  speed: "normal",
  easing: "easeInOut",
  pageTransitions: true,
  hoverEffects: true,
  scrollAnimations: true,
  loadingAnimations: true,
};

// ==================== COMPOSANT PRINCIPAL ====================

export const AnimationCustomizer = () => {
  const [config, setConfig] = useState<AnimationConfig>(defaultAnimationConfig);
  const [isPlaying, setIsPlaying] = useState(false);
  const [previewAnimation, setPreviewAnimation] = useState<string>("fadeIn");

  const updateConfig = (updates: Partial<AnimationConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    localStorage.setItem("animation-config", JSON.stringify(newConfig));
  };

  // Valeurs d'animation basées sur la config
  const getAnimationValues = () => {
    const intensityMap = {
      subtle: { distance: 10, scale: 1.02, rotate: 2 },
      normal: { distance: 20, scale: 1.05, rotate: 5 },
      dramatic: { distance: 50, scale: 1.1, rotate: 10 },
    };

    const speedMap = {
      slow: 1.2,
      normal: 0.6,
      fast: 0.3,
    };

    const easingMap = {
      linear: [0, 0, 1, 1],
      easeIn: [0.42, 0, 1, 1],
      easeOut: [0, 0, 0.58, 1],
      easeInOut: [0.42, 0, 0.58, 1],
      spring: "spring",
      bounce: [0.68, -0.55, 0.265, 1.55],
    };

    return {
      intensity: intensityMap[config.intensity],
      duration: speedMap[config.speed],
      ease: easingMap[config.easing],
    };
  };

  const animations = getAnimationValues();

  // Animations de prévisualisation
  const previewVariants = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    slideUp: {
      initial: { opacity: 0, y: animations.intensity.distance },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -animations.intensity.distance },
    },
    slideDown: {
      initial: { opacity: 0, y: -animations.intensity.distance },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: animations.intensity.distance },
    },
    slideLeft: {
      initial: { opacity: 0, x: animations.intensity.distance },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -animations.intensity.distance },
    },
    slideRight: {
      initial: { opacity: 0, x: -animations.intensity.distance },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: animations.intensity.distance },
    },
    scale: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
    },
    rotate: {
      initial: { opacity: 0, rotate: -animations.intensity.rotate },
      animate: { opacity: 1, rotate: 0 },
      exit: { opacity: 0, rotate: animations.intensity.rotate },
    },
    bounce: {
      initial: { opacity: 0, y: -100 },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          type: "spring",
          bounce: 0.5,
        },
      },
      exit: { opacity: 0 },
    },
  };

  const playPreview = () => {
    setIsPlaying(true);
    setTimeout(() => setIsPlaying(false), (animations.duration + 0.5) * 1000);
  };

  const resetToDefault = () => {
    setConfig(defaultAnimationConfig);
    localStorage.removeItem("animation-config");
  };

  return (
    <div className="space-y-6">
      {/* En-tête */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Zap className="text-accent" size={24} />
          <h3 className="text-lg font-semibold text-muted-foreground dark:text-card-foreground">Animations</h3>
        </div>
        <p className="text-sm text-muted-foreground dark:text-muted-foreground">
          Personnalisez les animations de l'interface
        </p>
      </div>

      {/* Activation générale */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg border border-accent/20 dark:border-purple-800">
        <div>
          <div className="font-medium text-muted-foreground dark:text-card-foreground">Activer les animations</div>
          <div className="text-sm text-muted-foreground dark:text-muted-foreground mt-1">
            Désactiver pour améliorer les performances
          </div>
        </div>
        <button
          onClick={() => updateConfig({ enabled: !config.enabled })}
          className={`relative w-14 h-8 rounded-full transition-colors ${
            config.enabled ? "bg-accent" : "bg-muted dark:bg-muted"
          }`}
        >
          <div
            className={`absolute top-1 left-1 w-6 h-6 bg-card rounded-full shadow-md transition-transform ${
              config.enabled ? "translate-x-6" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {config.enabled && (
        <>
          {/* Intensité */}
          <div>
            <label className="block text-sm font-semibold text-muted-foreground dark:text-card-foreground mb-3">
              Intensité des animations
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["subtle", "normal", "dramatic"] as const).map((intensity) => (
                <button
                  key={intensity}
                  onClick={() => updateConfig({ intensity })}
                  className={`px-4 py-3 rounded-lg border-2 transition-all capitalize ${
                    config.intensity === intensity
                      ? "border-purple-600 bg-accent/10 dark:bg-accent/20 text-accent"
                      : "border-border dark:border-zinc-700 hover:border-accent/30"
                  }`}
                >
                  <div className="text-sm font-medium">{intensity}</div>
                  <div className="text-xs text-muted-foreground0 mt-1">
                    {intensity === "subtle" && "Discret"}
                    {intensity === "normal" && "Équilibré"}
                    {intensity === "dramatic" && "Prononcé"}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Vitesse */}
          <div>
            <label className="block text-sm font-semibold text-muted-foreground dark:text-card-foreground mb-3">
              Vitesse
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["slow", "normal", "fast"] as const).map((speed) => (
                <button
                  key={speed}
                  onClick={() => updateConfig({ speed })}
                  className={`px-4 py-3 rounded-lg border-2 transition-all capitalize ${
                    config.speed === speed
                      ? "border-purple-600 bg-accent/10 dark:bg-accent/20 text-accent"
                      : "border-border dark:border-zinc-700 hover:border-accent/30"
                  }`}
                >
                  <div className="text-sm font-medium">
                    {speed === "slow" && "🐢 Lent"}
                    {speed === "normal" && "⚡ Normal"}
                    {speed === "fast" && "🚀 Rapide"}
                  </div>
                  <div className="text-xs text-muted-foreground0 mt-1">
                    {speed === "slow" && "1.2s"}
                    {speed === "normal" && "0.6s"}
                    {speed === "fast" && "0.3s"}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Courbe d'animation */}
          <div>
            <label className="block text-sm font-semibold text-muted-foreground dark:text-card-foreground mb-3">
              Courbe d'animation (easing)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["linear", "easeIn", "easeOut", "easeInOut", "spring", "bounce"] as const).map(
                (easing) => (
                  <button
                    key={easing}
                    onClick={() => updateConfig({ easing })}
                    className={`px-4 py-3 rounded-lg border-2 transition-all ${
                      config.easing === easing
                        ? "border-purple-600 bg-accent/10 dark:bg-accent/20 text-accent"
                        : "border-border dark:border-zinc-700 hover:border-accent/30"
                    }`}
                  >
                    <div className="text-sm font-medium capitalize">
                      {easing.replace(/([A-Z])/g, " $1").trim()}
                    </div>
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Options supplémentaires */}
          <div>
            <label className="block text-sm font-semibold text-muted-foreground dark:text-card-foreground mb-3">
              Options
            </label>
            <div className="space-y-2">
              {[
                {
                  key: "pageTransitions",
                  label: "Transitions de page",
                  desc: "Animations lors du changement de page",
                },
                {
                  key: "hoverEffects",
                  label: "Effets au survol",
                  desc: "Animations lors du survol de la souris",
                },
                {
                  key: "scrollAnimations",
                  label: "Animations au scroll",
                  desc: "Animations lors du défilement",
                },
                {
                  key: "loadingAnimations",
                  label: "Animations de chargement",
                  desc: "Spinners et skeletons animés",
                },
              ].map((option) => (
                <label
                  key={option.key}
                  className="flex items-start gap-3 p-3 rounded-lg border border-border dark:border-zinc-700 cursor-pointer hover:bg-muted dark:hover:bg-zinc-800"
                >
                  <input
                    type="checkbox"
                    checked={config[option.key as keyof AnimationConfig] as boolean}
                    onChange={(e) => updateConfig({ [option.key]: e.target.checked })}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="text-sm font-medium text-muted-foreground dark:text-card-foreground">
                      {option.label}
                    </div>
                    <div className="text-xs text-muted-foreground dark:text-muted-foreground mt-1">
                      {option.desc}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Zone de prévisualisation */}
          <div>
            <label className="block text-sm font-semibold text-muted-foreground dark:text-card-foreground mb-3">
              Prévisualisation
            </label>

            {/* Sélecteur d'animation */}
            <div className="mb-4">
              <select
                value={previewAnimation}
                onChange={(e) => setPreviewAnimation(e.target.value)}
                className="w-full px-3 py-2 border border-border dark:border-zinc-600 rounded-lg bg-card dark:bg-zinc-800 text-muted-foreground dark:text-card-foreground"
              >
                <option value="fadeIn">Fade In</option>
                <option value="slideUp">Slide Up</option>
                <option value="slideDown">Slide Down</option>
                <option value="slideLeft">Slide Left</option>
                <option value="slideRight">Slide Right</option>
                <option value="scale">Scale</option>
                <option value="rotate">Rotate</option>
                <option value="bounce">Bounce</option>
              </select>
            </div>

            {/* Zone de prévisualisation */}
            <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-zinc-800 dark:to-zinc-900 rounded-lg border border-border dark:border-zinc-700 overflow-hidden">
              <AnimatePresence mode="wait">
                {isPlaying && (
                  <motion.div
                    key={previewAnimation}
                    variants={previewVariants[previewAnimation as keyof typeof previewVariants]}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{
                      duration: animations.duration,
                      ease: config.easing === "spring" ? undefined : (animations.ease as any),
                      type: config.easing === "spring" ? "spring" : undefined,
                    }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-card-foreground px-8 py-6 rounded-xl shadow-2xl">
                      <Wind size={48} className="mx-auto mb-4" />
                      <div className="text-2xl font-bold">Animation</div>
                      <div className="text-sm mt-2 opacity-90">
                        {config.intensity} · {config.speed} · {config.easing}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Play size={48} className="mx-auto mb-4 opacity-50" />
                    <div className="text-sm">Cliquez sur Lire pour voir l'animation</div>
                  </div>
                </div>
              )}
            </div>

            {/* Contrôles */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <button
                onClick={playPreview}
                disabled={isPlaying}
                className="flex items-center justify-center gap-2 px-4 py-3 bg-accent text-card-foreground rounded-lg hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                <span>{isPlaying ? "En cours..." : "Lire"}</span>
              </button>
              <button
                onClick={resetToDefault}
                className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-border dark:border-zinc-600 rounded-lg hover:bg-muted dark:hover:bg-zinc-800 transition-colors"
              >
                <RotateCcw size={18} />
                <span>Réinitialiser</span>
              </button>
            </div>
          </div>

          {/* Informations de performance */}
          <div className="p-4 bg-warning/10 dark:bg-warning/20 rounded-lg border border-warning/20 dark:border-yellow-800">
            <div className="flex gap-3">
              <div className="text-warning dark:text-warning text-xl">⚠️</div>
              <div className="flex-1 text-sm text-warning dark:text-warning">
                <div className="font-medium mb-1">Impact sur les performances</div>
                <div>
                  Les animations{" "}
                  {config.intensity === "dramatic"
                    ? "prononcées"
                    : config.intensity === "subtle"
                      ? "discrètes"
                      : "normales"}{" "}
                  avec une vitesse{" "}
                  {config.speed === "slow"
                    ? "lente"
                    : config.speed === "fast"
                      ? "rapide"
                      : "normale"}{" "}
                  peuvent {config.intensity === "dramatic" ? "significativement" : "légèrement"}{" "}
                  impacter les performances sur les appareils moins puissants.
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// ==================== HOOK POUR UTILISER LES ANIMATIONS ====================

export const useAnimations = () => {
  const [config, setConfig] = useState<AnimationConfig>(defaultAnimationConfig);

  // Charger la config au montage
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("animation-config");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (JSON.stringify(parsed) !== JSON.stringify(config)) {
          setConfig(parsed);
        }
      } catch (e) {
        console.error("Erreur chargement animations:", e);
      }
    }
  }

  const getAnimationProps = (type: "fade" | "slide" | "scale" = "fade") => {
    if (!config.enabled) {
      return { initial: {}, animate: {}, exit: {} };
    }

    const intensityMap = {
      subtle: { distance: 10, scale: 1.02 },
      normal: { distance: 20, scale: 1.05 },
      dramatic: { distance: 50, scale: 1.1 },
    };

    const speedMap = {
      slow: 1.2,
      normal: 0.6,
      fast: 0.3,
    };

    const intensity = intensityMap[config.intensity];
    const duration = speedMap[config.speed];

    const variants = {
      fade: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
      },
      slide: {
        initial: { opacity: 0, y: intensity.distance },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -intensity.distance },
      },
      scale: {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 },
      },
    };

    return {
      ...variants[type],
      transition: {
        duration,
        ease: config.easing === "spring" ? undefined : config.easing,
        type: config.easing === "spring" ? "spring" : undefined,
      },
    };
  };

  return {
    config,
    getAnimationProps,
    enabled: config.enabled,
  };
};

// ==================== COMPOSANT PRINCIPAL ====================

export const AnimationCustomizerComponent = () => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-muted-foreground dark:text-card-foreground mb-2">
          Personnaliseur d'animations
        </h3>
        <p className="text-sm text-muted-foreground dark:text-muted-foreground mb-4">
          Contrôle complet des animations de l'interface
        </p>
      </div>
      <div className="p-4 bg-accent/10 dark:bg-accent/20 rounded-lg">
        <p className="text-sm text-accent dark:text-accent">
          Composant en développement - Bientôt disponible !
        </p>
      </div>
    </div>
  );
};
