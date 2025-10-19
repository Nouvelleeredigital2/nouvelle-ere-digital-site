"use client";

import React, { useState, useEffect } from "react";
import { usePersona } from "@/components/context/PersonaProvider";
import { personas } from "@/personas";

export default function Test5PersonasPage() {
  const { persona, setPersona } = usePersona();
  const [cssVariables, setCssVariables] = useState<Record<string, string>>({});
  const [currentTest, setCurrentTest] = useState<number>(0);

  // Les 5 personas de base à tester
  const basePersonas = personas;

  useEffect(() => {
    const updateCSSVariables = () => {
      const root = document.documentElement;
      const computedStyle = getComputedStyle(root);
      
      const variables: Record<string, string> = {};
      
      // Variables importantes pour Tailwind
      const importantVars = [
        'background', 'foreground', 'primary', 'secondary', 'card', 'border',
        'font-sans', 'font-serif', 'radius'
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
    const interval = setInterval(updateCSSVariables, 100);
    return () => clearInterval(interval);
  }, [persona]);

  const handlePersonaChange = (personaId: string) => {
    setPersona(personaId);
  };

  const testNextPersona = () => {
    const nextIndex = (currentTest + 1) % basePersonas.length;
    setCurrentTest(nextIndex);
    setPersona(basePersonas[nextIndex].id);
  };

  const testPreviousPersona = () => {
    const prevIndex = currentTest === 0 ? basePersonas.length - 1 : currentTest - 1;
    setCurrentTest(prevIndex);
    setPersona(basePersonas[prevIndex].id);
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">🧪 Test des 5 Personas de Base</h1>
          <p className="text-lg text-muted-foreground mb-6">
            Vérification que les 5 personas de base fonctionnent correctement avec Tailwind
          </p>
          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <p className="text-sm text-muted-foreground">
              <strong>Persona actuel:</strong> {persona.name} ({currentTest + 1}/5)
            </p>
          </div>
        </div>

        {/* Navigation rapide */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Navigation Rapide</h2>
          <div className="flex gap-4 justify-center mb-6">
            <button
              onClick={testPreviousPersona}
              className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            >
              ← Précédent
            </button>
            <button
              onClick={testNextPersona}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/80 transition-colors"
            >
              Suivant →
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {basePersonas.map((p, index) => (
              <button
                key={p.id}
                onClick={() => {
                  setCurrentTest(index);
                  handlePersonaChange(p.id);
                }}
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

        {/* Variables CSS actuelles */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Variables CSS Actuelles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Couleurs Principales</h3>
              <div className="space-y-3">
                {['background', 'foreground', 'primary', 'secondary'].map((key) => (
                  <div key={key} className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded border border-border"
                      style={{ backgroundColor: `hsl(${cssVariables[key] || '0 0% 50%'})` }}
                    ></div>
                    <div className="flex-1">
                      <div className="font-mono text-sm">
                        --{key}: <span className="text-primary">{cssVariables[key] || 'Non définie'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Couleurs Secondaires</h3>
              <div className="space-y-3">
                {['card', 'border'].map((key) => (
                  <div key={key} className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded border border-border"
                      style={{ backgroundColor: `hsl(${cssVariables[key] || '0 0% 50%'})` }}
                    ></div>
                    <div className="flex-1">
                      <div className="font-mono text-sm">
                        --{key}: <span className="text-primary">{cssVariables[key] || 'Non définie'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Typographie & Styles</h3>
              <div className="space-y-3">
                {['font-sans', 'font-serif', 'radius'].map((key) => (
                  <div key={key} className="flex items-center gap-3">
                    <div className="flex-1">
                      <div className="font-mono text-sm">
                        --{key}: <span className="text-primary">{cssVariables[key] || 'Non définie'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Test visuel complet */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Test Visuel Complet</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Boutons et Interactions</h3>
              <div className="space-y-3">
                <button className="w-full bg-primary text-primary-foreground p-3 rounded-lg hover:bg-primary/80 transition-colors">
                  Bouton Primary
                </button>
                <button className="w-full bg-secondary text-secondary-foreground p-3 rounded-lg hover:bg-secondary/80 transition-colors">
                  Bouton Secondary
                </button>
                <button className="w-full border border-border bg-background text-foreground p-3 rounded-lg hover:bg-card transition-colors">
                  Bouton Outline
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Cartes et Conteneurs</h3>
              <div className="space-y-3">
                <div className="bg-card border border-border p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Carte Standard</h4>
                  <p className="text-sm text-muted-foreground">Contenu de la carte avec border et background.</p>
                </div>
                <div className="bg-background border border-border p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Carte Background</h4>
                  <p className="text-sm text-muted-foreground">Contenu avec background principal.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Informations du persona actuel */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Persona Actuel: {persona.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Configuration</h3>
              <div className="space-y-2 text-sm">
                <div><strong>ID:</strong> {persona.id}</div>
                <div><strong>Description:</strong> {persona.description}</div>
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
                <div><strong>Foreground:</strong> {persona.settings.colors.foreground}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Status de compatibilité */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Status de Compatibilité Tailwind</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3">Variables CSS</h3>
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
              <h3 className="font-semibold mb-3">Typographie & Styles</h3>
              <div className="space-y-2">
                {['font-sans', 'font-serif', 'radius'].map((key) => (
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
