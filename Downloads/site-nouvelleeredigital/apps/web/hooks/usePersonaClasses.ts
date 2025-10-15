// apps/web/hooks/usePersonaClasses.ts
import { useMemo } from 'react';
import { usePersona } from '@/components/context/PersonaProvider';
import { getPersonaClasses } from '@/lib/persona-styles';

/**
 * Hook pour utiliser les classes CSS du persona actif
 * Doit être utilisé dans un composant React avec le contexte PersonaProvider
 */
export function usePersonaClasses() {
  const { persona } = usePersona();

  return useMemo(() => {
    if (!persona?.settings) {
      return {
        color: '',
        typography: '',
        layout: '',
        animation: '',
      };
    }

    return getPersonaClasses(persona);
  }, [persona]);
}
