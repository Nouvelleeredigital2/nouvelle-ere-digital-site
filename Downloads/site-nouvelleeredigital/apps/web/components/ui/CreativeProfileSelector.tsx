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

// Composant Button avec notre système de design
const Button = ({ children, onClick, className, size = "md", variant = "primary", ...props }: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
}) => {
  const sizeClasses = {
    sm: "px-md py-sm text-body-sm",
    md: "px-lg py-md text-body-sm",
    lg: "px-xl py-lg text-body-md"
  };

  const variantClasses = {
    primary: "bg-interactive text-text-inverse hover:bg-interactive-hover font-medium",
    secondary: "bg-surface-100 text-text-primary border border-border hover:bg-surface-200"
  };

  return (
    <button
      onClick={onClick}
      className={`btn ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
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
      <section className="py-4xl bg-background-subtle">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header avec hiérarchie claire */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-3xl"
          >
            <h2 className="text-heading-2xl text-text-primary mb-md">
              Choisissez votre profil créatif
            </h2>
            <p className="text-body-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
              Découvrez votre personnalité créative et personnalisez votre expérience
            </p>
          </motion.div>

          {/* Grille des personas avec système de design cohérent */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-md"
          >
            {personas.slice(0, 5).map((persona, index) => {
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
                    className={`cursor-pointer transition-all duration-300 h-full text-center p-lg hover:shadow-lg ${
                      isSelected
                        ? 'ring-2 ring-interactive bg-interactive/5'
                        : 'hover:bg-card/80'
                    }`}
                    onClick={() => handlePersonaSelect(persona.id)}
                  >
                    {/* Icône avec taille cohérente */}
                    <div className="flex justify-center mb-md">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                        isSelected ? 'bg-interactive text-text-inverse' : 'bg-surface-200'
                      }`}>
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Nom avec échelle appropriée */}
                    <h3 className="text-body-sm font-medium mb-xs text-text-primary">{persona.name}</h3>
                    <p className="text-caption text-text-muted leading-tight">
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
            className="text-center mt-xl"
          >
            <Button
              onClick={() => {
                // Sélectionner le premier persona par défaut si aucun n'est choisi
                if (!selectedPersona) {
                  handlePersonaSelect(personas[0].id);
                }
              }}
              size="lg"
              className="bg-interactive hover:bg-interactive-hover"
            >
              Commencer avec mon profil
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  // Mode plein écran (original) avec système de design
  return (
    <div className="min-h-screen bg-background py-4xl">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header avec hiérarchie typographique */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4xl"
        >
          <h1 className="text-display-xl font-serif text-text-primary mb-lg">
            Quelle est votre vision créative ?
          </h1>
          <p className="text-body-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
            Chaque personne voit le monde différemment. Découvrez votre profil créatif unique
            et personnalisez votre expérience selon votre personnalité.
          </p>
        </motion.div>

        {/* Grille des personas avec design cohérent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg"
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
                      ? 'ring-2 ring-interactive bg-card/80'
                      : 'hover:bg-card/50'
                  }`}
                  onClick={() => handlePersonaSelect(persona.id)}
                >
                  {/* Icône en haut avec taille cohérente */}
                  <div className="flex justify-center mb-lg">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
                      isSelected ? 'bg-interactive text-text-inverse' : 'bg-surface-200'
                    }`}>
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Contenu avec hiérarchie claire */}
                  <div className="text-center">
                    <h3 className="text-heading-lg text-text-primary mb-sm font-medium">{persona.name}</h3>
                    <p className="text-body-sm text-text-muted mb-lg leading-relaxed">
                      {persona.description}
                    </p>

                    {/* Tags d'identité avec couleurs cohérentes */}
                    <div className="flex flex-wrap gap-xs justify-center mb-lg">
                      <span className="px-sm py-xs text-caption bg-surface-100 text-text-muted rounded-full">
                        {persona.visualIdentity.energy}
                      </span>
                      <span className="px-sm py-xs text-caption bg-surface-100 text-text-muted rounded-full">
                        {persona.visualIdentity.mood}
                      </span>
                    </div>

                    {/* Archétype avec style approprié */}
                    <p className="text-caption text-text-subtle italic">
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
