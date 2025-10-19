// Export de tous les types du projet
export * from './blocks';
export * from './services';
export * from './media';
export * from './auth';

// Types communs
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  details?: any;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginationResponse {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface SearchParams {
  query?: string;
  filters?: Record<string, any>;
}

export type Status = 'DRAFT' | 'REVIEW' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED';
export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'EDITOR' | 'CONTRIBUTOR' | 'VIEWER';

// Utilitaires de type
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>;
