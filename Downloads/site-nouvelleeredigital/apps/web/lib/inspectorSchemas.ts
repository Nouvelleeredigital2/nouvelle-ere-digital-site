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

// RichText Block Schema
export const richTextBlockSchema = z.object({
  content: z.string().min(1, 'Le contenu est requis'),
  alignment: z.enum(['left', 'center', 'right', 'justify']).default('left'),
  maxWidth: z.enum(['sm', 'md', 'lg', 'xl', 'full']).default('lg'),
  paddingY: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('md'),
});

export type RichTextBlockFormData = z.infer<typeof richTextBlockSchema>;

// Gallery Block Schema
export const galleryBlockSchema = z.object({
  images: z.array(z.object({
    id: z.string(),
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
  })).min(1, 'Au moins une image est requise'),
  layout: z.enum(['grid', 'masonry', 'carousel']).default('grid'),
  columns: z.number().min(2).max(4).default(3),
  gap: z.enum(['sm', 'md', 'lg']).default('md'),
  aspectRatio: z.enum(['16/9', '4/3', '1/1', 'auto']).default('auto'),
});

export type GalleryBlockFormData = z.infer<typeof galleryBlockSchema>;

// Columns Block Schema
export const columnsBlockSchema = z.object({
  columns: z.array(z.object({
    id: z.string(),
    blocks: z.array(z.any()),
    width: z.number().min(1).max(12),
  })).min(2).max(4),
  gap: z.enum(['none', 'sm', 'md', 'lg', 'xl']).default('md'),
  alignment: z.enum(['start', 'center', 'end', 'stretch']).default('stretch'),
  responsive: z.object({
    mobile: z.enum(['stack', 'columns']).default('stack'),
    tablet: z.enum(['stack', 'columns']).default('columns'),
    desktop: z.enum(['stack', 'columns']).default('columns'),
  }).optional(),
});

export type ColumnsBlockFormData = z.infer<typeof columnsBlockSchema>;

// Icon Block Schema
export const iconBlockSchema = z.object({
  icon: z.string().min(1, 'Le nom de l\'icône est requis'),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl', '2xl']).default('md'),
  color: z.string().optional(),
  backgroundColor: z.string().optional(),
  shape: z.enum(['none', 'circle', 'square', 'rounded']).default('none'),
  animation: z.enum(['none', 'spin', 'pulse', 'bounce']).optional(),
  link: z.string().url().optional(),
  tooltip: z.string().optional(),
});

export type IconBlockFormData = z.infer<typeof iconBlockSchema>;

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
    case 'richtext':
      return richTextBlockSchema;
    case 'gallery':
      return galleryBlockSchema;
    case 'columns':
      return columnsBlockSchema;
    case 'icon':
      return iconBlockSchema;
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
    alignment: 'center' as const,
  },
  text: {
    content: '<p>Votre texte ici...</p>',
    alignment: 'left' as const,
    maxWidth: 'lg' as const,
    paddingY: 'md' as const,
    paddingX: 'md' as const,
  },
  image: {
    src: '',
    alt: '',
    caption: '',
    layout: 'contained' as const,
    aspectRatio: 'auto' as const,
  },
  cta: {
    title: 'Prêt à commencer ?',
    description: '',
    primaryButtonText: 'Commencer',
    primaryButtonLink: '#',
    alignment: 'center' as const,
  },
  richtext: {
    content: JSON.stringify({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Commencez à écrire votre contenu ici...',
            },
          ],
        },
      ],
    }),
    alignment: 'left' as const,
    maxWidth: 'lg' as const,
    paddingY: 'md' as const,
  },
  gallery: {
    images: [
      {
        id: 'img-1',
        src: 'https://via.placeholder.com/600x400?text=Image+1',
        alt: 'Image 1',
        caption: 'Première image de la galerie',
      },
      {
        id: 'img-2',
        src: 'https://via.placeholder.com/600x400?text=Image+2',
        alt: 'Image 2',
        caption: 'Deuxième image',
      },
      {
        id: 'img-3',
        src: 'https://via.placeholder.com/600x400?text=Image+3',
        alt: 'Image 3',
        caption: 'Troisième image',
      },
    ],
    layout: 'grid' as const,
    columns: 3,
    gap: 'md' as const,
    aspectRatio: 'auto' as const,
  },
  columns: {
    columns: [
      {
        id: `column-${Date.now()}-1`,
        blocks: [],
        width: 6,
      },
      {
        id: `column-${Date.now()}-2`,
        blocks: [],
        width: 6,
      },
    ],
    gap: 'md' as const,
    alignment: 'stretch' as const,
    responsive: {
      mobile: 'stack' as const,
      tablet: 'columns' as const,
      desktop: 'columns' as const,
    },
  },
  icon: {
    icon: 'star',
    size: 'md' as const,
    color: '#3b82f6',
    backgroundColor: '',
    shape: 'none' as const,
    animation: 'none' as const,
    link: '',
    tooltip: '',
  },
};
