import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

const UploadSchema = z.object({
  alt: z.string().optional(),
  caption: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const alt = formData.get('alt') as string;
    const caption = formData.get('caption') as string;

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    // Validation du type de fichier
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Type de fichier non supporté' }, { status: 400 });
    }

    // Validation de la taille (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'Fichier trop volumineux (max 10MB)' }, { status: 400 });
    }

    // Créer le dossier uploads s'il n'existe pas
    const uploadsDir = join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    // Générer un nom de fichier unique
    const timestamp = Date.now();
    const fileExtension = file.name.split('.').pop();
    const filename = `${timestamp}-${Math.random().toString(36).substring(7)}.${fileExtension}`;
    const filepath = join(uploadsDir, filename);

    // Sauvegarder le fichier
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filepath, buffer);

    // Sauvegarder en base de données
    const media = await prisma.media.create({
      data: {
        filename,
        originalName: file.name,
        mimeType: file.type,
        size: file.size,
        path: `/uploads/${filename}`,
        alt: alt || file.name,
        caption: caption || '',
        uploadedBy: null, // TODO: Récupérer l'utilisateur connecté
      },
    });

    return NextResponse.json({
      success: true,
      media: {
        id: media.id,
        filename: media.filename,
        originalName: media.originalName,
        mimeType: media.mimeType,
        size: media.size,
        path: media.path,
        alt: media.alt,
        caption: media.caption,
        createdAt: media.createdAt.toISOString(),
      },
    });
  } catch (error) {
    console.error('Erreur upload:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'upload' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
    }

    // Récupérer le média
    const media = await prisma.media.findUnique({
      where: { id },
    });

    if (!media) {
      return NextResponse.json({ error: 'Média non trouvé' }, { status: 404 });
    }

    // Supprimer le fichier physique
    try {
      const filepath = join(process.cwd(), 'public', media.path);
      if (existsSync(filepath)) {
        await unlink(filepath);
      }
    } catch (fileError) {
      console.warn('Impossible de supprimer le fichier physique:', fileError);
    }

    // Supprimer de la base de données
    await prisma.media.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur suppression:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
  }
}