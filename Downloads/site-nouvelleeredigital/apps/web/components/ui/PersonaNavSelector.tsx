"use client";

import React, { useState, useEffect } from "react";
import { usePersona } from "@/components/context/PersonaProvider";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Palette, Users, Target, Zap, Heart, Minus, Leaf } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function PersonaNavSelector() {
  const { persona, setPersona, personas } = usePersona();
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Éviter l'hydratation côté serveur pour les composants liés aux personas
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Animation de transition quand le persona change
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [isTransitioning]);

  const getPersonaIcon = (archetype: string) => {
    switch (archetype) {
      case "Le Visionnaire Créatif":
        return Palette;
      case "Le Maître Constructeur":
        return Users;
      case "Le Maître Tacticien":
        return Target;
      case "Le Visionnaire Technologique":
        return Zap;
      case "Le Tisseur de Liens":
        return Heart;
      case "Le Puriste Esthétique":
        return Minus;
      case "Le Gardien de la Terre":
        return Leaf;
      default:
        return Palette;
    }
  };

  const handlePersonaChange = (newPersonaId: string) => {
    if (newPersonaId === persona.id) return;

    setIsTransitioning(true);
    setPersona(newPersonaId);
    setIsOpen(false);

    // Ajouter un effet visuel sur tout le document
    document.documentElement.style.setProperty("--transition-overlay", "1");
    setTimeout(() => {
      document.documentElement.style.removeProperty("--transition-overlay");
    }, 600);
  };

  const currentPersona = personas.find((p) => p.id === persona.id);
  const Icon = currentPersona ? getPersonaIcon(currentPersona.name) : Palette;

  // Ne rendre le contenu qu'après l'hydratation côté client
  if (!isHydrated) {
    return (
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-background/50 hover:bg-background border-border"
          disabled
        >
          <Palette className="w-4 h-4" />
          <span className="hidden sm:inline">Chargement...</span>
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Overlay de transition */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[100] bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 backdrop-blur-sm pointer-events-none"
          />
        )}
      </AnimatePresence>

      <div className="relative">
        <motion.div
          animate={
            isTransitioning
              ? {
                  scale: [1, 1.05, 1],
                  rotateY: [0, 180, 360],
                }
              : {}
          }
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center gap-2 bg-background/50 hover:bg-background border-border transition-all duration-300 ${
              isTransitioning ? "animate-pulse" : ""
            }`}
            disabled={isTransitioning}
          >
            <motion.div
              animate={
                isTransitioning
                  ? {
                      rotate: [0, 360],
                      scale: [1, 1.2, 1],
                    }
                  : {}
              }
              transition={{ duration: 0.6 }}
            >
              <Icon className="w-4 h-4" />
            </motion.div>
            <span className="hidden sm:inline">{currentPersona?.name}</span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
              ▾
            </motion.div>
          </Button>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full right-0 mt-2 w-64 z-50"
            >
              <Card className="p-2 bg-background/95 backdrop-blur-sm border-border shadow-lg">
                {personas.map((p, index) => {
                  const PersonaIcon = getPersonaIcon(p.name);
                  const isActive = p.id === persona.id;

                  return (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Button
                        variant={isActive ? "primary" : "ghost"}
                        size="sm"
                        onClick={() => handlePersonaChange(p.id)}
                        className={`w-full justify-start gap-2 mb-1 transition-all duration-200 ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-md"
                            : "hover:bg-muted hover:scale-105"
                        }`}
                        disabled={isTransitioning}
                      >
                        <PersonaIcon className="w-4 h-4" />
                        <div className="text-left">
                          <div className="font-medium text-sm">{p.name}</div>
                          <div
                            className={`text-xs ${isActive ? "text-primary-foreground/70" : "text-muted-foreground"}`}
                          >
                            {p.visualIdentity.energy} • {p.visualIdentity.mood}
                          </div>
                        </div>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="ml-auto"
                          >
                            ✨
                          </motion.div>
                        )}
                      </Button>
                    </motion.div>
                  );
                })}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Indicateur de changement */}
        <AnimatePresence>
          {isTransitioning && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-ping"
            />
          )}
        </AnimatePresence>

        {/* Overlay to close dropdown */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
