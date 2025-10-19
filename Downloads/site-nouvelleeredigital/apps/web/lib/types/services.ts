import { z } from 'zod';

// Schémas de validation pour les services
export const ServiceSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().min(1, 'La description est requise'),
  icon: z.string().optional(),
  image: z.string().url().optional(),
  features: z.array(z.string()).default([]),
  status: z.enum(['ACTIVE', 'INACTIVE', 'ARCHIVED']).default('ACTIVE'),
  order: z.number().default(0),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const CreateServiceSchema = ServiceSchema.omit({
  id: true,
  slug: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateServiceSchema = CreateServiceSchema.partial();

// Types TypeScript
export type Service = z.infer<typeof ServiceSchema>;
export type CreateServiceData = z.infer<typeof CreateServiceSchema>;
export type UpdateServiceData = z.infer<typeof UpdateServiceSchema>;

// Utilitaires de validation
export function validateService(service: unknown): Service {
  return ServiceSchema.parse(service);
}

export function validateCreateService(data: unknown): CreateServiceData {
  return CreateServiceSchema.parse(data);
}

export function validateUpdateService(data: unknown): UpdateServiceData {
  return UpdateServiceSchema.parse(data);
}
