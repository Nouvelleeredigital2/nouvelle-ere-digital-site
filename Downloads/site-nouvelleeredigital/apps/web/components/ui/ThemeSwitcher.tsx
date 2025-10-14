"'use client';

import { usePersona } from '@/components/context/PersonaProvider'; // ← IMPORTER usePersona
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/Button'; // Assurez-vous que le chemin est correct

export function ThemeSwitcher() {
  // Utiliser le contexte des personas
  const { persona, setPersona, personas } = usePersona();

  // Exemple simple de bascule entre deux personas : 'artiste' et 'architecte'
  // Vous pouvez adapter cette logique pour parcourir tous les personas
  const togglePersona = () => {
    const currentId = persona.id;
    // Logique de bascule simple
    const nextPersonaId = currentId === 'artiste' ? 'architecte' : 'artiste';
    setPersona(nextPersonaId);
  };

  // Ou si vous voulez un sélecteur
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPersona(event.target.value);
  };

  if (!persona) return null;

  // Exemple avec un simple bouton (adaptez selon vos besoins)
  return (
    <div>
      <Button onClick={togglePersona} variant="ghost" size="icon">
        {persona.id === 'artiste' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        <span className="sr-only">Changer de persona</span>
      </Button>

      {/* Exemple avec un sélecteur déroulant */}
      <select value={persona.id} onChange={handleSelectChange} className="ml-4 bg-background text-foreground">
        {personas.map(p => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </div>
  );
};
