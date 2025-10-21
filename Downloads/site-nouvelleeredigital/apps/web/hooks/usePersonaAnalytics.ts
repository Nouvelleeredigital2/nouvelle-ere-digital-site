"use client";

import { useEffect, useCallback } from "react";
import { usePersona } from "@/components/context/PersonaProvider";

interface AnalyticsEvent {
  event: string;
  personaId: string;
  personaName: string;
  timestamp: string;
  sessionId: string;
  metadata?: Record<string, any>;
}

interface PersonaUsageStats {
  personaId: string;
  personaName: string;
  totalSessions: number;
  totalTimeSpent: number; // en minutes
  switchCount: number;
  lastUsed: string;
  preferences: Record<string, any>;
}

class PersonaAnalytics {
  private sessionId: string;
  private sessionStartTime: number;
  private events: AnalyticsEvent[] = [];
  private _isEnabled: boolean;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.sessionStartTime = Date.now();
    this._isEnabled =
      process.env.NODE_ENV === "production" || localStorage.getItem("analytics-enabled") === "true";

    // Écouter les événements de changement de persona (caster en any pour CustomEvent)
    window.addEventListener(
      "personaChanged",
      (this.handlePersonaChange.bind(this) as unknown) as EventListener,
    );
    window.addEventListener(
      "userPreferencesChanged",
      (this.handlePreferencesChange.bind(this) as unknown) as EventListener,
    );
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private trackEvent(
    event: string,
    personaId: string,
    personaName: string,
    metadata?: Record<string, any>,
  ) {
    if (!this._isEnabled) return;

    const analyticsEvent: AnalyticsEvent = {
      event,
      personaId,
      personaName,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      metadata,
    };

    this.events.push(analyticsEvent);

    // Sauvegarder localement pour démonstration
    this.saveEventsLocally();

    // Ici, on pourrait envoyer à un service d'analytics réel
    console.log("Analytics Event:", analyticsEvent);

    // Simulation d'envoi à un service externe
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", event, {
        persona_id: personaId,
        persona_name: personaName,
        session_id: this.sessionId,
        ...metadata,
      });
    }
  }

  public get isEnabled(): boolean {
    return this._isEnabled;
  }

  private handlePersonaChange(event: CustomEvent) {
    const { personaId, personaName } = event.detail;
    this.trackEvent("persona_switch", personaId, personaName, {
      previousPersona: this.getCurrentPersonaId(),
    });
  }

  private handlePreferencesChange(event: CustomEvent) {
    const preferences = event.detail;
    this.trackEvent(
      "preferences_updated",
      preferences.personaId,
      preferences.personaName || "Unknown",
      {
        onboardingCompleted: preferences.onboardingCompleted,
        preferences,
      },
    );
  }

  private getCurrentPersonaId(): string | null {
    try {
      return localStorage.getItem("creative-persona");
    } catch {
      return null;
    }
  }

  private saveEventsLocally() {
    try {
      const existingEvents = JSON.parse(localStorage.getItem("persona-analytics") || "[]");
      const allEvents = [...existingEvents, ...this.events];
      localStorage.setItem("persona-analytics", JSON.stringify(allEvents.slice(-1000))); // Garder les 1000 derniers événements
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des événements analytics:", error);
    }
  }

  // Méthodes publiques pour le tracking manuel
  trackPageView(page: string, personaId: string, personaName: string) {
    this.trackEvent("page_view", personaId, personaName, { page });
  }

  trackUserEngagement(
    action: string,
    personaId: string,
    personaName: string,
    metadata?: Record<string, any>,
  ) {
    this.trackEvent("user_engagement", personaId, personaName, { action, ...metadata });
  }

  trackPerformance(metric: string, value: number, personaId: string, personaName: string) {
    this.trackEvent("performance_metric", personaId, personaName, { metric, value });
  }

  // Récupérer les statistiques d'utilisation
  getUsageStats(): PersonaUsageStats[] {
    try {
      const events = JSON.parse(localStorage.getItem("persona-analytics") || "[]");
      const stats: Record<string, PersonaUsageStats> = {};

      events.forEach((event: AnalyticsEvent) => {
        if (!stats[event.personaId]) {
          stats[event.personaId] = {
            personaId: event.personaId,
            personaName: event.personaName,
            totalSessions: 0,
            totalTimeSpent: 0,
            switchCount: 0,
            lastUsed: event.timestamp,
            preferences: {},
          };
        }

        const stat = stats[event.personaId];

        // Compter les sessions uniques
        if (event.event === "session_start") {
          stat.totalSessions++;
        }

        // Accumuler le temps passé
        if (event.event === "session_time") {
          stat.totalTimeSpent += event.metadata?.duration || 0;
        }

        // Compter les changements
        if (event.event === "persona_switch") {
          stat.switchCount++;
        }

        // Mettre à jour la dernière utilisation
        if (new Date(event.timestamp) > new Date(stat.lastUsed)) {
          stat.lastUsed = event.timestamp;
        }
      });

      return Object.values(stats);
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques:", error);
      return [];
    }
  }

  // Démarrer une nouvelle session
  startSession(personaId: string, personaName: string) {
    this.trackEvent("session_start", personaId, personaName, {
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      timestamp: new Date().toISOString(),
    });
  }

  // Mettre à jour le temps de session
  updateSessionTime(duration: number, personaId: string, personaName: string) {
    this.trackEvent("session_time", personaId, personaName, { duration });
  }

  // Nettoyer les anciennes données
  cleanup() {
    try {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      const events = JSON.parse(localStorage.getItem("persona-analytics") || "[]");
      const recentEvents = events.filter(
        (event: AnalyticsEvent) => new Date(event.timestamp) > thirtyDaysAgo,
      );

      localStorage.setItem("persona-analytics", JSON.stringify(recentEvents));
    } catch (error) {
      console.error("Erreur lors du nettoyage des données analytics:", error);
    }
  }
}

