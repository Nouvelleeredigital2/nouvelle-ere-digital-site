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
 * Récupère une page par son slug depuis le snapshot actif
 */
export async function getPageBySlug(slug: string): Promise<PageData | null> {
  const snapshot = await getActiveSnapshot();
  
  if (!snapshot) {
    return null;
  }

  const page = snapshot.pages.find(p => p.slug === slug);
  return page || null;
}

/**
 * Récupère toutes les pages du snapshot actif
 */
export async function getAllPages(): Promise<PageData[]> {
  const snapshot = await getActiveSnapshot();
  
  if (!snapshot) {
    return [];
  }

  return snapshot.pages;
}
