// apps/web/lib/server-utils.ts
import { personas } from "@/personas";
import type { CreativePersona } from "@/shared/theme.types";

/**
 * Utilitaires pour le rendu côté serveur
 */

/**
 * Lit un cookie depuis la requête côté serveur
 */
export function getCookieValue(cookieString: string | undefined, name: string): string | undefined {
  if (!cookieString) return undefined;

  const cookies = cookieString.split(";");
  for (const cookie of cookies) {
    const [cookieName, ...cookieValueParts] = cookie.trim().split("=");
    if (cookieName === name) {
      return cookieValueParts.join("=");
    }
  }

  return undefined;
}

/**
 * Obtient le persona depuis les cookies côté serveur
 */
export function getPersonaFromCookies(cookieString: string | undefined): string | null {
  const personaId = getCookieValue(cookieString, "creative-persona-v1");
  if (!personaId) return null;

  // Utiliser .some() est plus performant que .find() si on veut juste un booléen.
  const personaExists = personas.some((p: any) => p.id === personaId);
  return personaExists ? personaId : null;
}

/**
 * Applique la classe CSS racine du persona. C'est la seule chose
 * que le serveur a besoin de faire pour éviter le "flash".
 */
export function applyPersonaClassesToHtml(personaId: string | null): string {
  if (!personaId) {
    // Appliquer la classe par défaut si aucun cookie n'est trouvé
    return `persona-${personas[0].id}`;
  }
  return `persona-${personaId}`;
}
