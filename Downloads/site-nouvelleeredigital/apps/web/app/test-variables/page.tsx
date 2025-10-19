"use client";

import React, { useState, useEffect } from "react";
import { usePersona } from "@/components/context/PersonaProvider";
import { personas } from "@/personas";

export default function TestVariablesPage() {
  const { persona, setPersona } = usePersona();
  const [cssVariables, setCssVariables] = useState<Record<string, string>>({});
  const [allPersonas, setAllPersonas] = useState(personas);

  useEffect(() => {
    const updateCSSVariables = () => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      
      const variables: Record<string, string> = {};
      
      // Toutes les variables importantes pour Tailwind
      const allVars = [
        'background', 'foreground', 'primary', 'secondary', 'card', 'border',
        'primary-foreground', 'secondary-foreground', 'card-foreground',
        'font-sans', 'font-serif', 'font-mono', 'radius',
        'accent', 'muted', 'card-shadow', 'spacing-unit'
      ];
      
      allVars.forEach(varName => {
        const value = computedStyle.getPropertyValue(`--${varName}`).trim();
        if (value) {
          variables[varName] = value;
        }
      });
      
      setCssVariables(variables);
    };

    updateCSSVariables();
    const interval = setInterval(updateCSSVariables, 100);
    return () => clearInterval(interval);
  }, [persona]);

  const handlePersonaChange = (personaId: string) => {
    setPersona(personaId);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🔬 Test Détaillé des Variables CSS</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Vérification complète de toutes les variables CSS générées par les personas
          </p>
        </div>

        {/* Sélecteur de personas */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Sélection du Persona</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {allPersonas.map((p) => (
              <button
                key={p.id}
                onClick={() => handlePersonaChange(p.id)}
                className={`p-4 rounded-lg border transition-all text-left ${
                  persona.id === p.id
                    ? 'border-primary bg-primary/10 text-primary'
                    : 'border-border bg-card hover:bg-card/80'
                }`}
              >
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm opacity-75">{p.description}</div>
                <div className="text-xs mt-2 opacity-60">
                  Mood: {p.visualIdentity.mood} | Energy: {p.visualIdentity.energy}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Variables CSS détaillées */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Variables CSS Actuelles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Couleurs principales */}
            <div>
              <h3 className="font-semibold mb-3">Couleurs Principales</h3>
              <div className="space-y-3">
                {['background', 'foreground', 'primary', 'secondary'].map((key) => (
                  <div key={key} className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded border border-border"
                      style={{ backgroundColor: `hsl(${cssVariables[key] || '0 0% 50%'})` }}
                    ></div>
                    <div className="flex-1">
                      <div className="font-mono text-xs">
                        --{key}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {cssVariables[key] || 'Non définie'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Couleurs secondaires */}
            <div>
              <h3 className="font-semibold mb-3">Couleurs Secondaires</h3>
              <div className="space-y-3">
                {['card', 'border', 'accent', 'muted'].map((key) => (
                  <div key={key} className="flex items-center gap-3">
                    <div 
                      className="w-8 h-8 rounded border border-border"
                      style={{ backgroundColor: `hsl(${cssVariables[key] || '0 0% 50%'})` }}
                    ></div>
                    <div className="flex-1">
                      <div className="font-mono text-xs">
                        --{key}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {cssVariables[key] || 'Non définie'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Typographie et styles */}
            <div>
              <h3 className="font-semibold mb-3">Typographie & Styles</h3>
              <div className="space-y-3">
                {['font-sans', 'font-serif', 'font-mono', 'radius'].map((key) => (
                  <div key={key} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="font-mono text-xs">
                        --{key}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {cssVariables[key] || 'Non définie'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Test visuel avec toutes les classes Tailwind */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Test Visuel Complet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Boutons avec toutes les variantes */}
            <div>
              <h3 className="font-semibold mb-3">Boutons</h3>
              <div className="space-y-3">
                <button className="w-full bg-primary text-primary-foreground p-3 rounded-lg hover:bg-primary/80 transition-colors">
                  Primary Button
                </button>
                <button className="w-full bg-secondary text-secondary-foreground p-3 rounded-lg hover:bg-secondary/80 transition-colors">
                  Secondary Button
                </button>
                <button className="w-full bg-accent text-white p-3 rounded-lg hover:bg-accent/80 transition-colors">
                  Accent Button
                </button>
                <button className="w-full border border-border bg-background text-foreground p-3 rounded-lg hover:bg-card transition-colors">
                  Outline Button
                </button>
              </div>
            </div>

            {/* Cartes avec différents styles */}
            <div>
              <h3 className="font-semibold mb-3">Cartes</h3>
              <div className="space-y-3">
                <div className="bg-card border border-border p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Carte Standard</h4>
                  <p className="text-sm text-muted-foreground">Contenu avec bg-card et border-border.</p>
                </div>
                <div className="bg-background border border-border p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Carte Background</h4>
                  <p className="text-sm text-muted-foreground">Contenu avec bg-background.</p>
                </div>
                <div className="bg-accent text-white p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Carte Accent</h4>
                  <p className="text-sm opacity-90">Contenu avec bg-accent.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informations du persona actuel */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Configuration du Persona: {persona.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div>
              <h3 className="font-semibold mb-2">Identité</h3>
              <div className="space-y-1 text-sm">
                <div><strong>ID:</strong> {persona.id}</div>
                <div><strong>Mood:</strong> {persona.visualIdentity.mood}</div>
                <div><strong>Energy:</strong> {persona.visualIdentity.energy}</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Couleurs (Hex → HSL)</h3>
              <div className="space-y-1 text-sm">
                <div><strong>Background:</strong> {persona.settings.colors.background}</div>
                <div><strong>Primary:</strong> {persona.settings.colors.primary}</div>
                <div><strong>Secondary:</strong> {persona.settings.colors.secondary}</div>
                <div><strong>Foreground:</strong> {persona.settings.colors.foreground}</div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Styles</h3>
              <div className="space-y-1 text-sm">
                <div><strong>Border Radius:</strong> {persona.settings.styles.borderRadius}</div>
                <div><strong>Card Shadow:</strong> {persona.settings.styles.cardShadow}</div>
                <div><strong>Spacing:</strong> {persona.settings.styles.spacing}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Status de compatibilité */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Status de Compatibilité</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <h3 className="font-semibold mb-3">Variables Principales</h3>
              <div className="space-y-2">
                {['background', 'foreground', 'primary', 'secondary', 'card', 'border'].map((key) => (
                  <div key={key} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${cssVariables[key] ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm">--{key}: {cssVariables[key] ? '✅ Définie' : '❌ Manquante'}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Variables Secondaires</h3>
              <div className="space-y-2">
                {['font-sans', 'font-serif', 'radius', 'accent', 'muted'].map((key) => (
                  <div key={key} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full ${cssVariables[key] ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span className="text-sm">--{key}: {cssVariables[key] ? '✅ Définie' : '❌ Manquante'}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
