"use client";

import React from "react";
import { usePersona } from "@/components/context/PersonaProvider";
import { AdaptiveCard } from "@/components/ui/AdaptiveCard";
import { AdaptiveGrid } from "@/components/ui/AdaptiveGrid";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export function PersonaDemo() {
  const { persona } = usePersona();

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
    <div className="max-w-6xl mx-auto p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Démonstration du Système de Personas</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Persona actif: <Badge className="ml-2">{persona.name}</Badge>
        </p>
        <p className="text-muted-foreground max-w-2xl mx-auto">{persona.description}</p>
      </div>

      {/* Cartes adaptatives */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Cartes Adaptatives</h2>
        <AdaptiveGrid layoutType="gallery" className="gap-6">
          {demoCards.map((card, index) => (
            <AdaptiveCard key={index} className="p-6">
              <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
              <p className="text-muted-foreground mb-3">{card.description}</p>
              <p className="text-sm">{card.content}</p>
            </AdaptiveCard>
          ))}
        </AdaptiveGrid>
      </section>

      {/* Grille adaptative */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Grille Adaptative</h2>
        <AdaptiveGrid layoutType="sections">
          {["Section 1", "Section 2", "Section 3"].map((section, index) => (
            <Card key={index} className="p-8">
              <h3 className="text-lg font-semibold mb-2">{section}</h3>
              <p className="text-muted-foreground">
                Cette section s'organise différemment selon le layout choisi par le persona.
              </p>
            </Card>
          ))}
        </AdaptiveGrid>
      </section>

      {/* Boutons contextuels */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Boutons Contextuels</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <Button variant="primary">Bouton Principal</Button>
          <Button variant="outline">Bouton Secondaire</Button>
          <Button variant="ghost">Bouton Fantôme</Button>
        </div>
        <p className="text-center text-sm text-muted-foreground mt-4">
          Ces boutons utilisent automatiquement les couleurs du persona actif
        </p>
      </section>

      {/* Informations du persona */}
      <section>
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Configuration du Persona Actif</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-2">Identité Visuelle</h3>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Mood:</strong> {persona.visualIdentity?.mood}
                </p>
                <p>
                  <strong>Energy:</strong> {persona.visualIdentity?.energy}
                </p>
                <p>
                  <strong>Archétype:</strong> {persona.archetype || persona.name}
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-2">Layout Préféré</h3>
              <div className="space-y-1 text-sm">
                <p>
                  <strong>Galerie:</strong> {persona.settings.layouts.gallery}
                </p>
                {persona.settings.layouts.sections && (
                  <p>
                    <strong>Sections:</strong> {persona.settings.layouts.sections}
                  </p>
                )}
                <p>
                  <strong>Navigation:</strong> {persona.settings.layouts.navigation}
                </p>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
