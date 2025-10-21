import { NextRequest, NextResponse } from 'next/server';
import { createPreviewDraft } from '@/lib/preview-utils';

/**
 * POST /api/preview/[slug] - Créer un brouillon de prévisualisation
 */
export async function POST(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Récupérer l'ID de la page depuis la base de données
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();

    const page = await prisma.page.findUnique({
      where: {
        slug: slug
      },
      select: { id: true },
    });

    if (!page) {
      return NextResponse.json(
        { error: 'Page non trouvée' },
        { status: 404 }
      );
    }

    // Créer le brouillon de prévisualisation
    const previewData = await createPreviewDraft(page.id, slug);

    if (!previewData) {
      return NextResponse.json(
        { error: 'Erreur lors de la création du brouillon' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      previewUrl: previewData.url,
      expiresAt: previewData.expiresAt,
      token: previewData.token,
    });
  } catch (error) {
    console.error('Erreur création prévisualisation:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/preview/[slug] - Supprimer un brouillon de prévisualisation
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Pour l'instant, on retourne juste un succès
    // TODO: Implémenter la suppression des brouillons de prévisualisation
    console.log(`Suppression du brouillon de prévisualisation pour: ${slug}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur suppression prévisualisation:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
