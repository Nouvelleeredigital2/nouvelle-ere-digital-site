import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;

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
  } catch (error) {
    console.error('Erreur GET /api/pages/[slug]:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
