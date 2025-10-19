// Utilitaires temporaires pour les tests de l'interface
// Sera remplacé par l'implémentation Prisma complète une fois le schéma régénéré

export interface VersionData {
  id: string;
  pageSlug: string;
  title: string;
  layout: string;
  seo?: string;
  version: number;
  message?: string;
  createdBy?: string;
  createdAt: Date;
}

/**
 * Formate une date pour l'affichage
 */
export function formatVersionDate(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  // Moins d'une minute
  if (diff < 60000) {
    return 'À l\'instant';
  }

  // Moins d'une heure
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) {
    return `Il y a ${minutes}min`;
  }

  // Moins de 24h
  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `Il y a ${hours}h`;
  }

  // Plus de 24h
  const days = Math.floor(hours / 24);
  if (days < 7) {
    return `Il y a ${days}j`;
  }

  // Plus d'une semaine
  return date.toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Compare deux versions et retourne les différences
 */
export function compareVersions(version1: VersionData, version2: VersionData): {
  title: { from: string; to: string; changed: boolean };
  layout: { from: any; to: any; changed: boolean };
  seo?: { from: any; to: any; changed: boolean };
} {
  return {
    title: {
      from: version1.title,
      to: version2.title,
      changed: version1.title !== version2.title,
    },
    layout: {
      from: JSON.parse(version1.layout),
      to: JSON.parse(version2.layout),
      changed: version1.layout !== version2.layout,
    },
    ...(version1.seo && version2.seo && {
      seo: {
        from: JSON.parse(version1.seo),
        to: JSON.parse(version2.seo),
        changed: version1.seo !== version2.seo,
      },
    }),
  };
}

// Données de test temporaires pour l'interface
export function getMockVersions(): VersionData[] {
  const now = new Date();

  return [
    {
      id: '1',
      pageSlug: 'test-page',
      title: 'Test Page - Version Finale',
      layout: JSON.stringify({
        blocks: [
          { id: '1', type: 'hero', data: { title: 'Titre Final' } },
          { id: '2', type: 'text', data: { content: 'Contenu final' } }
        ]
      }),
      version: 3,
      message: 'Version finale avec corrections',
      createdAt: new Date(now.getTime() - 1000 * 60 * 30), // 30 min ago
    },
    {
      id: '2',
      pageSlug: 'test-page',
      title: 'Test Page - Version 2',
      layout: JSON.stringify({
        blocks: [
          { id: '1', type: 'hero', data: { title: 'Titre Version 2' } },
          { id: '2', type: 'text', data: { content: 'Contenu version 2' } }
        ]
      }),
      version: 2,
      message: 'Ajout de contenu',
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 2), // 2h ago
    },
    {
      id: '3',
      pageSlug: 'test-page',
      title: 'Test Page - Version Initiale',
      layout: JSON.stringify({
        blocks: [
          { id: '1', type: 'hero', data: { title: 'Titre Initial' } }
        ]
      }),
      version: 1,
      message: 'Création initiale',
      createdAt: new Date(now.getTime() - 1000 * 60 * 60 * 24), // 1 jour ago
    },
  ];
}
