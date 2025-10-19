// Classes d'erreurs personnalisées pour une gestion d'erreurs robuste

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number, code: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR');
    this.name = 'ValidationError';
    if (details) {
      (this as any).details = details;
    }
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    const message = id ? `${resource} avec l'ID "${id}" non trouvé` : `${resource} non trouvé`;
    super(message, 404, 'NOT_FOUND');
    this.name = 'NotFoundError';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Non autorisé') {
    super(message, 401, 'UNAUTHORIZED');
    this.name = 'UnauthorizedError';
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Accès interdit') {
    super(message, 403, 'FORBIDDEN');
    this.name = 'ForbiddenError';
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT');
    this.name = 'ConflictError';
  }
}

export class InternalServerError extends AppError {
  constructor(message = 'Erreur interne du serveur') {
    super(message, 500, 'INTERNAL_SERVER_ERROR');
    this.name = 'InternalServerError';
  }
}

// Fonction utilitaire pour gérer les erreurs API
export function handleApiError(error: unknown): { statusCode: number; message: string; code: string; details?: any } {
  if (error instanceof AppError) {
    return {
      statusCode: error.statusCode,
      message: error.message,
      code: error.code,
      details: (error as any).details,
    };
  }

  // Erreur Zod
  if (error && typeof error === 'object' && 'issues' in error) {
    return {
      statusCode: 400,
      message: 'Données invalides',
      code: 'VALIDATION_ERROR',
      details: (error as any).issues,
    };
  }

  // Erreur Prisma
  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as any;
    
    switch (prismaError.code) {
      case 'P2002':
        return {
          statusCode: 409,
          message: 'Un enregistrement avec cette valeur existe déjà',
          code: 'DUPLICATE_ENTRY',
        };
      case 'P2025':
        return {
          statusCode: 404,
          message: 'Enregistrement non trouvé',
          code: 'NOT_FOUND',
        };
      default:
        return {
          statusCode: 500,
          message: 'Erreur de base de données',
          code: 'DATABASE_ERROR',
        };
    }
  }

  // Erreur générique
  console.error('Erreur non gérée:', error);
  return {
    statusCode: 500,
    message: 'Une erreur inattendue s\'est produite',
    code: 'INTERNAL_SERVER_ERROR',
  };
}

// Fonction pour créer une réponse d'erreur NextResponse
export function createErrorResponse(error: unknown) {
  const errorData = handleApiError(error);
  return {
    statusCode: errorData.statusCode,
    body: {
      error: errorData.message,
      code: errorData.code,
      ...(errorData.details && { details: errorData.details }),
    },
  };
}
