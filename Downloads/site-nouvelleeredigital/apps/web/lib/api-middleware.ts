import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { ValidationError, UnauthorizedError, ForbiddenError, createErrorResponse } from './errors';

// Schéma de validation pour les paramètres de route
export const RouteParamsSchema = z.object({
  id: z.string().min(1, 'ID requis'),
  slug: z.string().min(1, 'Slug requis'),
});

// Schéma de validation pour les query parameters
export const QueryParamsSchema = z.object({
  page: z.string().transform(Number).optional(),
  limit: z.string().transform(Number).optional(),
  search: z.string().optional(),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
});

// Fonction pour valider les paramètres de route
export function validateRouteParams<T extends z.ZodTypeAny>(
  params: Record<string, string>,
  schema: T
): z.infer<T> {
  try {
    return schema.parse(params);
  } catch (error) {
    throw new ValidationError('Paramètres de route invalides', (error as z.ZodError).issues);
  }
}

// Fonction pour valider les query parameters
export function validateQueryParams<T extends z.ZodTypeAny>(
  searchParams: URLSearchParams,
  schema: T
): z.infer<T> {
  try {
    const query = Object.fromEntries(searchParams.entries());
    return schema.parse(query);
  } catch (error) {
    throw new ValidationError('Paramètres de requête invalides', (error as z.ZodError).issues);
  }
}

// Fonction pour valider le body de la requête
export function validateBody<T extends z.ZodTypeAny>(
  body: unknown,
  schema: T
): z.infer<T> {
  try {
    return schema.parse(body);
  } catch (error) {
    throw new ValidationError('Données de la requête invalides', (error as z.ZodError).issues);
  }
}

// Interface pour les options d'authentification
interface AuthOptions {
  required?: boolean;
  roles?: string[];
}

// Fonction pour vérifier l'authentification
export async function authenticateRequest(
  request: NextRequest,
  options: AuthOptions = { required: true }
) {
  if (!options.required) {
    return null;
  }

  // Vérifier le token d'authentification
  const authToken = request.cookies.get('admin-auth')?.value;
  
  if (!authToken) {
    throw new UnauthorizedError('Token d\'authentification requis');
  }

  // TODO: Vérifier la validité du token JWT et récupérer les informations utilisateur
  // Pour l'instant, on accepte tous les tokens valides
  try {
    // Ici, vous devriez vérifier le JWT et récupérer les infos utilisateur
    // const user = await verifyJWT(authToken);
    // if (options.roles && !options.roles.includes(user.role)) {
    //   throw new ForbiddenError('Permissions insuffisantes');
    // }
    // return user;
    
    return { id: 'admin', role: 'ADMIN' }; // Placeholder
  } catch (error) {
    throw new UnauthorizedError('Token d\'authentification invalide');
  }
}

// Wrapper pour les handlers API avec gestion d'erreurs
export function withErrorHandling<T extends any[]>(
  handler: (...args: T) => Promise<NextResponse>
) {
  return async (...args: T): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      const errorResponse = createErrorResponse(error);
      
      // Log l'erreur côté serveur (à améliorer avec un vrai système de logs)
      console.error('Erreur API:', error);
      
      return NextResponse.json(errorResponse.body, { 
        status: errorResponse.statusCode 
      });
    }
  };
}

// Wrapper pour les handlers API avec validation automatique
export function withValidation<TBody extends z.ZodTypeAny>(
  bodySchema?: TBody,
  querySchema?: z.ZodTypeAny,
  authOptions?: AuthOptions
) {
  return function <T extends any[]>(
    handler: (
      request: NextRequest,
      context: {
        params?: Record<string, string>;
        body?: TBody extends z.ZodTypeAny ? z.infer<TBody> : unknown;
        query?: Record<string, any>;
        user?: any;
      },
      ...rest: T
    ) => Promise<NextResponse>
  ) {
    return withErrorHandling(async (request: NextRequest, context: any, ...rest: T) => {
      // Authentification
      const user = await authenticateRequest(request, authOptions);
      
      // Validation du body
      let body: any = undefined;
      if (bodySchema) {
        const requestBody = await request.json();
        body = validateBody(requestBody, bodySchema);
      }
      
      // Validation des query parameters
      let query: any = undefined;
      if (querySchema) {
        const searchParams = new URL(request.url).searchParams;
        query = validateQueryParams(searchParams, querySchema);
      }
      
      return handler(request, { 
        params: context.params, 
        body, 
        query, 
        user 
      }, ...rest);
    });
  };
}

// Schéma de pagination standard
export const PaginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  search: z.string().optional(),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).default('desc'),
});

export type PaginationParams = z.infer<typeof PaginationSchema>;

// Fonction utilitaire pour créer une réponse de pagination
export function createPaginatedResponse<T>(
  data: T[],
  total: number,
  pagination: PaginationParams
) {
  const totalPages = Math.ceil(total / pagination.limit);
  
  return {
    data,
    pagination: {
      page: pagination.page,
      limit: pagination.limit,
      total,
      totalPages,
      hasNext: pagination.page < totalPages,
      hasPrev: pagination.page > 1,
    },
  };
}
