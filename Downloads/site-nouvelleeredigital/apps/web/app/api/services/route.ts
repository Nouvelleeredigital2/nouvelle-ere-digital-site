import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const services = await prisma.service.findMany({
      where: { status: 'ACTIVE' },
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error('Erreur GET /api/services:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, icon, image, features, status, order } = body;
    
    // Générer un slug à partir du titre
    const slug = title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Vérifier que le slug est unique
    const existingService = await prisma.service.findUnique({
      where: { slug },
    });

    if (existingService) {
      return NextResponse.json({ error: 'Un service avec ce titre existe déjà' }, { status: 409 });
    }

    const service = await prisma.service.create({
      data: {
        title,
        description,
        icon,
        image,
        features: features || [],
        status: status || 'ACTIVE',
        order: order || 0,
        slug,
      },
    });

    return NextResponse.json(service);
  } catch (error) {
    console.error('Erreur POST /api/services:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID du service requis' }, { status: 400 });
    }

    // Vérifier que le service existe
    const existingService = await prisma.service.findUnique({
      where: { id },
    });

    if (!existingService) {
      return NextResponse.json({ error: 'Service non trouvé' }, { status: 404 });
    }

    await prisma.service.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Service supprimé avec succès' });
  } catch (error) {
    console.error('Erreur DELETE /api/services:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}