// Types pour les blocs de l'éditeur visuel
import { z } from 'zod';

// Schémas de validation Zod
export const BaseBlockSchema = z.object({
  id: z.string().min(1),
  type: z.string().min(1),
  data: z.record(z.any()),
});

export const HeroBlockDataSchema = z.object({
  title: z.string().optional(),
  subtitle: z.string().optional(),
  description: z.string().optional(),
  ctaText: z.string().optional(),
  ctaUrl: z.string().url().optional(),
  backgroundImage: z.string().url().optional(),
  alignment: z.enum(['left', 'center', 'right']).optional(),
});

export const TextBlockDataSchema = z.object({
  content: z.string().optional(),
  textAlign: z.enum(['left', 'center', 'right']).optional(),
  alignment: z.enum(['left', 'center', 'right']).optional(),
  maxWidth: z.enum(['sm', 'md', 'lg', 'xl', 'full']).optional(),
  paddingY: z.enum(['sm', 'md', 'lg']).optional(),
});

export const ImageBlockDataSchema = z.object({
  src: z.string().url().optional(),
  alt: z.string().optional(),
  caption: z.string().optional(),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
  layout: z.enum(['full', 'contained']).optional(),
  aspectRatio: z.enum(['16/9', '4/3', '1/1', 'auto']).optional(),
});

export const CTABlockDataSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  buttonText: z.string().optional(),
  buttonUrl: z.string().url().optional(),
  primaryButtonText: z.string().optional(),
  primaryButtonLink: z.string().url().optional(),
  secondaryButtonText: z.string().optional(),
  secondaryButtonLink: z.string().url().optional(),
  backgroundColor: z.string().optional(),
  textColor: z.string().optional(),
});

export const RichTextBlockDataSchema = z.object({
  content: z.string().optional(),
  alignment: z.enum(['left', 'center', 'right', 'justify']).optional(),
  maxWidth: z.enum(['sm', 'md', 'lg', 'xl', 'full']).optional(),
  paddingY: z.enum(['none', 'sm', 'md', 'lg', 'xl']).optional(),
});

export const GalleryImageSchema = z.object({
  id: z.string(),
  src: z.string().url(),
  alt: z.string(),
  caption: z.string().optional(),
  width: z.number().positive().optional(),
  height: z.number().positive().optional(),
});

export const GalleryBlockDataSchema = z.object({
  images: z.array(GalleryImageSchema).optional(),
  layout: z.enum(['grid', 'masonry', 'carousel']).optional(),
  columns: z.enum(['2', '3', '4']).optional(),
  gap: z.enum(['sm', 'md', 'lg']).optional(),
  aspectRatio: z.enum(['16/9', '4/3', '1/1', 'auto']).optional(),
});

export const VideoBlockDataSchema = z.object({
  src: z.string().url(),
  poster: z.string().url().optional(),
  autoplay: z.boolean().optional(),
  controls: z.boolean().optional(),
  loop: z.boolean().optional(),
  muted: z.boolean().optional(),
  caption: z.string().optional(),
  aspectRatio: z.enum(['16:9', '4:3', '1:1', 'custom']).optional(),
  title: z.string().optional(),
  description: z.string().optional(),
});

export const FormFieldSchema = z.object({
  id: z.string(),
  type: z.enum(['text', 'email', 'tel', 'textarea', 'select', 'checkbox', 'radio', 'number']),
  label: z.string(),
  placeholder: z.string().optional(),
  required: z.boolean().optional(),
  options: z.array(z.string()).optional(),
  validation: z.object({
    min: z.number().optional(),
    max: z.number().optional(),
    pattern: z.string().optional(),
  }).optional(),
});

export const FormBlockDataSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  fields: z.array(FormFieldSchema),
  submitText: z.string().optional(),
  submitUrl: z.string().url().optional(),
  method: z.enum(['POST', 'GET']).optional(),
  successMessage: z.string().optional(),
  errorMessage: z.string().optional(),
});

// Schéma pour les colonnes
export const ColumnDataSchema = z.object({
  id: z.string(),
  blocks: z.array(z.any()), // Array de blocs (récursif)
  width: z.number().min(1).max(12), // Largeur en colonnes (système 12 colonnes)
});

export const ColumnsBlockDataSchema = z.object({
  columns: z.array(ColumnDataSchema).min(2).max(4), // 2 à 4 colonnes
  gap: z.enum(['none', 'sm', 'md', 'lg', 'xl']),
  alignment: z.enum(['start', 'center', 'end', 'stretch']),
  responsive: z.object({
    mobile: z.enum(['stack', 'columns']),
    tablet: z.enum(['stack', 'columns']),
    desktop: z.enum(['stack', 'columns']),
  }).optional(),
});

// Schéma pour les icônes
export const IconBlockDataSchema = z.object({
  icon: z.string(), // Nom de l'icône (ex: "home", "user", "star")
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl', '2xl']),
  color: z.string().optional(),
  backgroundColor: z.string().optional(),
  shape: z.enum(['none', 'circle', 'square', 'rounded']),
  animation: z.enum(['none', 'spin', 'pulse', 'bounce']).optional(),
  link: z.string().url().optional(),
  tooltip: z.string().optional(),
});

