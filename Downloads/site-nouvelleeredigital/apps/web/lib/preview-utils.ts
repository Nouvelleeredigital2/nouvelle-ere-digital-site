import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Génère un token unique et sécurisé pour la prévisualisation
 */
export function generatePreviewToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * Génère une URL de prévisualisation avec expiration
 */
export function generatePreviewUrl(slug: string, token: string, expiresAt: Date): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const previewUrl = new URL(`/preview/${slug}`, baseUrl);
  previewUrl.searchParams.set('token', token);
  previewUrl.searchParams.set('expires', expiresAt.getTime().toString());

  return previewUrl.toString();
}

/**
 * Vérifie si un token de prévisualisation est valide
 */
export async function verifyPreviewToken(slug: string, token: string): Promise<boolean> {
  try {
    // Chercher le brouillon de la page
    const draft = await prisma.pageDraft.findUnique({
      where: {
        slug,
      },
      select: {
        previewToken: true,
        previewExpiresAt: true,
      },
    });

    if (!draft || !draft.previewToken || !draft.previewExpiresAt) {
      return false;
    }

    // Vérifier le token
    if (draft.previewToken !== token) {
      return false;
    }

    // Vérifier l'expiration
    if (new Date() > draft.previewExpiresAt) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Erreur vérification token:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Crée ou met à jour un brouillon de prévisualisation
 */
export async function createPreviewDraft(pageId: string, slug: string): Promise<{
  token: string;
  url: string;
  expiresAt: Date;
} | null> {
  try {
    const token = generatePreviewToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    // Récupérer les données actuelles de la page
    const page = await prisma.page.findUnique({
      where: {
        slug_locale: {
          slug,
          locale: 'fr'
        }
      },
      select: {
        id: true,
        title: true,
        layout: true,
      },
    });

    if (!page) {
      return null;
    }

    // Créer ou mettre à jour le brouillon
    await prisma.pageDraft.upsert({
      where: { slug },
      update: {
        previewToken: token,
        previewExpiresAt: expiresAt,
        title: page.title,
        layout: page.layout,
        updatedAt: new Date(),
      },
      create: {
        slug,
        previewToken: token,
        previewExpiresAt: expiresAt,
        title: page.title,
        layout: page.layout,
      },
    });

    const url = generatePreviewUrl(slug, token, expiresAt);

    return {
      token,
      url,
      expiresAt,
    };
  } catch (error) {
    console.error('Erreur création brouillon:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Récupère les données d'un brouillon de prévisualisation
 */
export async function getPreviewDraft(slug: string, token: string): Promise<any | null> {
  try {
    // Vérifier d'abord le token
    const isValid = await verifyPreviewToken(slug, token);
    if (!isValid) {
      return null;
    }

    // Récupérer les données du brouillon
    const draft = await prisma.pageDraft.findUnique({
      where: { slug },
      select: {
        title: true,
        layout: true,
        seo: true,
      },
    });

    return draft;
  } catch (error) {
    console.error('Erreur récupération brouillon:', error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Supprime un brouillon de prévisualisation (après expiration)
 */
export async function cleanupExpiredDrafts(): Promise<number> {
  try {
    const result = await prisma.pageDraft.deleteMany({
      where: {
        previewExpiresAt: {
          lt: new Date(),
        },
      },
    });

    return result.count;
  } catch (error) {
    console.error('Erreur nettoyage brouillons:', error);
    return 0;
  } finally {
    await prisma.$disconnect();
  }
}

/**
 * Génère une URL de partage de prévisualisation
 */
export function generateShareablePreviewUrl(slug: string, token: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  return `${baseUrl}/preview/${slug}?token=${token}`;
}
