// apps/web/lib/server-utils.ts

import { personas } from '@/personas';
import type { CreativePersona } from '@/shared/theme.types';

/**
 * Utilitaires pour le rendu côté serveur
 */

/**
 * Lit un cookie depuis la requête côté serveur
 * Cette fonction peut être utilisée dans getServerSideProps, getStaticProps, etc.
 */
export function getCookieValue(cookieString: string | undefined, name: string): string | undefined {
  if (!cookieString) return undefined;

  const cookies = cookieString.split(';');
  for (const cookie of cookies) {
    const [cookieName, ...cookieValueParts] = cookie.trim().split('=');
    if (cookieName === name) {
      return cookieValueParts.join('=');
    }
  }

  return undefined;
}

/**
 * Obtient le persona depuis les cookies côté serveur
 */
export function getPersonaFromCookies(cookieString: string | undefined): string | null {
  const personaId = getCookieValue(cookieString, 'creative-persona-v1');
  if (!personaId) return null;

  const personaExists = personas.some((p: CreativePersona) => p.id === personaId);
  return personaExists ? personaId : null;
}

/**
 * Applique les classes CSS du persona sur l'élément HTML côté serveur
 */
export function applyPersonaClassesToHtml(personaId: string | null): string {
  if (!personaId) return '';

  const persona = personas.find((p: CreativePersona) => p.id === personaId);
  if (!persona?.settings) return '';

  // Applique simplement la classe principale du persona.
  // Les variables CSS seront gérées par le client via `applyPersonaStyles`.
  return `persona-${persona.id}`;
}
