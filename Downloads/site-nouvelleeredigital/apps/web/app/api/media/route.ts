import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const media = await prisma.media.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(media);
  } catch (error) {
    console.error('Erreur GET /api/media:', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
