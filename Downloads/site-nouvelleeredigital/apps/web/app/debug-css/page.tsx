"use client";

import React, { useState, useEffect } from "react";
import { usePersona } from "@/components/context/PersonaProvider";
import { personas } from "@/personas";

export default function DebugCSSPage() {
  const { persona, setPersona } = usePersona();
  const [cssVariables, setCssVariables] = useState<Record<string, string>>({});

  useEffect(() => {
    const updateCSSVariables = () => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      
      const variables: Record<string, string> = {};
      
      // Variables importantes pour Tailwind
      const importantVars = [
        'background', 'foreground', 'primary', 'secondary', 'card', 'border',
        'font-sans', 'font-serif'
      ];
      
      importantVars.forEach(varName => {
        const value = computedStyle.getPropertyValue(`--${varName}`).trim();
        if (value) {
          variables[varName] = value;
        }
      });
      
      setCssVariables(variables);
    };

    updateCSSVariables();
    
    // Mettre à jour quand le persona change
    const interval = setInterval(updateCSSVariables, 100);
    return () => clearInterval(interval);
  }, [persona]);

  const handlePersonaChange = (personaId: string) => {
    setPersona(personaId);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🔍 Debug CSS Variables</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Vérification que les variables CSS correspondent à ce que Tailwind attend
          </p>
        </div>

        {/* Sélecteur de personas */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Changer de Persona</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {personas.slice(0, 4).map((p) => (
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
              </button>
            ))}
          </div>
        </div>

        {/* Variables CSS actuelles */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Variables CSS Actuelles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Couleurs (format HSL pour Tailwind)</h3>
              <div className="space-y-3">
                {Object.entries(cssVariables)
                  .filter(([key]) => ['background', 'foreground', 'primary', 'secondary', 'card', 'border'].includes(key))
                  .map(([key, value]) => (
                    <div key={key} className="flex items-center gap-3">
                      <div 
                        className="w-10 h-10 rounded border border-border"
                        style={{ backgroundColor: `hsl(${value})` }}
                      ></div>
                      <div className="flex-1">
                        <div className="font-mono text-sm">
                          --{key}: <span className="text-primary">{value}</span>
                        </div>
                        <div className="text-xs opacity-75">
                          Tailwind: hsl(var(--{key}))
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Polices</h3>
              <div className="space-y-3">
                {Object.entries(cssVariables)
                  .filter(([key]) => key.startsWith('font-'))
                  .map(([key, value]) => (
                    <div key={key} className="flex items-center gap-3">
                      <div className="flex-1">
                        <div className="font-mono text-sm">
                          --{key}: <span className="text-primary">{value}</span>
                        </div>
                        <div className="text-xs opacity-75">
                          Tailwind: var(--{key})
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Test visuel immédiat */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Test Visuel Immédiat</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-primary text-primary-foreground p-4 rounded-lg">
              <h3 className="font-semibold">Primary Button</h3>
              <p>bg-primary + text-primary-foreground</p>
            </div>
            
            <div className="bg-secondary text-secondary-foreground p-4 rounded-lg">
              <h3 className="font-semibold">Secondary Button</h3>
              <p>bg-secondary + text-secondary-foreground</p>
            </div>
            
            <div className="bg-card border border-border p-4 rounded-lg">
              <h3 className="font-semibold">Card with Border</h3>
              <p>bg-card + border-border</p>
            </div>
            
            <div className="bg-background border border-border p-4 rounded-lg">
              <h3 className="font-semibold">Background Card</h3>
              <p>bg-background + border-border</p>
            </div>
          </div>
        </div>

        {/* Informations du persona */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Persona Actuel: {persona.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Configuration</h3>
              <div className="space-y-2 text-sm">
                <div><strong>ID:</strong> {persona.id}</div>
                <div><strong>Mood:</strong> {persona.visualIdentity.mood}</div>
                <div><strong>Energy:</strong> {persona.visualIdentity.energy}</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Couleurs Originales (Hex)</h3>
              <div className="space-y-2 text-sm">
                <div><strong>Background:</strong> {persona.settings.colors.background}</div>
                <div><strong>Primary:</strong> {persona.settings.colors.primary}</div>
                <div><strong>Secondary:</strong> {persona.settings.colors.secondary}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Status de Compatibilité</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${cssVariables.background ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span>Variable --background: {cssVariables.background ? '✅ Définie' : '❌ Manquante'}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${cssVariables.primary ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span>Variable --primary: {cssVariables.primary ? '✅ Définie' : '❌ Manquante'}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${cssVariables['font-sans'] ? 'bg-green-500' : 'bg-red-500'}`}></div>
              <span>Variable --font-sans: {cssVariables['font-sans'] ? '✅ Définie' : '❌ Manquante'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
