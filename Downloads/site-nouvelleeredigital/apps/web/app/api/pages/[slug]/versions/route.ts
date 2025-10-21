import { NextRequest, NextResponse } from 'next/server';
import { getMockVersions } from '@/lib/version-utils';

/**
 * GET /api/pages/[slug]/versions - Récupérer l'historique des versions (MOCK)
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Utiliser les données mock pour le moment
    const versions = getMockVersions().filter(v => v.pageSlug === slug);

    return NextResponse.json({
      success: true,
      versions: versions.map(v => ({
        ...v,
        createdAt: v.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error('Erreur récupération versions:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/pages/[slug]/versions - Créer une nouvelle version (MOCK)
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    const body = await request.json();
    const { title, layout, seo, message, createdBy } = body;

    // Simulation de création de version
    const newVersion = {
      id: Date.now().toString(),
      pageSlug: slug,
      title,
      layout: JSON.stringify(layout),
      seo: seo ? JSON.stringify(seo) : undefined,
      version: 999, // Version temporaire
      message,
      createdBy,
      createdAt: new Date(),
    };

    return NextResponse.json({
      success: true,
      version: {
        ...newVersion,
        createdAt: newVersion.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error('Erreur création version:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/pages/[slug]/versions/[version]/restore - Restaurer une version (MOCK)
 */
export async function PUT(
  _request: NextRequest,
  { params }: { params: { slug: string; version: string } }
) {
  try {
    const { slug, version } = params;
    const versionNumber = parseInt(version);

    if (isNaN(versionNumber)) {
      return NextResponse.json(
        { error: 'Numéro de version invalide' },
        { status: 400 }
      );
    }

    // Simulation de restauration
    console.log(`Restauration de la version ${versionNumber} pour ${slug}`);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur restauration version:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/pages/[slug]/versions/cleanup - Nettoyer les anciennes versions (MOCK)
 */
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Simulation de nettoyage
    console.log(`Nettoyage des versions pour ${slug}`);

    return NextResponse.json({
      success: true,
      deletedCount: 5,
    });
  } catch (error) {
    console.error('Erreur nettoyage versions:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
