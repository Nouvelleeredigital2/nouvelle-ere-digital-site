import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/session';

export async function POST() {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    // Récupérer toutes les pages publiées
    const pages = await prisma.page.findMany({
      where: {
        status: 'PUBLISHED',
      },
    });

    // Pour l'instant, on retourne juste les pages publiées
    // TODO: Implémenter un système de snapshots avec la base de données
    return NextResponse.json({ 
      success: true,
      pages: pages.map(page => ({
        id: page.id,
        slug: page.slug,
        title: page.title,
        content: page.content,
      })),
      pagesCount: pages.length,
    });
  } catch (error) {
    console.error('Erreur POST /api/publish:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// GET - Récupérer les pages publiées
export async function GET() {
  try {
    const pages = await prisma.page.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({
      pages: pages.map(page => ({
        id: page.id,
        slug: page.slug,
        title: page.title,
        content: page.content,
        publishedAt: page.publishedAt,
      })),
      pagesCount: pages.length,
    });
  } catch (error) {
    console.error('Erreur GET /api/publish:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
