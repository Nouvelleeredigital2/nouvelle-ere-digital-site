import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/session';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// PATCH - Mettre à jour les métadonnées d'un média
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { id } = params;
    const body = await request.json();
    const { alt, focalX, focalY, meta } = body;

    const updateData: any = {};
    if (alt !== undefined) updateData.alt = alt;
    if (focalX !== undefined) updateData.focalX = focalX;
    if (focalY !== undefined) updateData.focalY = focalY;
    if (meta !== undefined) updateData.meta = JSON.stringify(meta);

    const media = await prisma.media.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(media);
  } catch (error) {
    console.error('Erreur PATCH /api/media/[id]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE - Supprimer un média
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const { id } = params;

    // Récupérer le média pour obtenir le nom du fichier
    const media = await prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      return NextResponse.json({ error: 'Média non trouvé' }, { status: 404 });
    }

    // Supprimer le fichier physique
    const filepath = join(process.cwd(), 'public', 'media', media.filename);
    if (existsSync(filepath)) {
      await unlink(filepath);
    }

    // Supprimer l'entrée de la base de données
    await prisma.media.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE /api/media/[id]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// GET - Récupérer un média spécifique
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const media = await prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      return NextResponse.json({ error: 'Média non trouvé' }, { status: 404 });
    }

    return NextResponse.json(media);
  } catch (error) {
    console.error('Erreur GET /api/media/[id]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
