"use client";

import { useStyle } from '@/contexts/StyleContext';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface HeadingProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  size = 'md',
  className = '',
  as: Component = 'h2'
}) => {
  const { config } = useStyle();

  // Définir les styles de base par taille
  const sizeStyles = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
    '2xl': 'text-4xl'
  };

  // Appliquer les variantes de style
  const getVariantStyles = () => {
    switch (config.headingVariant) {
      case 'underlined':
        return 'border-b-2 pb-2';
      case 'shadow':
        return 'drop-shadow-lg';
      case 'fade':
        return 'bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent';
      case 'slide':
        return 'relative before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-purple-600 before:transition-all before:duration-300 hover:before:w-full';
      case 'bold':
        return 'font-black';
      case 'minimal':
        return 'font-light';
      default:
        return '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Component
        className={cn(
          sizeStyles[size],
          'font-bold',
          getVariantStyles(),
          className
        )}
        style={{
          color: config.headingVariant === 'fade' ? undefined : config.primaryColor,
          fontFamily: config.bodyFont === 'playfair' ? 'Playfair Display, serif' :
                     config.bodyFont === 'mono' ? 'JetBrains Mono, monospace' :
                     config.bodyFont === 'roboto' ? 'Roboto, sans-serif' : 'Inter, sans-serif'
        }}
      >
        {children}
      </Component>
    </motion.div>
  );
};

interface TextProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  className?: string;
  as?: 'p' | 'span' | 'div';
  muted?: boolean;
}

export const Text: React.FC<TextProps> = ({
  children,
  size = 'base',
  className = '',
  as: Component = 'p',
  muted = false
}) => {
  const { config } = useStyle();

  const sizeStyles = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  return (
    <Component
      className={cn(
        sizeStyles[size],
        muted && 'text-gray-600 dark:text-gray-400',
        className
      )}
      style={{
        fontFamily: config.bodyFont === 'playfair' ? 'Playfair Display, serif' :
                   config.bodyFont === 'mono' ? 'JetBrains Mono, monospace' :
                   config.bodyFont === 'roboto' ? 'Roboto, sans-serif' : 'Inter, sans-serif',
        color: muted ? undefined : config.mode === 'dark' ? '#ffffff' : '#000000'
      }}
    >
      {children}
    </Component>
  );
};
