// apps/web/lib/server-utils.ts

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

  // Vérifier que le persona existe
  try {
    // Import dynamique pour éviter les problèmes de bundling
    const { personas } = require('@/personas');
    const persona = personas.find((p: any) => p.id === personaId);
    return persona ? personaId : null;
  } catch {
    return null;
  }
}

/**
 * Applique les classes CSS du persona sur l'élément HTML côté serveur
 */
export function applyPersonaClassesToHtml(personaId: string | null): string {
  if (!personaId) return '';

  try {
    // Import dynamique pour éviter les problèmes de bundling
    const { personas } = require('@/personas');
    const persona = personas.find((p: any) => p.id === personaId);

    if (!persona?.settings) return '';

    const { colors, typography, layouts, animations } = persona.settings;

    // Construire les classes CSS basées sur le persona
    const classes = [];

    // Classes de couleur
    if (colors) {
      classes.push(`persona-${personaId}`);
    }

    // Classes de layout
    if (layouts?.gallery) {
      classes.push(`layout-${layouts.gallery}`);
    }

    // Classes d'animation
    if (animations?.intensity) {
      classes.push(`animation-${animations.intensity}`);
    }

    return classes.join(' ');
  } catch {
    return '';
  }
}
