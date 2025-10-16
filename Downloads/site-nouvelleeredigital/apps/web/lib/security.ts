// apps/web/lib/security.ts

/**
 * Utilitaires de sécurité pour les données utilisateur
 */

/**
 * Valide qu'un ID de persona est légitime
 */
export function isValidPersonaId(personaId: string): boolean {
  // Liste des personas valides (hardcodée pour la sécurité)
  const validPersonaIds = [
    "artiste",
    "architecte",
    "stratege",
    "innovateur",
    "connecteur",
    "minimaliste",
    "colore",
    "professionnel",
    "gamer",
    "artisan",
  ];

  return validPersonaIds.includes(personaId);
}

/**
 * Sécurise la valeur d'un cookie avant sauvegarde
 */
export function sanitizeCookieValue(value: string): string {
  // Échapper les caractères spéciaux et limiter la longueur
  return value.replace(/[<>"'&]/g, "").substring(0, 50);
}

/**
 * Configure les options sécurisées pour les cookies
 */
export function getSecureCookieOptions(expiresDays: number = 365) {
  const isProduction = process.env.NODE_ENV === "production";
  const isHttps = typeof window !== "undefined" && window.location.protocol === "https:";

  return {
    expires: expiresDays,
    path: "/",
    sameSite: isProduction ? "strict" : "lax",
    secure: isProduction && isHttps,
    httpOnly: false, // Ne peut pas être httpOnly côté client
  };
}

/**
 * Valide la structure d'un persona avant traitement
 */
export function validatePersonaStructure(persona: any): boolean {
  if (!persona || typeof persona !== "object") return false;

  // Validation stricte de la structure
  return !!(
    persona.id &&
    persona.name &&
    persona.settings &&
    persona.settings.colors &&
    persona.settings.typography &&
    typeof persona.id === "string" &&
    typeof persona.name === "string" &&
    typeof persona.settings.colors === "object" &&
    typeof persona.settings.typography === "object"
  );
}

/**
 * Génère un hash simple pour vérifier l'intégrité des données
 */
export function generateDataHash(data: string): string {
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash; // Convertir en 32 bits
  }
  return Math.abs(hash).toString(36);
}

/**
 * Vérifie l'intégrité des données avec un hash
 */
export function verifyDataIntegrity(data: string, expectedHash: string): boolean {
  return generateDataHash(data) === expectedHash;
}
