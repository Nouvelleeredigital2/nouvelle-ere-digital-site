"use client";

import React, { useEffect, useState } from "react";
import { usePersona } from "@/components/context/PersonaProvider";
import { personas } from "@/personas";

export default function TestSimplePage() {
  const { persona, setPersona } = usePersona();
  const [cssVariables, setCssVariables] = useState<Record<string, string>>({});

  useEffect(() => {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);
    const variables: Record<string, string> = {};

    // Collect all CSS variables starting with --
    for (let i = 0; i < computedStyle.length; i++) {
      const key = computedStyle[i];
      if (key.startsWith('--')) {
        variables[key] = computedStyle.getPropertyValue(key).trim();
      }
    }
    setCssVariables(variables);
  }, [persona]); // Re-run when persona changes

  const testPersonaChange = () => {
    const currentIndex = personas.findIndex(p => p.id === persona.id);
    const nextIndex = (currentIndex + 1) % personas.length;
    setPersona(personas[nextIndex].id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Test Simple des Personas</h1>
        
        <div className="text-center mb-8">
          <button 
            onClick={testPersonaChange}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Changer de Persona (Actuel: {persona.name})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Test des couleurs */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4">Test des Couleurs</h2>
            <div className="space-y-4">
              <div className="p-4 bg-primary text-primary-foreground rounded-md">
                <strong>Primary:</strong> Couleur principale
              </div>
              <div className="p-4 bg-secondary text-secondary-foreground rounded-md">
                <strong>Secondary:</strong> Couleur secondaire
              </div>
              <div className="p-4 bg-accent text-accent-foreground rounded-md">
                <strong>Accent:</strong> Couleur d'accent
              </div>
              <div className="p-4 bg-muted text-muted-foreground rounded-md">
                <strong>Muted:</strong> Couleur discrète
              </div>
            </div>
          </div>

          {/* Variables CSS */}
          <div className="bg-card p-6 rounded-lg border border-border">
            <h2 className="text-2xl font-semibold mb-4">Variables CSS Actuelles</h2>
            <div className="space-y-2 text-sm">
              {Object.entries(cssVariables)
                .filter(([key]) => key.includes('background') || key.includes('primary') || key.includes('secondary') || key.includes('accent') || key.includes('muted'))
                .sort()
                .map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="font-mono text-muted-foreground">{key}:</span>
                    <span className="font-mono text-foreground">{value}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Debug Info */}
        <div className="mt-8 bg-card p-6 rounded-lg border border-border">
          <h2 className="text-2xl font-semibold mb-4">Debug Info</h2>
          <div className="space-y-2 text-sm">
            <p><strong>Persona ID:</strong> {persona.id}</p>
            <p><strong>Persona Name:</strong> {persona.name}</p>
            <p><strong>Has Settings:</strong> {persona.settings ? 'Oui' : 'Non'}</p>
            {persona.settings && (
              <>
                <p><strong>Has Colors:</strong> {persona.settings.colors ? 'Oui' : 'Non'}</p>
                <p><strong>Has Typography:</strong> {persona.settings.typography ? 'Oui' : 'Non'}</p>
                <p><strong>Has Styles:</strong> {persona.settings.styles ? 'Oui' : 'Non'}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
