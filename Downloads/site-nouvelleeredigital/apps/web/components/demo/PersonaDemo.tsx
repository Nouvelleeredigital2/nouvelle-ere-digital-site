// apps/web/components/demo/PersonaDemo.tsx
"use client";

import { personas } from "@/personas";
import { usePersona } from "@/hooks/usePersona";
import { applyPersonaStyles } from "@/lib/persona-styles";
import { useEffect } from "react";

export function PersonaDemo() {
  const { currentPersona, setPersona } = usePersona();

  // Appliquer les styles du persona actuel
  useEffect(() => {
    if (currentPersona) {
      applyPersonaStyles(currentPersona);
    }
  }, [currentPersona]);

  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">
            Démonstration des Personas
          </h1>
          <p className="text-lg text-muted-foreground">
            Testez les différents styles et palettes de couleurs
          </p>
        </div>

        {/* Sélecteur de Personas */}
        <div className="flex flex-wrap gap-4 justify-center">
          {personas.map((persona) => (
            <button
              key={persona.id}
              onClick={() => setPersona(persona.id)}
              className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                currentPersona?.id === persona.id
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {persona.name}
            </button>
          ))}
        </div>

        {/* Persona Actuel */}
        {currentPersona && (
          <div className="card-persona">
            <h2 className="text-2xl font-semibold mb-4">
              Persona Actuel : {currentPersona.name}
            </h2>
            <p className="text-muted-foreground mb-4">
              {currentPersona.description}
            </p>
            <div className="text-sm text-muted-foreground">
              <p><strong>Archétype :</strong> {currentPersona.archetype}</p>
              <p><strong>Ambiance :</strong> {currentPersona.visualIdentity.mood}</p>
              <p><strong>Énergie :</strong> {currentPersona.visualIdentity.energy}</p>
            </div>
          </div>
        )}

        {/* Composants de Test */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Boutons */}
          <div className="card-persona space-y-4">
            <h3 className="text-xl font-semibold">Boutons</h3>
            <div className="space-y-3">
              <button className="btn-primary w-full">
                Bouton Primaire
              </button>
              <button className="btn-secondary w-full">
                Bouton Secondaire
              </button>
              <button className="px-4 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity">
                Bouton Accent
              </button>
            </div>
          </div>

          {/* Cartes */}
          <div className="card-persona space-y-4">
            <h3 className="text-xl font-semibold">Cartes</h3>
            <div className="space-y-3">
              <div className="p-4 bg-card text-card-foreground border border-border rounded-lg">
                <h4 className="font-semibold mb-2">Carte Standard</h4>
                <p className="text-sm text-muted-foreground">
                  Contenu de la carte avec du texte d'exemple.
                </p>
              </div>
              <div className="p-4 bg-success text-card-foreground rounded-lg">
                <h4 className="font-semibold mb-2">Carte Succès</h4>
                <p className="text-sm opacity-90">
                  Message de succès avec contraste optimal.
                </p>
              </div>
            </div>
          </div>

          {/* Typographie */}
          <div className="card-persona space-y-4">
            <h3 className="text-xl font-semibold">Typographie</h3>
            <div className="space-y-3">
              <h1 className="text-dynamic-3xl font-bold">Titre H1</h1>
              <h2 className="text-dynamic-2xl font-semibold">Titre H2</h2>
              <h3 className="text-dynamic-xl font-medium">Titre H3</h3>
              <p className="text-dynamic-base">
                Paragraphe normal avec du texte d'exemple pour tester la lisibilité.
              </p>
              <p className="text-dynamic-sm text-muted-foreground">
                Texte secondaire avec couleur muted.
              </p>
            </div>
          </div>

          {/* Formulaires */}
          <div className="card-persona space-y-4">
            <h3 className="text-xl font-semibold">Formulaires</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Champ de saisie"
                className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <select className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground">
                <option>Sélectionner une option</option>
                <option>Option 1</option>
                <option>Option 2</option>
              </select>
            </div>
          </div>

          {/* Couleurs */}
          <div className="card-persona space-y-4">
            <h3 className="text-xl font-semibold">Palette de Couleurs</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <div className="h-12 bg-primary rounded flex items-center justify-center text-primary-foreground text-sm font-medium">
                  Primary
                </div>
                <div className="h-12 bg-secondary rounded flex items-center justify-center text-secondary-foreground text-sm font-medium">
                  Secondary
                </div>
                <div className="h-12 bg-accent rounded flex items-center justify-center text-accent-foreground text-sm font-medium">
                  Accent
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-12 bg-success rounded flex items-center justify-center text-card-foreground text-sm font-medium">
                  Success
                </div>
                <div className="h-12 bg-warning rounded flex items-center justify-center text-card-foreground text-sm font-medium">
                  Warning
                </div>
                <div className="h-12 bg-error rounded flex items-center justify-center text-card-foreground text-sm font-medium">
                  Error
                </div>
              </div>
            </div>
          </div>

          {/* Layouts */}
          <div className="card-persona space-y-4">
            <h3 className="text-xl font-semibold">Layouts</h3>
            <div className="layout-persona-gallery gap-dynamic-md" data-layout="symmetrical-grid">
              <div className="h-20 bg-primary/20 rounded flex items-center justify-center text-sm animated-element">
                Item 1
              </div>
              <div className="h-24 bg-secondary/20 rounded flex items-center justify-center text-sm animated-element">
                Item 2
              </div>
              <div className="h-16 bg-accent/20 rounded flex items-center justify-center text-sm animated-element">
                Item 3
              </div>
            </div>
          </div>

          {/* Espacements Dynamiques */}
          <div className="card-persona space-y-4">
            <h3 className="text-xl font-semibold">Espacements Dynamiques</h3>
            <div className="space-y-2">
              <div className="p-dynamic-sm bg-primary/10 rounded text-sm">
                Padding Small
              </div>
              <div className="p-dynamic-md bg-secondary/10 rounded text-sm">
                Padding Medium
              </div>
              <div className="p-dynamic-lg bg-accent/10 rounded text-sm">
                Padding Large
              </div>
            </div>
          </div>

          {/* Ombres Dynamiques */}
          <div className="card-persona space-y-4">
            <h3 className="text-xl font-semibold">Ombres Dynamiques</h3>
            <div className="space-y-3">
              <div className="p-4 bg-card rounded shadow-dynamic-sm">
                Ombre Small
              </div>
              <div className="p-4 bg-card rounded shadow-dynamic-md">
                Ombre Medium
              </div>
              <div className="p-4 bg-card rounded shadow-dynamic-lg">
                Ombre Large
              </div>
            </div>
          </div>

          {/* Animations */}
          <div className="card-persona space-y-4">
            <h3 className="text-xl font-semibold">Animations</h3>
            <div className="space-y-3">
              <div className="p-4 bg-primary/10 rounded animated-element hover:bg-primary/20 cursor-pointer">
                Hover pour Animation
              </div>
              <div className="p-4 bg-secondary/10 rounded animate-fade-in-up">
                Animation Fade In Up
              </div>
              <div className="p-4 bg-accent/10 rounded animate-scale-in">
                Animation Scale In
              </div>
            </div>
          </div>
        </div>

        {/* Informations Techniques */}
        <div className="card-persona">
          <h3 className="text-xl font-semibold mb-4">Informations Techniques</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium mb-2">Variables CSS Actives :</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>--background: {typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--background') : 'N/A'}</li>
                <li>--primary: {typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--primary') : 'N/A'}</li>
                <li>--radius: {typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--radius') : 'N/A'}</li>
                <li>--spacing-unit: {typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--spacing-unit') : 'N/A'}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Classes Appliquées :</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>persona-{currentPersona?.id}</li>
                <li>spacing-{currentPersona?.settings.styles?.spacing}</li>
                <li>animation-persona-{currentPersona?.settings.animations?.intensity}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
