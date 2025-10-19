import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const PostCreateSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.string().min(1),
  status: z.enum(['DRAFT', 'REVIEW', 'SCHEDULED', 'PUBLISHED', 'ARCHIVED']).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  featuredImage: z.string().optional(),
  publishedAt: z.string().optional(),
});

const PostUpdateSchema = PostCreateSchema.partial();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    // Construire les filtres
    const where: any = {};
    
    if (status) {
      where.status = status;
    }
    
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { content: { contains: search } },
      ];
    }

    // Récupérer les posts avec pagination
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * limit,
        take: limit,
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
      }),
      prisma.post.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Erreur GET /api/posts:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validation = PostCreateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: validation.error.errors },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Vérifier que le slug est unique
    const existingPost = await prisma.post.findUnique({
      where: { slug: data.slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: 'Un post avec ce slug existe déjà' },
        { status: 409 }
      );
    }

    // Créer le post
    const post = await prisma.post.create({
      data: {
        ...data,
        authorId: 'admin-user-id', // TODO: Récupérer l'ID de l'utilisateur connecté
        publishedAt: data.publishedAt ? new Date(data.publishedAt) : null,
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
      post,
    });
  } catch (error) {
    console.error('Erreur POST /api/posts:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création du post' },
      { status: 500 }
    );
  }
}
