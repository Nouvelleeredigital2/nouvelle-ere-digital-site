import { z } from 'zod';

// Schémas de validation pour l'authentification
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  role: z.enum(['SUPER_ADMIN', 'ADMIN', 'EDITOR', 'CONTRIBUTOR', 'VIEWER']),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const LoginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Le mot de passe est requis'),
});

export const RegisterSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(8, 'Le mot de passe doit contenir au moins 8 caractères'),
  name: z.string().min(1, 'Le nom est requis'),
  role: z.enum(['ADMIN', 'EDITOR', 'CONTRIBUTOR', 'VIEWER']).default('EDITOR'),
});

export const ChangePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Le mot de passe actuel est requis'),
  newPassword: z.string().min(8, 'Le nouveau mot de passe doit contenir au moins 8 caractères'),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: 'Les mots de passe ne correspondent pas',
  path: ['confirmPassword'],
});

export const UpdateProfileSchema = z.object({
  name: z.string().min(1, 'Le nom est requis').optional(),
  email: z.string().email('Email invalide').optional(),
});

// Types TypeScript
export type User = z.infer<typeof UserSchema>;
export type LoginData = z.infer<typeof LoginSchema>;
export type RegisterData = z.infer<typeof RegisterSchema>;
export type ChangePasswordData = z.infer<typeof ChangePasswordSchema>;
export type UpdateProfileData = z.infer<typeof UpdateProfileSchema>;

// Interfaces pour les réponses API
export interface LoginResponse {
  success: boolean;
  user: User;
  token?: string;
}

export interface AuthError {
  error: string;
  details?: z.ZodError;
}

// Types pour les sessions
export interface SessionUser {
  id: string;
  email: string;
  name?: string;
  role: string;
}

export interface Session {
  user: SessionUser;
  expires: string;
}

// Utilitaires de validation
export function validateUser(user: unknown): User {
  return UserSchema.parse(user);
}

export function validateLogin(data: unknown): LoginData {
  return LoginSchema.parse(data);
}

export function validateRegister(data: unknown): RegisterData {
  return RegisterSchema.parse(data);
}

export function validateChangePassword(data: unknown): ChangePasswordData {
  return ChangePasswordSchema.parse(data);
}

export function validateUpdateProfile(data: unknown): UpdateProfileData {
  return UpdateProfileSchema.parse(data);
}