// Instance globale d'analytics
let analyticsInstance: PersonaAnalytics | null = null;

export function usePersonaAnalytics() {
  const { persona } = usePersona();

  // Initialiser l'analytics au premier rendu
  useEffect(() => {
    if (!analyticsInstance) {
      analyticsInstance = new PersonaAnalytics();
      analyticsInstance.startSession(persona.id, persona.name);
    }

    // Tracker les changements de page
    const handleRouteChange = () => {
      if (analyticsInstance) {
        analyticsInstance.trackPageView(window.location.pathname, persona.id, persona.name);
      }
    };

    // Écouter les changements de route (simplifié)
    window.addEventListener("popstate", handleRouteChange);

    return () => {
      window.removeEventListener("popstate", handleRouteChange);
    };
  }, [persona]);

  // Tracker le temps passé sur la page
  useEffect(() => {
    let startTime = Date.now();

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Page devient invisible, calculer le temps passé
        const timeSpent = (Date.now() - startTime) / 1000 / 60; // en minutes
        if (analyticsInstance && timeSpent > 0.1) {
          // Minimum 6 secondes
          analyticsInstance.updateSessionTime(timeSpent, persona.id, persona.name);
        }
      } else {
        // Page redevient visible, reset le timer
        startTime = Date.now();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [persona]);

  const trackEngagement = useCallback(
    (action: string, metadata?: Record<string, any>) => {
      if (analyticsInstance) {
        analyticsInstance.trackUserEngagement(action, persona.id, persona.name, metadata);
      }
    },
    [persona],
  );

  const trackPerformance = useCallback(
    (metric: string, value: number) => {
      if (analyticsInstance) {
        analyticsInstance.trackPerformance(metric, value, persona.id, persona.name);
      }
    },
    [persona],
  );

  const getStats = useCallback(() => {
    return analyticsInstance?.getUsageStats() || [];
  }, []);

  return {
    trackEngagement,
    trackPerformance,
    getStats,
    isEnabled: analyticsInstance?.isEnabled || false,
  };
}
