"use client";

import React, { useState } from "react";
import { usePersona } from "@/components/context/PersonaProvider";
import { personas } from "@/personas";

export default function DemoPage() {
  const { persona, setPersona, personas: availablePersonas } = usePersona();
  const [selectedPersonaId, setSelectedPersonaId] = useState(persona.id);

  const handlePersonaChange = (personaId: string) => {
    setSelectedPersonaId(personaId);
    setPersona(personaId);
  };

  const demoCards = [
    {
      title: "Carte Adaptative",
      description: "Cette carte change son apparence selon le persona choisi",
      content: "Le border-radius, les ombres et les couleurs s'adaptent automatiquement.",
    },
    {
      title: "Grille Responsive",
      description: "La mise en page change selon les préférences de layout",
      content: "Chaque persona définit sa propre organisation du contenu.",
    },
    {
      title: "Boutons Contextuels",
      description: "Les boutons héritent des couleurs du thème actif",
      content: "Les couleurs primaires et secondaires s'adaptent au persona.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-8 space-y-8">
        {/* Header */}
        <div className="text-center bg-card rounded-lg p-8 shadow-sm border border-border">
          <h1 className="text-4xl font-bold mb-4 text-foreground">
            🎨 Démonstration du Système de Personas
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Changez de persona pour voir les différents thèmes en action !
          </p>
          
          {/* Sélecteur de Personas */}
          <div className="max-w-md mx-auto">
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Choisissez un persona :
            </label>
            <select
              value={selectedPersonaId}
              onChange={(e) => handlePersonaChange(e.target.value)}
              className="w-full px-4 py-2 border border-border rounded-lg bg-card text-card-foreground focus:ring-2 focus:ring-primary focus:border-primary"
            >
              {availablePersonas.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} - {p.description}
                </option>
              ))}
            </select>
          </div>

          {/* Info du persona actif */}
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <p className="text-sm text-muted-foreground">
              <strong>Persona actif:</strong> {persona.name}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {persona.description}
            </p>
          </div>
        </div>

        {/* Cartes de démonstration */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Cartes Adaptatives</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demoCards.map((card, index) => (
              <div
                key={index}
                className="bg-card rounded-lg p-6 shadow-sm border border-border hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">{card.title}</h3>
                <p className="text-muted-foreground mb-4">{card.description}</p>
                <p className="text-sm text-muted-foreground">{card.content}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Boutons de démonstration */}
        <section>
          <h2 className="text-2xl font-semibold mb-6 text-foreground">Boutons Contextuels</h2>
          <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium">
                Bouton Principal
              </button>
              <button className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors font-medium">
                Bouton Secondaire
              </button>
              <button className="px-6 py-3 border border-border text-foreground rounded-lg hover:bg-accent transition-colors font-medium">
                Bouton Outline
              </button>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              Ces boutons utilisent automatiquement les couleurs du persona actif
            </p>
          </div>
        </section>

        {/* Informations du persona */}
        <section>
          <div className="bg-card rounded-lg p-8 shadow-sm border border-border">
            <h2 className="text-2xl font-semibold mb-6 text-card-foreground">Configuration du Persona Actif</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-card-foreground">Identité Visuelle</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <strong>Mood:</strong> {persona.visualIdentity.mood}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Energy:</strong> {persona.visualIdentity.energy}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Archétype:</strong> {persona.archetype}
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4 text-card-foreground">Layout Préféré</h3>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <strong>Galerie:</strong> {persona.settings.layouts.gallery}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Sections:</strong> {persona.settings.layouts.sections}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    <strong>Navigation:</strong> {persona.settings.layouts.navigation}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}