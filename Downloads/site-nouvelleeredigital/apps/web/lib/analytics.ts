// apps/web/lib/analytics.ts

/**
 * Système d'analytics pour le suivi des personas
 */

export interface PersonaAnalytics {
  personaId: string;
  timestamp: number;
  action: "select" | "view" | "switch";
  userAgent?: string;
  referrer?: string;
  sessionId: string;
}

/**
 * Génère un ID de session unique
 */
export function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Obtient l'ID de session depuis le localStorage ou en crée un nouveau
 */
export function getSessionId(): string {
  if (typeof window === "undefined") return "server";

  let sessionId = localStorage.getItem("persona-session-id");
  if (!sessionId) {
    sessionId = generateSessionId();
    localStorage.setItem("persona-session-id", sessionId);
  }

  return sessionId;
}

/**
 * Enregistre une action de persona
 */
export function trackPersonaAction(personaId: string, action: "select" | "view" | "switch"): void {
  if (typeof window === "undefined") return;

  const analytics: PersonaAnalytics = {
    personaId,
    timestamp: Date.now(),
    action,
    userAgent: navigator.userAgent,
    referrer: document.referrer,
    sessionId: getSessionId(),
  };

  // Sauvegarder localement pour l'instant
  // (À remplacer par un vrai système d'analytics comme Google Analytics, Mixpanel, etc.)
  const existingData = JSON.parse(localStorage.getItem("persona-analytics") || "[]");
  existingData.push(analytics);

  // Garder seulement les 1000 derniers événements
  if (existingData.length > 1000) {
    existingData.splice(0, existingData.length - 1000);
  }

  localStorage.setItem("persona-analytics", JSON.stringify(existingData));

  console.log("📊 Analytics:", analytics);
}

/**
 * Obtient les statistiques d'utilisation des personas
 */
export function getPersonaStats(): Record<
  string,
  {
    totalViews: number;
    totalSelections: number;
    totalSwitches: number;
    lastUsed: number;
  }
> {
  if (typeof window === "undefined") return {};

  const data = JSON.parse(localStorage.getItem("persona-analytics") || "[]");
  const stats: Record<string, any> = {};

  data.forEach((event: PersonaAnalytics) => {
    if (!stats[event.personaId]) {
      stats[event.personaId] = {
        totalViews: 0,
        totalSelections: 0,
        totalSwitches: 0,
        lastUsed: 0,
      };
    }

    switch (event.action) {
      case "view":
        stats[event.personaId].totalViews++;
        break;
      case "select":
        stats[event.personaId].totalSelections++;
        break;
      case "switch":
        stats[event.personaId].totalSwitches++;
        break;
    }

    if (event.timestamp > stats[event.personaId].lastUsed) {
      stats[event.personaId].lastUsed = event.timestamp;
    }
  });

  return stats;
}

/**
 * Obtient le persona le plus populaire
 */
export function getMostPopularPersona(): string | null {
  const stats = getPersonaStats();
  let mostPopular = null;
  let maxSelections = 0;

  Object.entries(stats).forEach(([personaId, data]: [string, any]) => {
    if (data.totalSelections > maxSelections) {
      maxSelections = data.totalSelections;
      mostPopular = personaId;
    }
  });

  return mostPopular;
}
