'use client';

import { useState, useEffect } from 'react';
import { personas, type PersonaId } from '@/personas';
import { usePersona } from '@/hooks/usePersona';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Eye, Palette, Type, Layout, Check } from 'lucide-react';
import { toast } from 'sonner';

interface PersonaSelectorProps {
  onPersonaChange?: (personaId: PersonaId) => void;
  showPreview?: boolean;
  className?: string;
}

export function PersonaSelector({ 
  onPersonaChange, 
  showPreview = true, 
  className = '' 
}: PersonaSelectorProps) {
  const { currentPersona, switchPersona } = usePersona();
  const [previewPersona, setPreviewPersona] = useState<PersonaId | null>(null);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Appliquer le persona de prévisualisation
  useEffect(() => {
    if (previewPersona && isPreviewMode) {
      switchPersona(previewPersona);
    }
  }, [previewPersona, isPreviewMode, switchPersona]);

  const handlePersonaSelect = (personaId: PersonaId) => {
    if (isPreviewMode) {
      setPreviewPersona(personaId);
    } else {
      switchPersona(personaId);
      onPersonaChange?.(personaId);
      toast.success(`Persona "${personas.find(p => p.id === personaId)?.name}" appliqué`);
    }
  };

  const handlePreviewToggle = () => {
    if (isPreviewMode) {
      // Sortir du mode preview
      switchPersona(currentPersona?.id || 'naturel');
      setPreviewPersona(null);
      setIsPreviewMode(false);
    } else {
      // Entrer en mode preview
      setPreviewPersona(currentPersona?.id || 'naturel');
      setIsPreviewMode(true);
    }
  };

  const handleApplyPreview = () => {
    if (previewPersona) {
      switchPersona(previewPersona);
      onPersonaChange?.(previewPersona);
      setIsPreviewMode(false);
      setPreviewPersona(null);
      toast.success('Persona appliqué avec succès');
    }
  };

  const handleCancelPreview = () => {
    switchPersona(currentPersona?.id || 'naturel');
    setPreviewPersona(null);
    setIsPreviewMode(false);
  };

  const getPersonaColors = (persona: typeof personas[0]) => {
    const colors = persona.settings.colors;
    return [
      colors.primary,
      colors.secondary,
      colors.accent,
      colors.background,
      colors.foreground,
    ].filter(Boolean);
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Personas</h2>
          <p className="text-gray-600 mt-1">
            Choisissez l'identité visuelle de votre site
          </p>
        </div>
        
        {showPreview && (
          <div className="flex items-center space-x-2">
            <Button
              variant={isPreviewMode ? "primary" : "outline"}
              onClick={handlePreviewToggle}
              className="flex items-center space-x-2"
            >
              <Eye className="w-4 h-4" />
              <span>{isPreviewMode ? 'Quitter la prévisualisation' : 'Prévisualiser'}</span>
            </Button>
            
            {isPreviewMode && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCancelPreview}
                >
                  Annuler
                </Button>
                <Button
                  size="sm"
                  onClick={handleApplyPreview}
                  className="flex items-center space-x-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Appliquer</span>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Personas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {personas.map((persona) => {
          const isActive = (isPreviewMode ? previewPersona : currentPersona?.id) === persona.id;
          const colors = getPersonaColors(persona);
          
          return (
            <Card
              key={persona.id}
              className={`
                cursor-pointer transition-all duration-200 hover:shadow-lg
                ${isActive ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'}
                ${isPreviewMode && previewPersona === persona.id ? 'ring-2 ring-green-500' : ''}
              `}
              onClick={() => handlePersonaSelect(persona.id)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{persona.name}</CardTitle>
                  {isActive && (
                    <Badge variant="default" className="bg-blue-600">
                      Actif
                    </Badge>
                  )}
                </div>
                <CardDescription className="text-sm">
                  {persona.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Palette de couleurs */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Palette className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Couleurs</span>
                  </div>
                  <div className="flex space-x-1">
                    {colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-8 h-8 rounded border border-gray-200"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>

                {/* Typographie */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Type className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Typographie</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    <div>Serif: {persona.settings.typography.fontFamilySerif.split(',')[0].replace(/"/g, '')}</div>
                    <div>Sans: {persona.settings.typography.fontFamilySans.split(',')[0].replace(/"/g, '')}</div>
                  </div>
                </div>

                {/* Layout */}
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Layout className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-700">Style</span>
                  </div>
                  <div className="text-xs text-gray-600">
                    <div>Énergie: {persona.visualIdentity.energy}</div>
                    <div>Ambiance: {persona.visualIdentity.mood}</div>
                    <div>Archetype: {persona.archetype}</div>
                  </div>
                </div>

                {/* Bouton de sélection */}
                <Button
                  variant={isActive ? "primary" : "outline"}
                  size="sm"
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePersonaSelect(persona.id);
                  }}
                >
                  {isActive ? 'Sélectionné' : 'Sélectionner'}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Aperçu du persona actuel */}
      {showPreview && (
        <div className="mt-8 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Aperçu du persona actuel
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Exemple de composant */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Composants</h4>
              <div className="space-y-2">
                <div className="p-4 bg-card text-card-foreground rounded-lg border">
                  <h5 className="font-semibold mb-2">Titre de section</h5>
                  <p className="text-sm text-muted-foreground">
                    Exemple de texte avec le style du persona sélectionné.
                  </p>
                </div>
                
                <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                  Bouton d'action
                </button>
              </div>
            </div>

            {/* Informations du persona */}
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700">Informations</h4>
              <div className="text-sm space-y-2">
                <div>
                  <span className="font-medium">Nom:</span> {personas.find(p => p.id === currentPersona?.id)?.name}
                </div>
                <div>
                  <span className="font-medium">Description:</span> {personas.find(p => p.id === currentPersona?.id)?.description}
                </div>
                <div>
                  <span className="font-medium">Archetype:</span> {personas.find(p => p.id === currentPersona?.id)?.archetype}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
