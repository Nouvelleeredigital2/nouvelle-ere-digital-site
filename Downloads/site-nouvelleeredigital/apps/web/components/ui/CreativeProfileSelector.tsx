"use client";

import React, { useState, useEffect } from 'react';
import { useCreativePersona } from '@/components/context/ThemeProvider';
import { Card } from './Card';
import { Palette, Users, Lightbulb, Target, Zap, Heart, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CreativeProfileSelectorProps {
  onComplete?: () => void;
  compact?: boolean; // Nouvelle prop pour le mode compact
}

// Composant Button simple inline
const Button = ({ children, onClick, className, size = "md", ...props }: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
}) => {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export function CreativeProfileSelector({ onComplete, compact = false }: CreativeProfileSelectorProps) {
  const { personas, setPersona } = useCreativePersona();
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

  // Vérifier si l'utilisateur a déjà choisi un persona
  useEffect(() => {
    const hasChosenPersona = localStorage.getItem('creative-persona');
    if (hasChosenPersona && onComplete) {
      onComplete();
    }
  }, [onComplete]);

  const handlePersonaSelect = (personaId: string) => {
    setPersona(personaId);
    localStorage.setItem('creative-persona', personaId);
    if (onComplete) {
      onComplete();
    }
  };

  const getPersonaIcon = (archetype: string) => {
    switch (archetype) {
      case 'Le Visionnaire Créatif': return Palette;
      case 'Le Maître Constructeur': return Users;
      case 'Le Maître Tacticien': return Target;
      case 'Le Visionnaire Technologique': return Zap;
      case 'Le Tisseur de Liens': return Heart;
      default: return Lightbulb;
    }
  };

  // Mode compact pour intégration dans la page d'accueil
  if (compact) {
    return (
      <section className="py-16 bg-gradient-to-br from-background via-background/95 to-background/90">
        <div className="max-w-6xl mx-auto px-8">
          {/* Header compact */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-serif mb-4 text-foreground">
              Choisissez votre profil créatif
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Découvrez votre personnalité créative et personnalisez votre expérience
            </p>
          </motion.div>

          {/* Grille compacte des personas */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
          >
            {personas.slice(0, 5).map((persona, index) => { // Afficher seulement les 5 premiers
              const Icon = getPersonaIcon(persona.archetype);
              const isSelected = selectedPersona === persona.id;

              return (
                <motion.div
                  key={persona.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ y: -4 }}
                  className="relative"
                >
                  <Card
                    className={`cursor-pointer transition-all duration-300 h-full text-center p-4 hover:shadow-lg ${
                      isSelected
                        ? 'ring-2 ring-primary bg-primary/5'
                        : 'hover:bg-card/80'
                    }`}
                    onClick={() => handlePersonaSelect(persona.id)}
                  >
                    {/* Icône */}
                    <div className="flex justify-center mb-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Nom */}
                    <h3 className="text-sm font-semibold mb-1">{persona.name}</h3>
                    <p className="text-xs text-muted-foreground leading-tight">
                      {persona.description.split('.')[0]}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mt-8"
          >
            <Button
              onClick={() => {
                // Sélectionner le premier persona par défaut si aucun n'est choisi
                if (!selectedPersona) {
                  handlePersonaSelect(personas[0].id);
                }
              }}
              size="lg"
              className="bg-primary hover:bg-primary/90"
            >
              Commencer avec mon profil
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  // Mode plein écran (original)
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-6xl mx-auto px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-serif mb-6">
            Quelle est votre vision créative ?
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Chaque personne voit le monde différemment. Découvrez votre profil créatif unique
            et personnalisez votre expérience selon votre personnalité.
          </p>
        </motion.div>

        {/* Grille des personas */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {personas.map((persona, index) => {
            const Icon = getPersonaIcon(persona.archetype);
            const isSelected = selectedPersona === persona.id;

            return (
              <motion.div
                key={persona.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ y: -8 }}
                className="relative"
              >
                <Card
                  className={`cursor-pointer transition-all duration-300 h-full ${
                    isSelected
                      ? 'ring-2 ring-primary bg-card/80'
                      : 'hover:bg-card/50'
                  }`}
                  onClick={() => handlePersonaSelect(persona.id)}
                >
                  {/* Icône en haut */}
                  <div className="flex justify-center mb-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* Contenu */}
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">{persona.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {persona.description}
                    </p>

                    {/* Tags d'identité */}
                    <div className="flex flex-wrap gap-2 justify-center mb-4">
                      <span className="px-2 py-1 text-xs bg-muted rounded-full">
                        {persona.visualIdentity.energy}
                      </span>
                      <span className="px-2 py-1 text-xs bg-muted rounded-full">
                        {persona.visualIdentity.mood}
                      </span>
                    </div>

                    {/* Archétype */}
                    <p className="text-xs text-muted-foreground italic">
                      {persona.archetype}
                    </p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
