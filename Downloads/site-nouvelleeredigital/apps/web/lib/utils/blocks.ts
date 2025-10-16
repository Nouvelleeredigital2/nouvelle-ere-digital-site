import { Block, HeroBlock, TextBlock, ImageBlock, CTABlock } from '../types/blocks';

/**
 * Crée un nouveau bloc Hero avec des valeurs par défaut
 */
export function createHeroBlock(overrides?: Partial<HeroBlock['data']>): HeroBlock {
  return {
    id: `hero-${Date.now()}`,
    type: 'hero',
    data: {
      title: 'Titre du Hero',
      subtitle: '',
      description: '',
      ctaText: '',
      ctaLink: '#',
      alignment: 'center',
      ...overrides,
    },
  };
}

/**
 * Crée un nouveau bloc Text avec des valeurs par défaut
 */
export function createTextBlock(overrides?: Partial<TextBlock['data']>): TextBlock {
  return {
    id: `text-${Date.now()}`,
    type: 'text',
    data: {
      content: '<p>Votre contenu ici...</p>',
      alignment: 'left',
      maxWidth: 'lg',
      paddingY: 'md',
      ...overrides,
    },
  };
}

/**
 * Crée un nouveau bloc Image avec des valeurs par défaut
 */
export function createImageBlock(overrides?: Partial<ImageBlock['data']>): ImageBlock {
  return {
    id: `image-${Date.now()}`,
    type: 'image',
    data: {
      src: '/placeholder.jpg',
      alt: 'Image',
      caption: '',
      layout: 'contained',
      aspectRatio: '16/9',
      width: 1200,
      height: 675,
      ...overrides,
    },
  };
}

/**
 * Crée un nouveau bloc CTA avec des valeurs par défaut
 */
export function createCTABlock(overrides?: Partial<CTABlock['data']>): CTABlock {
  return {
    id: `cta-${Date.now()}`,
    type: 'cta',
    data: {
      title: 'Prêt à commencer ?',
      description: 'Rejoignez-nous dès aujourd\'hui',
      primaryButtonText: 'Commencer',
      primaryButtonLink: '#',
      secondaryButtonText: '',
      secondaryButtonLink: '#',
      backgroundColor: 'bg-indigo-700',
      textColor: 'text-white',
      ...overrides,
    },
  };
}

/**
 * Valide la structure d'un bloc
 */
export function isValidBlock(block: any): block is Block {
  return (
    block &&
    typeof block === 'object' &&
    typeof block.id === 'string' &&
    typeof block.type === 'string' &&
    typeof block.data === 'object'
  );
}

/**
 * Parse un layout JSON en toute sécurité
 */
export function parseLayout(layout: string | any): { blocks: Block[] } {
  if (typeof layout === 'string') {
    try {
      const parsed = JSON.parse(layout);
      return {
        blocks: Array.isArray(parsed.blocks) ? parsed.blocks : [],
      };
    } catch {
      return { blocks: [] };
    }
  }
  
  if (layout && typeof layout === 'object' && Array.isArray(layout.blocks)) {
    return layout;
  }
  
  return { blocks: [] };
}

/**
 * Stringify un layout en JSON
 */
export function stringifyLayout(layout: { blocks: Block[] }): string {
  return JSON.stringify(layout, null, 2);
}
