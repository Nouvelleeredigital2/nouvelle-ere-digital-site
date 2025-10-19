import { NextResponse } from 'next/server';

export interface OptimizationOptions {
  compress?: boolean;
  cache?: {
    maxAge?: number;
    sMaxAge?: number;
    staleWhileRevalidate?: number;
    tags?: string[];
  };
  etag?: boolean;
  preload?: boolean;
  prefetch?: boolean;
}

// Fonction principale pour créer une réponse optimisée
export function createOptimizedResponse(
  data: any,
  status: number = 200,
  options: OptimizationOptions = {}
): NextResponse {
  const response = NextResponse.json(data, { status });

  // Headers de cache
  if (options.cache) {
    if (options.cache.maxAge) {
      response.headers.set('Cache-Control', `public, max-age=${options.cache.maxAge}`);
    }
    if (options.cache.tags) {
      response.headers.set('Cache-Tags', options.cache.tags.join(', '));
    }
  }

  // Compression
  if (options.compress) {
    response.headers.set('Content-Encoding', 'gzip');
  }

  return response;
}

// Fonction pour créer une réponse d'erreur
export function createErrorResponse(
  message: string,
  status: number = 400,
  options: OptimizationOptions = {}
): NextResponse {
  const errorData = {
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
  };

  return createOptimizedResponse(errorData, status, options);
}

// Fonction pour créer une réponse de succès
export function createSuccessResponse(
  data: any,
  message?: string,
  options: OptimizationOptions = {}
): NextResponse {
  const response = {
    success: true,
    data,
    ...(message && { message }),
    timestamp: new Date().toISOString(),
  };

  return createOptimizedResponse(response, 200, options);
}
