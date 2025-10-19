import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const PostUpdateSchema = z.object({
  title: z.string().min(1).optional(),
  slug: z.string().min(1).optional(),
  excerpt: z.string().optional(),
  content: z.string().min(1).optional(),
  status: z.enum(['DRAFT', 'REVIEW', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED']).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  featuredImage: z.string().optional(),
  publishedAt: z.string().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        tags: true,
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post non trouvé' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      post,
    });
  } catch (error) {
    console.error('Erreur GET /api/posts/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération du post' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const validation = PostUpdateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.error.errors },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Vérifier que le post existe
    const existingPost = await prisma.post.findUnique({
      where: { id: params.id },
    });

    if (!existingPost) {
      return NextResponse.json({ error: 'Post non trouvé' }, { status: 404 });
    }

    // Vérifier l'unicité du slug si modifié
    if (data.slug && data.slug !== existingPost.slug) {
      const slugExists = await prisma.post.findUnique({
        where: { slug: data.slug },
      });

      if (slugExists) {
        return NextResponse.json(
          { error: 'Un post avec ce slug existe déjà' },
          { status: 409 }
        );
      }
    }

    // Mettre à jour le post
    const updatedPost = await prisma.post.update({
      where: { id: params.id },
      data: {
        ...data,
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : undefined,
        updatedAt: new Date(),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        tags: true,
      },
    });

    return NextResponse.json({
      success: true,
      post: updatedPost,
    });
  } catch (error) {
    console.error('Erreur PATCH /api/posts/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour du post' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Vérifier que le post existe
    const existingPost = await prisma.post.findUnique({
      where: { id: params.id },
    });

    if (!existingPost) {
      return NextResponse.json({ error: 'Post non trouvé' }, { status: 404 });
    }

    // Supprimer le post
    await prisma.post.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur DELETE /api/posts/[id]:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la suppression du post' },
      { status: 500 }
    );
  }
}
