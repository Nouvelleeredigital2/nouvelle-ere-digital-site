// apps/web/components/demo/PersonaShowcase.tsx
"use client";

import { usePersona } from "@/components/context/PersonaProvider";
import { usePersonaClasses } from "@/hooks/usePersonaClasses";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

/**
 * Composant de démonstration du système de personas
 * Montre comment les styles changent selon le persona actif
 */
export function PersonaShowcase() {
  const { persona, personas, setPersona } = usePersona();
  const personaClasses = usePersonaClasses();

  return (
    <div className={`min-h-screen p-8 ${personaClasses.color}`}>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Sélecteur de persona */}
        <Card className="p-6 bg-persona-card border-persona shadow-persona rounded-persona">
          <h2 className="text-2xl font-bold mb-4 text-persona-primary font-persona-sans">
            Sélection du Persona Actif
          </h2>

          <div className="flex flex-wrap gap-3 mb-4">
            {personas.slice(0, 5).map((p) => (
              <button
                key={p.id}
                onClick={() => setPersona(p.id)}
                className={`px-4 py-2 rounded-lg transition-all font-persona-sans ${
                  persona.id === p.id
                    ? "bg-persona-primary text-white shadow-lg"
                    : "bg-persona-muted text-persona-primary hover:bg-persona-muted/80"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>

          <div className="text-sm text-persona-secondary font-persona-sans">
            <p>
              <strong>Persona actif :</strong> {persona.name}
            </p>
            <p>
              <strong>Énergie :</strong> {persona.visualIdentity.energy}
            </p>
            <p>
              <strong>Humeur :</strong> {persona.visualIdentity.mood}
            </p>
          </div>
        </Card>

        {/* Démonstration des couleurs */}
        <Card className="p-6 bg-persona-card border-persona shadow-persona rounded-persona">
          <h3 className="text-xl font-bold mb-4 text-persona-primary font-persona-sans">
            Palette de Couleurs
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="text-xs font-medium text-persona-secondary">Primaire</div>
              <div className="w-full h-8 bg-[var(--color-primary)] rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-medium text-persona-secondary">Secondaire</div>
              <div className="w-full h-8 bg-[var(--color-secondary)] rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-medium text-persona-secondary">Accent</div>
              <div className="w-full h-8 bg-[var(--color-accent)] rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="text-xs font-medium text-persona-secondary">Arrière-plan</div>
              <div className="w-full h-8 bg-[var(--color-background)] border border-persona rounded"></div>
            </div>
          </div>
        </Card>

        {/* Démonstration de la typographie */}
        <Card className="p-6 bg-persona-card border-persona shadow-persona rounded-persona">
          <h3 className="text-xl font-bold mb-4 text-persona-primary font-persona-sans">
            Typographie
          </h3>

          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold font-persona-serif text-persona-primary">
                Titre Principal (Serif)
              </h1>
              <p className="text-sm text-persona-secondary mt-2">
                Police serif : {persona.settings.typography.fontFamilySerif}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold font-persona-sans text-persona-primary">
                Sous-titre (Sans-serif)
              </h2>
              <p className="text-sm text-persona-secondary mt-2">
                Police sans-serif : {persona.settings.typography.fontFamilySans}
              </p>
            </div>

            <div>
              <p className="text-base font-persona-mono text-persona-secondary">
                Texte monospace pour le code et les données techniques.
              </p>
              <p className="text-sm text-persona-secondary mt-2">
                Police monospace : {persona.settings.typography.fontFamilyMono}
              </p>
            </div>
          </div>
        </Card>

        {/* Démonstration des layouts */}
        <Card className="p-6 bg-persona-card border-persona shadow-persona rounded-persona">
          <h3 className="text-xl font-bold mb-4 text-persona-primary font-persona-sans">
            Layouts et Espacement
          </h3>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-persona-secondary mb-2">
                <strong>Galerie :</strong> {persona.settings.layouts.gallery}
              </p>
              <div
                className="layout-persona-gallery grid gap-2 p-4 bg-persona-muted rounded-persona"
                data-layout={persona.settings.layouts.gallery}
              >
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div
                    key={item}
                    className="bg-persona-primary text-white p-3 rounded text-center font-persona-sans"
                  >
                    Élément {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm text-persona-secondary">
              <p>
                <strong>Style du héros :</strong> {persona.settings.layouts.heroStyle}
              </p>
              <p>
                <strong>Alignement du texte :</strong> {persona.settings.layouts.heroTextAlign}
              </p>
              <p>
                <strong>Rayon des bordures :</strong> {persona.settings.styles.borderRadius}
              </p>
              <p>
                <strong>Ombre des cartes :</strong> {persona.settings.styles.cardShadow}
              </p>
            </div>
          </div>
        </Card>

        {/* Démonstration des animations */}
        <Card className="p-6 bg-persona-card border-persona shadow-persona rounded-persona">
          <h3 className="text-xl font-bold mb-4 text-persona-primary font-persona-sans">
            Animations et Transitions
          </h3>

          <div className="space-y-4">
            <div className="text-sm text-persona-secondary mb-4">
              <p>
                <strong>Intensité :</strong> {persona.settings.animations.intensity}
              </p>
              <p>
                <strong>Transitions :</strong> {persona.settings.animations.transitions}
              </p>
            </div>

            <div className="flex gap-4">
              <div
                className={`animation-persona-${persona.settings.animations.intensity} p-4 bg-persona-muted rounded-persona`}
              >
                <p className="text-persona-primary">
                  Animation {persona.settings.animations.intensity}
                </p>
              </div>

              <div
                className={`animation-persona-${persona.settings.animations.transitions} p-4 bg-persona-muted rounded-persona`}
              >
                <p className="text-persona-primary">
                  Transition {persona.settings.animations.transitions}
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Badges d'information */}
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-persona-primary text-white">Persona: {persona.name}</Badge>
          <Badge className="bg-persona-secondary text-white">
            Énergie: {persona.visualIdentity.energy}
          </Badge>
          <Badge className="bg-persona-accent text-white">
            Humeur: {persona.visualIdentity.mood}
          </Badge>
        </div>
      </div>
    </div>
  );
}
