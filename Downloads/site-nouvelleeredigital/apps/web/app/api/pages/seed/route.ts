import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Créer quelques pages d'exemple
    const samplePages = [
      {
        slug: 'accueil',
        title: 'Page d\'accueil',
        status: 'PUBLISHED',
        content: {
          blocks: [
            {
              id: 'hero-1',
              type: 'hero',
              data: {
                title: 'Bienvenue sur notre site',
                subtitle: 'Découvrez nos services',
                backgroundImage: '/images/hero-bg.jpg'
              }
            }
          ]
        }
      },
      {
        slug: 'a-propos',
        title: 'À propos de nous',
        status: 'PUBLISHED',
        content: {
          blocks: [
            {
              id: 'text-1',
              type: 'text',
              data: {
                content: 'Nous sommes une entreprise innovante...'
              }
            }
          ]
        }
      },
      {
        slug: 'services',
        title: 'Nos services',
        status: 'DRAFT',
        content: {
          blocks: [
            {
              id: 'columns-1',
              type: 'columns',
              data: {
                columns: [
                  {
                    id: 'col-1',
                    blocks: [
                      {
                        id: 'text-col-1',
                        type: 'text',
                        data: { content: 'Service 1' }
                      }
                    ],
                    width: 4
                  },
                  {
                    id: 'col-2',
                    blocks: [
                      {
                        id: 'text-col-2',
                        type: 'text',
                        data: { content: 'Service 2' }
                      }
                    ],
                    width: 4
                  },
                  {
                    id: 'col-3',
                    blocks: [
                      {
                        id: 'text-col-3',
                        type: 'text',
                        data: { content: 'Service 3' }
                      }
                    ],
                    width: 4
                  }
                ]
              }
            }
          ]
        }
      },
      {
        slug: 'contact',
        title: 'Contact',
        status: 'DRAFT',
        content: {
          blocks: [
            {
              id: 'form-1',
              type: 'form',
              data: {
                title: 'Contactez-nous',
                fields: [
                  { name: 'name', label: 'Nom', type: 'text', required: true },
                  { name: 'email', label: 'Email', type: 'email', required: true },
                  { name: 'message', label: 'Message', type: 'textarea', required: true }
                ]
              }
            }
          ]
        }
      },
      {
        slug: 'blog',
        title: 'Blog',
        status: 'PUBLISHED',
        content: {
          blocks: [
            {
              id: 'richtext-1',
              type: 'richtext',
              data: {
                content: '<h1>Notre Blog</h1><p>Découvrez nos derniers articles...</p>'
              }
            }
          ]
        }
      }
    ];

    // Supprimer les pages existantes (optionnel)
    await prisma.page.deleteMany({
      where: {
        locale: 'fr'
      }
    });

    // Créer les nouvelles pages
    const createdPages = [];
    for (const pageData of samplePages) {
      const page = await prisma.page.create({
        data: {
          ...pageData,
          locale: 'fr',
          authorId: 'admin-user',
          metaTitle: pageData.title,
          metaDescription: `Page ${pageData.title} - Nouvelle Ère Digital`,
        },
      });
      createdPages.push(page);
    }

    return NextResponse.json({
      success: true,
      message: `${createdPages.length} pages créées avec succès`,
      pages: createdPages.map(page => ({
        id: page.id,
        slug: page.slug,
        title: page.title,
        status: page.status,
        createdAt: page.createdAt,
        updatedAt: page.updatedAt,
      }))
    });

  } catch (error) {
    console.error('Erreur lors de la création des pages d\'exemple:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la création des pages' },
      { status: 500 }
    );
  }
}
