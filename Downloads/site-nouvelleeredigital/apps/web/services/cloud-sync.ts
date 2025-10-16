// Service de sauvegarde cloud pour les préférences utilisateur

export interface CloudPreferences {
  userId?: string;
  personaId: string;
  themeId?: string;
  preferences: Record<string, any>;
  lastSync: string;
  version: string;
}

export interface SyncResult {
  success: boolean;
  data?: CloudPreferences;
  error?: string;
}

class CloudSyncService {
  private apiEndpoint: string;
  private isOnline: boolean;
  private syncQueue: CloudPreferences[] = [];

  constructor(apiEndpoint?: string) {
    this.apiEndpoint = apiEndpoint || process.env.NEXT_PUBLIC_API_ENDPOINT || "/api/preferences";
    this.isOnline = navigator.onLine;

    // Écouter les changements de connexion
    window.addEventListener("online", () => {
      this.isOnline = true;
      this.syncPendingChanges();
    });

    window.addEventListener("offline", () => {
      this.isOnline = false;
    });
  }

  // Sauvegarder les préférences dans le cloud
  async savePreferences(preferences: Partial<CloudPreferences>): Promise<SyncResult> {
    const dataToSave: CloudPreferences = {
      userId: this.getUserId(),
      personaId: preferences.personaId || "default",
      themeId: preferences.themeId,
      preferences: preferences.preferences || {},
      lastSync: new Date().toISOString(),
      version: "1.0.0",
      ...preferences,
    };

    if (this.isOnline) {
      try {
        const response = await fetch(`${this.apiEndpoint}/sync`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${this.getAuthToken()}`,
          },
          body: JSON.stringify(dataToSave),
        });

        if (response.ok) {
          const result = await response.json();
          return { success: true, data: result };
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Erreur lors de la sauvegarde cloud:", error);

        // Fallback vers le stockage local si l'API n'est pas disponible
        this.saveLocally(dataToSave);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Erreur inconnue",
        };
      }
    } else {
      // Hors ligne : sauvegarder localement et mettre en file d'attente
      this.saveLocally(dataToSave);
      this.syncQueue.push(dataToSave);
      return {
        success: true,
        data: dataToSave,
      };
    }
  }

  // Charger les préférences depuis le cloud
  async loadPreferences(userId?: string): Promise<SyncResult> {
    const targetUserId = userId || this.getUserId();

    if (this.isOnline) {
      try {
        const response = await fetch(`${this.apiEndpoint}/sync/${targetUserId}`, {
          headers: {
            Authorization: `Bearer ${this.getAuthToken()}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          return { success: true, data };
        } else if (response.status === 404) {
          // Pas de données cloud, essayer le stockage local
          return this.loadLocally(targetUserId);
        } else {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        console.error("Erreur lors du chargement cloud:", error);
        return this.loadLocally(targetUserId);
      }
    } else {
      // Hors ligne : charger depuis le stockage local
      return this.loadLocally(targetUserId);
    }
  }

  // Synchroniser les changements en attente
  private async syncPendingChanges() {
    if (this.syncQueue.length === 0) return;

    const pendingChanges = [...this.syncQueue];
    this.syncQueue = [];

    for (const change of pendingChanges) {
      await this.savePreferences(change);
    }
  }

  // Méthodes de stockage local (fallback)
  private saveLocally(data: CloudPreferences) {
    try {
      const existing = this.loadLocally(data.userId).data;
      const allData = existing ? [existing, data] : [data];

      localStorage.setItem(`cloud-preferences-${data.userId}`, JSON.stringify(data));
      localStorage.setItem(`cloud-preferences-backup-${data.userId}`, JSON.stringify(allData));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde locale:", error);
    }
  }

  private loadLocally(userId?: string): SyncResult {
    try {
      const targetUserId = userId || this.getUserId();
      const data = localStorage.getItem(`cloud-preferences-${targetUserId}`);

      if (data) {
        return { success: true, data: JSON.parse(data) };
      } else {
        return { success: false, error: "Aucune donnée locale trouvée" };
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Erreur lors du chargement local",
      };
    }
  }

  // Générer un ID utilisateur unique
  private getUserId(): string {
    let userId = localStorage.getItem("user-id");
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem("user-id", userId);
    }
    return userId;
  }

  // Obtenir le token d'authentification (simplifié)
  private getAuthToken(): string {
    // Dans un vrai environnement, ceci serait un JWT ou similaire
    return localStorage.getItem("auth-token") || "demo-token";
  }

  // Vérifier le statut de connexion
  getConnectionStatus(): { online: boolean; hasApi: boolean } {
    return {
      online: this.isOnline,
      hasApi: !!this.apiEndpoint && this.apiEndpoint !== "/api/preferences",
    };
  }

  // Exporter les données pour backup
  async exportPreferences(): Promise<string> {
    const result = await this.loadPreferences();
    if (result.success && result.data) {
      return JSON.stringify(result.data, null, 2);
    }
    throw new Error("Impossible d'exporter les préférences");
  }

  // Importer des données depuis un backup
  async importPreferences(jsonData: string): Promise<SyncResult> {
    try {
      const data: CloudPreferences = JSON.parse(jsonData);
      return await this.savePreferences(data);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Format de données invalide",
      };
    }
  }
}

// Instance globale du service de synchronisation
let cloudSyncService: CloudSyncService | null = null;

export function getCloudSyncService(apiEndpoint?: string): CloudSyncService {
  if (!cloudSyncService) {
    cloudSyncService = new CloudSyncService(apiEndpoint);
  }
  return cloudSyncService;
}

// Hook React pour utiliser le service de synchronisation cloud
export function useCloudSync() {
  const syncService = getCloudSyncService();

  const savePreferences = async (preferences: Partial<CloudPreferences>) => {
    return await syncService.savePreferences(preferences);
  };

  const loadPreferences = async (userId?: string) => {
    return await syncService.loadPreferences(userId);
  };

  const getStatus = () => {
    return syncService.getConnectionStatus();
  };

  const exportData = async () => {
    return await syncService.exportPreferences();
  };

  const importData = async (jsonData: string) => {
    return await syncService.importPreferences(jsonData);
  };

  return {
    savePreferences,
    loadPreferences,
    getStatus,
    exportData,
    importData,
    isEnabled: true,
  };
}
