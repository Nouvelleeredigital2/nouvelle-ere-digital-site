'use client';

import React, { useState, useEffect } from 'react';
import { X, Sparkles, ArrowRight, CheckCircle, Lightbulb } from 'lucide-react';

interface OnboardingStep {
  id: string;
  title: string;
  content: string;
  action?: string;
  completed: boolean;
}

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

export function OnboardingModal({ isOpen, onClose, onComplete }: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const steps: OnboardingStep[] = [
    {
      id: 'welcome',
      title: 'Bienvenue dans votre éditeur professionnel !',
      content: 'Découvrez comment créer des pages magnifiques avec notre interface intuitive.',
      completed: true,
    },
    {
      id: 'blocks',
      title: 'Ajoutez des blocs',
      content: 'Cliquez sur le "+" en bas à gauche pour ajouter des blocs : Hero, Texte, Images, Galeries, etc.',
      action: 'Essayez d\'ajouter un bloc maintenant',
      completed: false,
    },
    {
      id: 'inspector',
      title: 'Personnalisez vos blocs',
      content: 'Sélectionnez un bloc pour voir ses options dans le panneau de droite.',
      completed: false,
    },
    {
      id: 'seo',
      title: 'Optimisez votre SEO',
      content: 'Utilisez l\'onglet SEO pour améliorer la visibilité de votre page.',
      completed: false,
    },
    {
      id: 'preview',
      title: 'Prévisualisez votre travail',
      content: 'Générez une prévisualisation sécurisée pour voir le rendu final.',
      completed: false,
    },
    {
      id: 'history',
      title: 'Suivez vos modifications',
      content: 'Consultez l\'historique pour voir toutes vos versions et restaurer si besoin.',
      completed: false,
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setCompletedSteps(prev => [...prev, steps[currentStep].id]);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setCompletedSteps(prev => [...prev, steps[currentStep].id]);
    onComplete?.();
    onClose();
  };

  const handleSkip = () => {
    onClose();
  };

  if (!isOpen) return null;

  const currentStepData = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="fixed inset-0 bg-background bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] flex flex-col">
        {/* Header avec progression */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              <h3 className="text-lg font-semibold text-muted-foreground">
                Découverte de l'éditeur
              </h3>
            </div>
            <button
              onClick={handleSkip}
              className="p-1 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground0" />
            </button>
          </div>

          {/* Barre de progression */}
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Étape {currentStep + 1} sur {steps.length}
          </p>
        </div>

        {/* Contenu de l'étape */}
        <div className="flex-1 p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-indigo-600" />
            </div>

            <h4 className="text-xl font-semibold text-muted-foreground mb-3">
              {currentStepData.title}
            </h4>

            <p className="text-muted-foreground leading-relaxed">
              {currentStepData.content}
            </p>

            {currentStepData.action && (
              <p className="text-sm text-indigo-600 mt-3 font-medium">
                💡 {currentStepData.action}
              </p>
            )}
          </div>

          {/* Indicateur visuel des étapes */}
          <div className="flex justify-center gap-2 mb-6">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index < currentStep
                    ? 'bg-success'
                    : index === currentStep
                    ? 'bg-indigo-500'
                    : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-border flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className="px-4 py-2 text-muted-foreground hover:text-muted-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Précédent
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSkip}
              className="px-4 py-2 text-muted-foreground hover:text-muted-foreground transition-colors"
            >
              Ignorer
            </button>

            <button
              onClick={handleNext}
              className="px-6 py-2 bg-indigo-600 text-card-foreground rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              {currentStep === steps.length - 1 ? (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Terminer
                </>
              ) : (
                <>
                  Suivant
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Hook pour gérer l'onboarding
export function useOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà complété l'onboarding
    const completed = localStorage.getItem('onboarding-completed');
    if (!completed) {
      // Afficher l'onboarding après un délai
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 2000); // 2 secondes après le chargement

      return () => clearTimeout(timer);
    } else {
      setHasCompletedOnboarding(true);
    }
  }, []);

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
    setShowOnboarding(false);
    localStorage.setItem('onboarding-completed', 'true');
  };

  return {
    showOnboarding,
    hasCompletedOnboarding,
    completeOnboarding,
    setShowOnboarding,
  };
}
