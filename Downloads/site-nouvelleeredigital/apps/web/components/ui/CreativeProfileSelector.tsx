"use client";

import React, { useState, useEffect } from 'react';
import { useCreativePersona } from '@/components/context/ThemeProvider';
import { Button } from './Button';
import { Card } from './Card';
import { Palette, Users, Lightbulb, Target, Zap, Heart, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CreativeProfileSelectorProps {
  onComplete?: () => void;
}

export function CreativeProfileSelector({ onComplete }: CreativeProfileSelectorProps) {
  const { personas, setPersona } = useCreativePersona();
  const [selectedPersona, setSelectedPersona] = useState<string | null>(null);
  const [step, setStep] = useState<'selection' | 'confirmation'>('selection');

  // Vérifier si l'utilisateur a déjà choisi un persona
  useEffect(() => {
    const hasChosenPersona = localStorage.getItem('creative-persona');
    if (hasChosenPersona && onComplete) {
      onComplete();
    }
  }, [onComplete]);

  const handlePersonaSelect = (personaId: string) => {
    setSelectedPersona(personaId);
    setStep('confirmation');
  };

  const handleConfirmSelection = () => {
    if (selectedPersona) {
      setPersona(selectedPersona);
      localStorage.setItem('creative-persona', selectedPersona); // Persist the chosen persona ID
      if (onComplete) {
        onComplete();
      }
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

  if (step === 'confirmation' && selectedPersona) {
    const persona = personas.find(p => p.id === selectedPersona);

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-background flex items-center justify-center p-8"
      >
        <Card className="max-w-2xl w-full p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <CheckCircle className="w-16 h-16 text-success mx-auto mb-6" />
          </motion.div>

          <h2 className="text-3xl font-serif mb-4">
            Parfait ! Vous êtes {persona?.name}
          </h2>

          <p className="text-lg text-muted-foreground mb-6">
            {persona?.description}
          </p>

          <div className="bg-card/50 rounded-lg p-6 mb-8">
            <p className="text-sm text-muted-foreground">
              <strong>Votre archétype :</strong> {persona?.archetype}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              <strong>Énergie :</strong> {persona?.visualIdentity.energy} •
              <strong> Ambiance :</strong> {persona?.visualIdentity.mood}
            </p>
          </div>

          <Button
            onClick={handleConfirmSelection}
            size="lg"
            className="w-full"
          >
            Commencer l'expérience
          </Button>
        </Card>
      </motion.div>
    );
  }

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

                  {/* Indicateur de sélection */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4"
                    >
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </motion.div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Sélectionné mais pas encore confirmé */}
        {selectedPersona && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-12 text-center"
          >
            <Button size="lg" onClick={() => setStep('confirmation')}>
              Continuer avec ce profil
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
