/**
 * Utilitaires pour générer des IDs de manière cohérente
 * et éviter les problèmes d'hydratation React
 */

let idCounter = 0;

/**
 * Génère un ID unique de manière déterministe
 * Utilise un compteur qui s'incrémente à chaque appel
 * pour éviter les problèmes d'hydratation
 */
export function generateId(prefix = 'id'): string {
  return `${prefix}-${++idCounter}`;
}

/**
 * Génère un ID unique basé sur un timestamp
 * À utiliser seulement côté client pour éviter les problèmes d'hydratation
 */
export function generateTimestampId(prefix = 'timestamp'): string {
  if (typeof window === 'undefined') {
    // Côté serveur, utiliser un ID déterministe
    return generateId(prefix);
  }
  
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Génère un UUID v4 si disponible, sinon un ID simple
 * À utiliser seulement côté client
 */
export function generateUUID(prefix = 'uuid'): string {
  if (typeof window === 'undefined') {
    // Côté serveur, utiliser un ID déterministe
    return generateId(prefix);
  }
  
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  
  // Fallback pour les navigateurs plus anciens
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Génère un ID basé sur le contenu (hash)
 * Toujours déterministe, même entre serveur et client
 */
export function generateHashId(content: string, prefix = 'hash'): string {
  // Simple hash function
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  
  return `${prefix}-${Math.abs(hash).toString(36)}`;
}
