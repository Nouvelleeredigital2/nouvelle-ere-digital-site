"use client";

import React, { useState, useEffect } from "react";
import { usePersona } from "@/components/context/PersonaProvider";
import { Card } from "./Card";
import { Palette, Users, Lightbulb, Target, Zap, Heart, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CreativeProfileSelectorProps {
  onComplete?: () => void;
  compact?: boolean; // Nouvelle prop pour le mode compact
}

// Composant Button avec notre système de design
const Button = ({
  children,
  onClick,
  className,
  size = "md",
  variant = "primary",
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary";
}) => {
  const sizeClasses = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-3 text-sm",
    lg: "px-6 py-4 text-base",
  };

  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 font-medium",
    secondary: "bg-muted text-foreground border border-border hover:bg-muted/80",
  };

  return (
    <button
      onClick={onClick}
      className={`rounded-lg transition-colors ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export function CreativeProfileSelector({
  onComplete,
  compact = false,
}: CreativeProfileSelectorProps) {
  const { personas, setPersona, persona } = usePersona();
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);

  // Synchroniser l'état local avec le contexte global
  useEffect(() => {
    if (persona) {
      setSelectedPersona(persona.id);
    }
  }, [persona]);

  // Vérifier si l'utilisateur a déjà choisi un persona
  useEffect(() => {
    const hasChosenPersona = localStorage.getItem("creative-persona");
    if (hasChosenPersona && onComplete) {
      onComplete();
    }
  }, [onComplete]);

  const handlePersonaSelect = (personaId: string) => {
    setPersona(personaId);
    setSelectedPersona(personaId);
    localStorage.setItem("creative-persona", personaId);
    if (onComplete) {
      onComplete();
    }
  };

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
      default:
        return Lightbulb;
    }
  };

  // Mode compact pour intégration dans la page d'accueil
  if (compact) {
    return (
      <section className="py-16 bg-muted/30">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header avec hiérarchie claire */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl text-foreground mb-3">Choisissez votre profil créatif</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Découvrez votre personnalité créative et personnalisez votre expérience
            </p>
          </motion.div>

          {/* Grille des personas avec système de design cohérent */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3"
          >
            {personas.slice(0, 5).map((persona, index) => {
              const Icon = getPersonaIcon(persona.name);
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
                      isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:bg-card/80"
                    }`}
                    onClick={() => handlePersonaSelect(persona.id)}
                  >
                    {/* Icône avec taille cohérente */}
                    <div className="flex justify-center mb-3">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-300 ${
                          isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>

                    {/* Nom avec échelle appropriée */}
                    <h3 className="text-sm font-medium mb-1 text-foreground">{persona.name}</h3>
                    <p className="text-xs text-muted-foreground leading-tight">
                      {persona.description.split(".")[0]}
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
            className="text-center mt-6"
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

  // Mode plein écran (original) avec système de design
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header avec hiérarchie typographique */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-serif text-foreground mb-4">
            Quelle est votre vision créative ?
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Chaque personne voit le monde différemment. Découvrez votre profil créatif unique et
            personnalisez votre expérience selon votre personnalité.
          </p>
        </motion.div>

        {/* Grille des personas avec design cohérent */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {personas.map((persona, index) => {
            const Icon = getPersonaIcon(persona.name);
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
                    isSelected ? "ring-2 ring-primary bg-card/80" : "hover:bg-card/50"
                  }`}
                  onClick={() => handlePersonaSelect(persona.id)}
                >
                  {/* Icône en haut avec taille cohérente */}
                  <div className="flex justify-center mb-4">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors duration-300 ${
                        isSelected ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <Icon className="w-8 h-8" />
                    </div>
                  </div>

                  {/* Contenu avec hiérarchie claire */}
                  <div className="text-center">
                    <h3 className="text-xl text-foreground mb-2 font-medium">{persona.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {persona.description}
                    </p>

                    {/* Tags d'identité avec couleurs cohérentes */}
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                        {persona.visualIdentity.energy}
                      </span>
                      <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
                        {persona.visualIdentity.mood}
                      </span>
                    </div>

                    {/* Archétype avec style approprié */}
                    <p className="text-xs text-muted-foreground italic">{persona.name}</p>
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
