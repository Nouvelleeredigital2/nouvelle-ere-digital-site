// Types pour les blocs de l'éditeur visuel

export interface BaseBlock {
  id: string;
  type: string;
  data: any;
}

export interface HeroBlockData {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: string;
  alignment?: 'left' | 'center' | 'right';
}

export interface HeroBlock extends BaseBlock {
  type: 'hero';
  data: HeroBlockData;
}

export interface TextBlockData {
  content?: string;
  alignment?: 'left' | 'center' | 'right';
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  paddingY?: 'sm' | 'md' | 'lg';
}

export interface TextBlock extends BaseBlock {
  type: 'text';
  data: TextBlockData;
}

export interface ImageBlockData {
  src?: string;
  alt?: string;
  caption?: string;
  width?: number;
  height?: number;
  layout?: 'full' | 'contained';
  aspectRatio?: '16/9' | '4/3' | '1/1' | 'auto';
}

export interface ImageBlock extends BaseBlock {
  type: 'image';
  data: ImageBlockData;
}

export interface CTABlockData {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundColor?: string;
  textColor?: string;
}

export interface CTABlock extends BaseBlock {
  type: 'cta';
  data: CTABlockData;
}

export type Block = HeroBlock | TextBlock | ImageBlock | CTABlock;

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
