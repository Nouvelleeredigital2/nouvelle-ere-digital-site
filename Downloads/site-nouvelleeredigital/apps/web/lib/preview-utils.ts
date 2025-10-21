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
    // Pour l'instant, on accepte tous les tokens de prévisualisation
    // TODO: Implémenter un système de tokens de prévisualisation avec la base de données
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

    // Pour l'instant, on génère juste un token et une URL
    // TODO: Implémenter un système de brouillons avec la base de données
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

    // Pour l'instant, on retourne null car on n'a pas de système de brouillons
    // TODO: Implémenter la récupération des données de brouillon
    return null;
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
    // Pour l'instant, on retourne 0 car on n'a pas de système de brouillons
    // TODO: Implémenter le nettoyage des brouillons expirés
    return 0;
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
