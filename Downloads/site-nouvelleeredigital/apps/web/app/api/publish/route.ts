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
        locale: 'fr',
      },
    });

    // Créer le snapshot
    const siteJson = {
      pages: pages.map(page => ({
        id: page.id,
        slug: page.slug,
        title: page.title,
        layout: JSON.parse(page.layout),
      })),
      publishedAt: new Date().toISOString(),
    };

    // Désactiver tous les anciens snapshots
    await prisma.publishSnapshot.updateMany({
      where: { isActive: true },
      data: { isActive: false },
    });

    // Créer le nouveau snapshot actif
    const snapshot = await prisma.publishSnapshot.create({
      data: {
        siteJson: JSON.stringify(siteJson),
        isActive: true,
      },
    });

    return NextResponse.json({ 
      success: true,
      snapshot: {
        id: snapshot.id,
        createdAt: snapshot.createdAt,
        pagesCount: pages.length,
      }
    });
  } catch (error) {
    console.error('Erreur POST /api/publish:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// GET - Récupérer le snapshot actif
export async function GET() {
  try {
    const snapshot = await prisma.publishSnapshot.findFirst({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' },
    });

    if (!snapshot) {
      return NextResponse.json({ error: 'Aucun snapshot publié' }, { status: 404 });
    }

    return NextResponse.json({
      ...snapshot,
      siteJson: JSON.parse(snapshot.siteJson),
    });
  } catch (error) {
    console.error('Erreur GET /api/publish:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
