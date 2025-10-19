import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const ServiceUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  icon: z.string().optional(),
  image: z.string().optional(),
  features: z.array(z.string()).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED']).optional(),
  order: z.number().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const service = await prisma.service.findUnique({
      where: { id },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        icon: true,
        image: true,
        features: true,
        status: true,
        order: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!service) {
      return NextResponse.json({ error: 'Service non trouvé' }, { status: 404 });
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error('Erreur GET /api/services/[id]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    
    const validation = ServiceUpdateSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.error.errors },
        { status: 400 }
      );
    }

    // Vérifier que le service existe
    const existingService = await prisma.service.findUnique({
      where: { id },
    });

    if (!existingService) {
      return NextResponse.json({ error: 'Service non trouvé' }, { status: 404 });
    }

    // Si le titre change, générer un nouveau slug
    let slug = existingService.slug;
    if (validation.data.title && validation.data.title !== existingService.title) {
      slug = validation.data.title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      // Vérifier que le nouveau slug est unique
      const slugExists = await prisma.service.findFirst({
        where: { 
          slug,
          id: { not: id }
        },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'Un service avec ce titre existe déjà' },
          { status: 409 }
        );
      }
    }

    // Mettre à jour le service
    const updatedService = await prisma.service.update({
      where: { id },
      data: {
        ...validation.data,
        slug,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        icon: true,
        image: true,
        features: true,
        status: true,
        order: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      service: updatedService,
    });
  } catch (error) {
    console.error('Erreur PATCH /api/services/[id]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // Vérifier que le service existe
    const existingService = await prisma.service.findUnique({
      where: { id },
    });

    if (!existingService) {
      return NextResponse.json({ error: 'Service non trouvé' }, { status: 404 });
    }

    // Supprimer le service
    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE /api/services/[id]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}