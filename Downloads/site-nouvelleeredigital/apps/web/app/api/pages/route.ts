import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthenticated } from '@/lib/session';

// GET - Liste toutes les pages ou recherche par slug
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const slug = searchParams.get('slug');

    if (slug) {
      const page = await prisma.page.findFirst({
        where: {
          slug,
          locale: 'fr',
        },
      });

      if (!page) {
        return NextResponse.json({ error: 'Page non trouvée' }, { status: 404 });
      }

      return NextResponse.json({
        ...page,
        layout: JSON.parse(page.layout),
      });
    }

    const pages = await prisma.page.findMany({
      where: { locale: 'fr' },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json(
      pages.map(page => ({
        ...page,
        layout: JSON.parse(page.layout),
      }))
    );
  } catch (error) {
    console.error('Erreur GET /api/pages:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// POST - Créer une nouvelle page
export async function POST(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const body = await request.json();
    const { slug, title, layout, status = 'DRAFT' } = body;

    if (!slug || !title) {
      return NextResponse.json(
        { error: 'slug et title sont requis' },
        { status: 400 }
      );
    }

    const layoutString = typeof layout === 'string' 
      ? layout 
      : JSON.stringify(layout || { blocks: [] });

    const page = await prisma.page.create({
      data: {
        slug,
        title,
        layout: layoutString,
        status,
        locale: 'fr',
      },
    });

    return NextResponse.json({
      ...page,
      layout: JSON.parse(page.layout),
    });
  } catch (error) {
    console.error('Erreur POST /api/pages:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// PUT - Mettre à jour une page existante
export async function PUT(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const body = await request.json();
    const { id, slug, title, layout, status } = body;

    if (!id && !slug) {
      return NextResponse.json(
        { error: 'id ou slug requis' },
        { status: 400 }
      );
    }

    const layoutString = typeof layout === 'string' 
      ? layout 
      : JSON.stringify(layout || { blocks: [] });

    let page;

    if (id) {
      page = await prisma.page.update({
        where: { id },
        data: {
          title,
          layout: layoutString,
          status,
        },
      });
    } else {
      // Si pas d'ID, chercher par slug ou créer
      const existing = await prisma.page.findFirst({
        where: { slug, locale: 'fr' },
      });

      if (existing) {
        page = await prisma.page.update({
          where: { id: existing.id },
          data: {
            title,
            layout: layoutString,
            status,
          },
        });
      } else {
        page = await prisma.page.create({
          data: {
            slug,
            title,
            layout: layoutString,
            status: status || 'DRAFT',
            locale: 'fr',
          },
        });
      }
    }

    return NextResponse.json({
      ...page,
      layout: JSON.parse(page.layout),
    });
  } catch (error) {
    console.error('Erreur PUT /api/pages:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

// DELETE - Supprimer une page
export async function DELETE(request: NextRequest) {
  try {
    if (!(await isAuthenticated())) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'id requis' }, { status: 400 });
    }

    await prisma.page.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE /api/pages:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
