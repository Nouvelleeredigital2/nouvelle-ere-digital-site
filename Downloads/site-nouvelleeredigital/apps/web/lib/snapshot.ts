import { prisma } from './prisma';

export interface PageLayout {
  blocks: Array<{
    id: string;
    type: string;
    data: any;
  }>;
}

export interface PageData {
  id: string;
  slug: string;
  title: string;
  layout: PageLayout;
}

export interface SiteSnapshot {
  pages: PageData[];
  publishedAt: string;
}

/**
 * Récupère le snapshot actif du site publié
 */
export async function getActiveSnapshot(): Promise<SiteSnapshot | null> {
  try {
    const snapshot = await prisma.publishSnapshot.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });

    if (!snapshot) {
      return null;
    }

    return JSON.parse(snapshot.siteJson);
  } catch (error) {
    console.error('Erreur lors de la récupération du snapshot:', error);
    return null;
  }
}

/**
 * Récupère une page par son slug depuis le snapshot publié
 */
export async function getPageBySlug(slug: string): Promise<PageData | null> {
  try {
    // D'abord, essayer de récupérer depuis le snapshot publié
    const snapshot = await getActiveSnapshot();
    if (snapshot) {
      const pageFromSnapshot = snapshot.pages.find(p => p.slug === slug);
      if (pageFromSnapshot) {
        return pageFromSnapshot;
      }
    }

    // Fallback: récupérer depuis la base de données si pas de snapshot
    const page = await prisma.page.findUnique({
      where: {
        slug,
        status: 'PUBLISHED', // Seulement les pages publiées
      },
    });

    if (!page) {
      return null;
    }

    return {
      id: page.id,
      slug: page.slug,
      title: page.title,
      layout: page.content as PageLayout,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération de la page:', error);
    return null;
  }
}

/**
 * Récupère toutes les pages publiées depuis le snapshot
 */
export async function getAllPages(): Promise<PageData[]> {
  try {
    // D'abord, essayer de récupérer depuis le snapshot publié
    const snapshot = await getActiveSnapshot();
    if (snapshot) {
      return snapshot.pages;
    }

    // Fallback: récupérer depuis la base de données si pas de snapshot
    const pages = await prisma.page.findMany({
      where: {
        status: 'PUBLISHED',
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    return pages.map(page => ({
      id: page.id,
      slug: page.slug,
      title: page.title,
      layout: page.content as PageLayout,
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des pages:', error);
    return [];
  }
}
