import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { MediaQuerySchema, UpdateMediaSchema, validateMediaQuery, validateUpdateMedia, type MediaQuery, type UpdateMediaData } from '@/lib/types/media';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = Object.fromEntries(searchParams.entries());
    
    let validatedQuery: MediaQuery;
    try {
      validatedQuery = validateMediaQuery(query);
    } catch (error) {
      return NextResponse.json(
        { error: 'Paramètres invalides', details: error },
        { status: 400 }
      );
    }

    const { page, limit, type, search } = validatedQuery;
    const skip = (page - 1) * limit;

    // Construire les filtres
    const where: any = {};
    
    if (type && type !== 'all') {
      if (type === 'image') {
        where.mimeType = { startsWith: 'image/' };
      } else if (type === 'video') {
        where.mimeType = { startsWith: 'video/' };
      }
    }

    if (search) {
      where.OR = [
        { originalName: { contains: search, mode: 'insensitive' } },
        { alt: { contains: search, mode: 'insensitive' } },
        { caption: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Récupérer les médias avec pagination
    const [media, total] = await Promise.all([
      prisma.media.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          filename: true,
          originalName: true,
          mimeType: true,
          size: true,
          path: true,
          alt: true,
          caption: true,
          createdAt: true,
        },
      }),
      prisma.media.count({ where }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      media,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    console.error('Erreur GET /api/media:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    
    const MediaUpdateSchema = z.object({
      id: z.string(),
      alt: z.string().optional(),
      caption: z.string().optional(),
    });

    const validation = MediaUpdateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.error.errors },
        { status: 400 }
      );
    }

    const { id, alt, caption } = validation.data;

    // Vérifier que le média existe
    const existingMedia = await prisma.media.findUnique({
      where: { id },
    });

    if (!existingMedia) {
      return NextResponse.json({ error: 'Média non trouvé' }, { status: 404 });
    }

    // Mettre à jour le média
    const updatedMedia = await prisma.media.update({
      where: { id },
      data: {
        alt: alt !== undefined ? alt : existingMedia.alt,
        caption: caption !== undefined ? caption : existingMedia.caption,
      },
      select: {
        id: true,
        filename: true,
        originalName: true,
        mimeType: true,
        size: true,
        path: true,
        alt: true,
        caption: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      media: updatedMedia,
    });
  } catch (error) {
    console.error('Erreur PATCH /api/media:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}