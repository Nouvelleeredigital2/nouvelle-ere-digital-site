"use client";

import { usePersona } from '@/components/context/PersonaProvider';
import { Moon, Sun, Palette, Users, Target, Zap, Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ThemeSwitcher() {
  const { persona, setPersona, personas } = usePersona();

  // Obtenir l'icône appropriée pour chaque persona
  const getPersonaIcon = (personaId: string) => {
    switch (personaId) {
      case 'artiste': return Palette;
      case 'architecte': return Users;
      case 'stratege': return Target;
      case 'innovateur': return Zap;
      case 'connecteur': return Heart;
      default: return Palette;
    }
  };

  // Basculer vers le prochain persona dans la liste
  const togglePersona = () => {
    const currentIndex = personas.findIndex(p => p.id === persona.id);
    const nextIndex = (currentIndex + 1) % personas.length;
    setPersona(personas[nextIndex].id);
  };

  // Ou sélectionner un persona spécifique
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPersona(event.target.value);
  };

  if (!persona) return null;

  const Icon = getPersonaIcon(persona.id);

  return (
    <div className="flex items-center gap-4">
      <Button
        onClick={togglePersona}
        variant="ghost"
        size="md"
        className="flex items-center justify-center"
      >
        <Icon className="h-5 w-5" />
        <span className="sr-only">Changer de thème ({persona.name})</span>
      </Button>

      <select
        value={persona.id}
        onChange={handleSelectChange}
        className="bg-background text-foreground border border-border rounded px-2 py-1 text-sm"
      >
        {personas.map(p => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
};
