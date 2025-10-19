import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { CreateServiceSchema, type CreateServiceData } from '@/lib/types/services';
import { withValidation, createPaginatedResponse, PaginationSchema } from '@/lib/api-middleware';
import { ConflictError } from '@/lib/errors';
import { optimizedServiceQueries } from '@/lib/prisma-optimized-simple';
import { createOptimizedResponse, createSuccessResponse } from '@/lib/api-optimization-simple';
import { performanceMonitor } from '@/lib/performance-monitor-simple';

export const GET = withValidation(
  undefined, // Pas de body pour GET
  PaginationSchema, // Query parameters avec pagination
  { required: false } // Pas d'auth requise pour la lecture
)(async (request, { query }) => {
  return performanceMonitor.measureFunction('api_services_get', async () => {
    // Utiliser les requêtes optimisées
    const [services, total] = await Promise.all([
      optimizedServiceQueries.findManyActive({
        limit: query.limit,
        offset: (query.page - 1) * query.limit,
        orderBy: 'order',
        order: 'asc',
      }),
      optimizedServiceQueries.countActive(),
    ]);

    const response = createPaginatedResponse(services, total, {
      page: query.page,
      limit: query.limit,
      totalPages: Math.ceil(total / query.limit),
    });

    // Créer une réponse optimisée avec cache
    return createOptimizedResponse(response, 200, {
      cache: {
        maxAge: 3600, // 1 heure
        staleWhileRevalidate: 7200, // 2 heures
      },
      etag: true,
    });
  }, { operation: 'get_services' });
});

export const POST = withValidation(
  CreateServiceSchema, // Validation du body
  undefined, // Pas de query params
  { required: true, roles: ['ADMIN', 'EDITOR'] } // Auth requise avec rôles
)(async (request, { body }) => {
  return performanceMonitor.measureFunction('api_services_post', async () => {
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
      throw new ConflictError('Un service avec ce titre existe déjà');
    }

    const service = await prisma.service.create({
      data: {
        title,
        description,
        icon,
        image,
        features: features || [],
        status,
        order,
        slug,
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

    // Invalider le cache des services
    await cache.invalidateByTags(['services', 'preloaded_data']);

    return createSuccessResponse(service, 'Service créé avec succès', {
      cache: {
        maxAge: 0, // Pas de cache pour les créations
      },
    });
  }, { operation: 'create_service' });
});