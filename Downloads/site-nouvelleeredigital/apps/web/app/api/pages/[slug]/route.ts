import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

    const page = await prisma.page.findUnique({
      where: {
        slug,
      },
    });

    if (!page) {
      return NextResponse.json({ error: 'Page non trouvée' }, { status: 404 });
    }

    return NextResponse.json({
      ...page,
      content: page.content,
    });
  } catch (error) {
    console.error('Erreur GET /api/pages/[slug]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const body = await request.json();

    // Validation des données
    const PageUpdateSchema = z.object({
      content: z.any().optional(),
      title: z.string().optional(),
      status: z.enum(['DRAFT', 'REVIEW', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED']).optional(),
      metaTitle: z.string().optional(),
      metaDescription: z.string().optional(),
    });

    const validation = PageUpdateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.error.errors },
        { status: 400 }
      );
    }

    // Vérifier que la page existe
    const existingPage = await prisma.page.findUnique({
      where: { slug },
    });

    if (!existingPage) {
      return NextResponse.json({ error: 'Page non trouvée' }, { status: 404 });
    }

    // Mettre à jour la page
    const updatedPage = await prisma.page.update({
      where: { slug },
      data: {
        content: validation.data.content,
        title: validation.data.title || '',
        status: validation.data.status || 'DRAFT',
        metaTitle: validation.data.metaTitle || '',
        metaDescription: validation.data.metaDescription || '',
        updatedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      page: updatedPage,
    });
  } catch (error) {
    console.error('Erreur PATCH /api/pages/[slug]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