// Types TypeScript inférés depuis les schémas Zod
export type BaseBlock = z.infer<typeof BaseBlockSchema>;
export type HeroBlockData = z.infer<typeof HeroBlockDataSchema>;
export type TextBlockData = z.infer<typeof TextBlockDataSchema>;
export type ImageBlockData = z.infer<typeof ImageBlockDataSchema>;
export type CTABlockData = z.infer<typeof CTABlockDataSchema>;
export type RichTextBlockData = z.infer<typeof RichTextBlockDataSchema>;
export type GalleryImage = z.infer<typeof GalleryImageSchema>;
export type GalleryBlockData = z.infer<typeof GalleryBlockDataSchema>;
export type VideoBlockData = z.infer<typeof VideoBlockDataSchema>;
export type FormField = z.infer<typeof FormFieldSchema>;
export type FormBlockData = z.infer<typeof FormBlockDataSchema>;
export type ColumnData = z.infer<typeof ColumnDataSchema>;
export type ColumnsBlockData = z.infer<typeof ColumnsBlockDataSchema>;
export type IconBlockData = z.infer<typeof IconBlockDataSchema>;

// Types des blocs avec validation stricte
export interface HeroBlock extends BaseBlock {
  type: 'hero';
  data: HeroBlockData;
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  data: TextBlockData;
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  data: ImageBlockData;
}

export interface CTABlock extends BaseBlock {
  type: 'cta';
  data: CTABlockData;
}

export interface RichTextBlock extends BaseBlock {
  type: 'richtext';
  data: RichTextBlockData;
}

export interface GalleryBlock extends BaseBlock {
  type: 'gallery';
  data: GalleryBlockData;
}

export interface VideoBlock extends BaseBlock {
  type: 'video';
  data: VideoBlockData;
}

export interface FormBlock extends BaseBlock {
  type: 'form';
  data: FormBlockData;
}

export interface ColumnsBlock extends BaseBlock {
  type: 'columns';
  data: ColumnsBlockData;
}

export interface IconBlock extends BaseBlock {
  type: 'icon';
  data: IconBlockData;
}

export type Block = HeroBlock | TextBlock | ImageBlock | CTABlock | RichTextBlock | GalleryBlock | VideoBlock | FormBlock | ColumnsBlock | IconBlock;

// Schéma de validation pour un bloc complet
export const BlockSchema: z.ZodType<Block> = z.discriminatedUnion('type', [
  BaseBlockSchema.extend({
    type: z.literal('hero'),
    data: HeroBlockDataSchema,
  }),
  BaseBlockSchema.extend({
    type: z.literal('text'),
    data: TextBlockDataSchema,
  }),
  BaseBlockSchema.extend({
    type: z.literal('image'),
    data: ImageBlockDataSchema,
  }),
  BaseBlockSchema.extend({
    type: z.literal('cta'),
    data: CTABlockDataSchema,
  }),
  BaseBlockSchema.extend({
    type: z.literal('richtext'),
    data: RichTextBlockDataSchema,
  }),
  BaseBlockSchema.extend({
    type: z.literal('gallery'),
    data: GalleryBlockDataSchema,
  }),
  BaseBlockSchema.extend({
    type: z.literal('video'),
    data: VideoBlockDataSchema,
  }),
  BaseBlockSchema.extend({
    type: z.literal('form'),
    data: FormBlockDataSchema,
  }),
  BaseBlockSchema.extend({
    type: z.literal('columns'),
    data: ColumnsBlockDataSchema,
  }),
  BaseBlockSchema.extend({
    type: z.literal('icon'),
    data: IconBlockDataSchema,
  }),
]);

// Types pour les pages
export interface PageLayout {
  blocks: Block[];
}

export interface PageData {
  id: string;
  slug: string;
  locale: string;
  title: string;
  layout: PageLayout | string;
  status: 'DRAFT' | 'PUBLISHED';
  createdAt: Date | string;
  updatedAt: Date | string;
}

// Schémas de validation pour les pages
export const PageDataSchema = z.object({
  id: z.string(),
  slug: z.string(),
  locale: z.string(),
  title: z.string(),
  layout: z.union([
    z.object({ blocks: z.array(BlockSchema) }),
    z.string()
  ]),
  status: z.enum(['DRAFT', 'PUBLISHED']),
  createdAt: z.union([z.date(), z.string()]),
  updatedAt: z.union([z.date(), z.string()]),
});

// Utilitaires de validation
export function validateBlock(block: unknown): Block {
  return BlockSchema.parse(block);
}

export function validateBlocks(blocks: unknown[]): Block[] {
  return blocks.map(validateBlock);
}

export function validatePageData(pageData: unknown): PageData {
  return PageDataSchema.parse(pageData);
}