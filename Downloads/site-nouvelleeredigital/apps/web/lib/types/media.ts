import { z } from 'zod';

// Schémas de validation pour les médias
export const MediaSchema = z.object({
  id: z.string(),
  filename: z.string(),
  originalName: z.string(),
  mimeType: z.string(),
  size: z.number().positive(),
  path: z.string(),
  alt: z.string().optional(),
  caption: z.string().optional(),
  uploadedBy: z.string().optional(),
  createdAt: z.date(),
});

export const CreateMediaSchema = MediaSchema.omit({
  id: true,
  createdAt: true,
});

export const UpdateMediaSchema = z.object({
  alt: z.string().optional(),
  caption: z.string().optional(),
});

export const MediaQuerySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  type: z.enum(['image', 'video', 'all']).optional(),
  search: z.string().optional(),
});

export const MediaUploadSchema = z.object({
  file: z.instanceof(File),
  alt: z.string().optional(),
  caption: z.string().optional(),
});

// Types TypeScript
export type Media = z.infer<typeof MediaSchema>;
export type CreateMediaData = z.infer<typeof CreateMediaSchema>;
export type UpdateMediaData = z.infer<typeof UpdateMediaSchema>;
export type MediaQuery = z.infer<typeof MediaQuerySchema>;
export type MediaUpload = z.infer<typeof MediaUploadSchema>;

// Interface pour les réponses API
export interface MediaListResponse {
  media: Media[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface MediaUploadResponse {
  success: boolean;
  media: Media;
}

// Utilitaires de validation
export function validateMedia(media: unknown): Media {
  return MediaSchema.parse(media);
}

export function validateCreateMedia(data: unknown): CreateMediaData {
  return CreateMediaSchema.parse(data);
}

export function validateUpdateMedia(data: unknown): UpdateMediaData {
  return UpdateMediaSchema.parse(data);
}

export function validateMediaQuery(query: unknown): MediaQuery {
  return MediaQuerySchema.parse(query);
}

export function validateMediaUpload(data: unknown): MediaUpload {
  return MediaUploadSchema.parse(data);
}
