import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/session';

export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const formData = await request.formData();
    const files = formData.getAll('files') as File[];

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'Aucun fichier fourni' },
        { status: 400 }
      );
    }

    const uploadDir = join(process.cwd(), 'public', 'media');
    
    // Créer le dossier si nécessaire
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    const uploadedMedia = [];

    for (const file of files) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Générer un nom de fichier unique
      const timestamp = Date.now();
      const randomString = Math.random().toString(36).substring(7);
      const ext = file.name.split('.').pop();
      const filename = `${timestamp}-${randomString}.${ext}`;

      const filepath = join(uploadDir, filename);
      await writeFile(filepath, buffer);

      // Créer l'entrée dans la base de données
      const media = await prisma.media.create({
        data: {
          filename,
          originalName: file.name,
          mime: file.type,
          alt: file.name.replace(/\.[^/.]+$/, ''),
          meta: JSON.stringify({}),
        },
      });

      uploadedMedia.push(media);
    }

    return NextResponse.json({ 
      success: true,
      files: uploadedMedia 
    });
  } catch (error) {
    console.error('Erreur POST /api/upload:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
