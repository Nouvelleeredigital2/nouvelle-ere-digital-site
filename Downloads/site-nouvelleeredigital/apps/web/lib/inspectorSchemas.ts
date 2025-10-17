import { z } from 'zod';

// Hero Block Schema
export const heroBlockSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
  backgroundImage: z.string().optional(),
  alignment: z.enum(['left', 'center', 'right']).default('center'),
});

export type HeroBlockFormData = z.infer<typeof heroBlockSchema>;

// Text Block Schema
export const textBlockSchema = z.object({
  content: z.string().min(1, 'Le contenu est requis'),
  alignment: z.enum(['left', 'center', 'right', 'justify']).default('left'),
  maxWidth: z.enum(['sm', 'md', 'lg', 'xl', 'full']).default('lg'),
  paddingY: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('md'),
  paddingX: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('md'),
  backgroundColor: z.string().optional(),
  textColor: z.string().optional(),
});

export type TextBlockFormData = z.infer<typeof textBlockSchema>;

// Image Block Schema
export const imageBlockSchema = z.object({
  src: z.string().min(1, 'L\'URL de l\'image est requise'),
  alt: z.string().min(1, 'Le texte alternatif est requis'),
  caption: z.string().optional(),
  width: z.number().optional(),
  height: z.number().optional(),
  layout: z.enum(['full', 'contained']).default('contained'),
  aspectRatio: z.enum(['16/9', '4/3', '1/1', 'auto']).default('auto'),
});

export type ImageBlockFormData = z.infer<typeof imageBlockSchema>;

// CTA Block Schema
export const ctaBlockSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  description: z.string().optional(),
  primaryButtonText: z.string().optional(),
  primaryButtonLink: z.string().optional(),
  secondaryButtonText: z.string().optional(),
  secondaryButtonLink: z.string().optional(),
  backgroundColor: z.string().optional(),
  alignment: z.enum(['left', 'center', 'right']).default('center'),
});

export type CTABlockFormData = z.infer<typeof ctaBlockSchema>;

// Helper pour obtenir le schéma selon le type de bloc
export function getBlockSchema(blockType: string) {
  switch (blockType) {
    case 'hero':
      return heroBlockSchema;
    case 'text':
      return textBlockSchema;
    case 'image':
      return imageBlockSchema;
    case 'cta':
      return ctaBlockSchema;
    default:
      return z.object({});
  }
}

// Valeurs par défaut pour chaque type de bloc
export const defaultBlockData = {
  hero: {
    title: 'Nouveau Hero',
    subtitle: '',
    description: '',
    ctaText: 'En savoir plus',
    ctaLink: '#',
    alignment: 'center',
  },
  text: {
    content: '<p>Votre texte ici...</p>',
    alignment: 'left',
    maxWidth: 'lg',
    paddingY: 'md',
    paddingX: 'md',
  },
  image: {
    src: '',
    alt: '',
    caption: '',
    layout: 'contained',
    aspectRatio: 'auto',
  },
  cta: {
    title: 'Prêt à commencer ?',
    description: '',
    primaryButtonText: 'Commencer',
    primaryButtonLink: '#',
    alignment: 'center',
  },
};
