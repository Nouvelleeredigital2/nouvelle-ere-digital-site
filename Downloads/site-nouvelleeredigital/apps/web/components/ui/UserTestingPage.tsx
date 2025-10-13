"use client";

import React, { useState } from 'react';
import { useCreativePersona } from '@/components/context/ThemeProvider';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';
import { Star, ThumbsUp, ThumbsDown, MessageSquare, CheckCircle, AlertCircle } from 'lucide-react';

interface UserTestData {
  personaId: string;
  easeOfUse: number; // 1-5
  visualAppeal: number; // 1-5
  functionality: number; // 1-5
  overallSatisfaction: number; // 1-5
  feedback: string;
  suggestions: string;
  timestamp: string;
}

export function UserTestingPage() {
  const { persona } = useCreativePersona();
  const [testData, setTestData] = useState<Partial<UserTestData>>({
    personaId: persona.id,
    easeOfUse: 3,
    visualAppeal: 3,
    functionality: 3,
    overallSatisfaction: 3,
    feedback: '',
    suggestions: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: "Évaluation de l'ergonomie", key: "easeOfUse" },
    { title: "Appréciation visuelle", key: "visualAppeal" },
    { title: "Fonctionnalité", key: "functionality" },
    { title: "Satisfaction globale", key: "overallSatisfaction" },
    { title: "Commentaires", key: "feedback" },
    { title: "Suggestions", key: "suggestions" }
  ];

  const handleRatingChange = (key: keyof UserTestData, value: number) => {
    setTestData(prev => ({ ...prev, [key]: value }));
  };

  const handleTextChange = (key: keyof UserTestData, value: string) => {
    setTestData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const completeData: UserTestData = {
      ...testData,
      personaId: persona.id,
      timestamp: new Date().toISOString()
    } as UserTestData;

    // Ici, on pourrait envoyer les données à un service d'analytics
    console.log('Données de test utilisateur:', completeData);

    // Sauvegarder localement pour démonstration
    const existingTests = JSON.parse(localStorage.getItem('user-tests') || '[]');
    existingTests.push(completeData);
    localStorage.setItem('user-tests', JSON.stringify(existingTests));

    setIsSubmitted(true);
  };

  const renderStarRating = (value: number, onChange: (value: number) => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(star)}
            className={cn(
              "transition-colors duration-200",
              star <= value
                ? "text-yellow-400 hover:text-yellow-500"
                : "text-gray-300 hover:text-yellow-400"
            )}
          >
            <Star className="w-6 h-6 fill-current" />
          </button>
        ))}
      </div>
    );
  };

  const renderStepContent = () => {
    const step = steps[currentStep];

    switch (step.key) {
      case 'easeOfUse':
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">Facilité d'utilisation</h2>
            <p className="text-muted-foreground">
              À quel point trouvez-vous facile de naviguer et d'utiliser le système de personas ?
            </p>
            <div className="flex justify-center">
              {renderStarRating(testData.easeOfUse || 3, (value) => handleRatingChange('easeOfUse', value))}
            </div>
            <div className="text-sm text-muted-foreground">
              {testData.easeOfUse}/5
            </div>
          </div>
        );

      case 'visualAppeal':
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">Appréciation visuelle</h2>
            <p className="text-muted-foreground">
              Comment évaluez-vous l'apparence visuelle et le design du système ?
            </p>
            <div className="flex justify-center">
              {renderStarRating(testData.visualAppeal || 3, (value) => handleRatingChange('visualAppeal', value))}
            </div>
            <div className="text-sm text-muted-foreground">
              {testData.visualAppeal}/5
            </div>
          </div>
        );

      case 'functionality':
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">Fonctionnalité</h2>
            <p className="text-muted-foreground">
              Le système répond-il bien à vos attentes en termes de fonctionnalités ?
            </p>
            <div className="flex justify-center">
              {renderStarRating(testData.functionality || 3, (value) => handleRatingChange('functionality', value))}
            </div>
            <div className="text-sm text-muted-foreground">
              {testData.functionality}/5
            </div>
          </div>
        );

      case 'overallSatisfaction':
        return (
          <div className="text-center space-y-6">
            <h2 className="text-2xl font-bold">Satisfaction globale</h2>
            <p className="text-muted-foreground">
              Globalement, êtes-vous satisfait de votre expérience avec le système de personas ?
            </p>
            <div className="flex justify-center">
              {renderStarRating(testData.overallSatisfaction || 3, (value) => handleRatingChange('overallSatisfaction', value))}
            </div>
            <div className="text-sm text-muted-foreground">
              {testData.overallSatisfaction}/5
            </div>
          </div>
        );

      case 'feedback':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Vos commentaires</h2>
            <p className="text-muted-foreground">
              Partagez vos impressions générales sur le système de personas
            </p>
            <textarea
              className="w-full h-32 p-3 border border-border rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Que pensez-vous du système ? Qu'est-ce qui vous a plu ou déplu ?"
              value={testData.feedback || ''}
              onChange={(e) => handleTextChange('feedback', e.target.value)}
            />
          </div>
        );

      case 'suggestions':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Suggestions d'amélioration</h2>
            <p className="text-muted-foreground">
              Avez-vous des idées pour améliorer le système ?
            </p>
            <textarea
              className="w-full h-32 p-3 border border-border rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Quelles fonctionnalités aimeriez-vous voir ajoutées ? Comment pourrions-nous améliorer l'expérience ?"
              value={testData.suggestions || ''}
              onChange={(e) => handleTextChange('suggestions', e.target.value)}
            />
          </div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-8">
        <Card className="max-w-md w-full p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Merci pour votre feedback !</h2>
          <p className="text-muted-foreground mb-6">
            Vos commentaires nous aident à améliorer le système de Creative Personas.
          </p>
          <Button onClick={() => window.location.reload()}>
            Refaire le test
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header avec informations du persona */}
      <div className="bg-muted/30 py-8">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Tests Utilisateurs - Creative Personas</h1>
          <div className="flex items-center justify-center gap-4">
            <Badge className="text-sm">
              Persona actuel: {persona.name}
            </Badge>
            <Badge variant="outline" className="text-sm">
              Étape {currentStep + 1}/{steps.length}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        {/* Barre de progression */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((step, index) => (
              <div
                key={index}
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                  index <= currentStep
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {index + 1}
              </div>
            ))}
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Contenu de l'étape actuelle */}
        <Card className="p-8 mb-8">
          {renderStepContent()}
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Précédent
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button onClick={handleSubmit}>
              Soumettre le test
            </Button>
          ) : (
            <Button onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}>
              Suivant
            </Button>
          )}
        </div>

        {/* Informations du test */}
        <div className="mt-8 p-4 bg-muted/50 rounded-lg">
          <h3 className="font-medium mb-2">À propos de ce test</h3>
          <p className="text-sm text-muted-foreground">
            Ce questionnaire nous aide à comprendre comment les utilisateurs interagissent avec le système de Creative Personas.
            Vos réponses sont anonymes et nous permettront d'améliorer l'expérience utilisateur.
          </p>
        </div>
      </div>
    </div>
  );
}
