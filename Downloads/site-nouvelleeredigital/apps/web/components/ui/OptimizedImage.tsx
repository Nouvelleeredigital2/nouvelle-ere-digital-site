import Image from 'next/image';
import { useState } from 'react';
import { LoadingSpinner } from './LoadingStates';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  fill?: boolean;
  style?: React.CSSProperties;
  onClick?: () => void;
  caption?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  quality = 75,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  fill = false,
  style,
  onClick,
  caption,
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  // Image de fallback en cas d'erreur
  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-muted ${className}`} style={style}>
        <div className="text-center text-muted-foreground0">
          <div className="text-4xl mb-2">📷</div>
          <div className="text-sm">Image non disponible</div>
          {caption && (
            <div className="text-xs mt-1 text-muted-foreground">{caption}</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={style}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted z-10">
          <LoadingSpinner size="md" />
        </div>
      )}
      
      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        priority={priority}
        quality={quality}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes={sizes}
        className={`transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={handleLoad}
        onError={handleError}
        onClick={onClick}
        style={fill ? { objectFit: 'cover' } : undefined}
      />
      
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-background bg-opacity-50 text-card-foreground text-xs p-2">
          {caption}
        </div>
      )}
    </div>
  );
}

// Composant spécialisé pour les images de hero
export function HeroImage({
  src,
  alt,
  className = '',
  priority = true,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      priority={priority}
      quality={85}
      sizes="100vw"
      className={`object-cover ${className}`}
    />
  );
}

// Composant spécialisé pour les images de galerie
export function GalleryImage({
  src,
  alt,
  width = 400,
  height = 300,
  className = '',
  caption,
  onClick,
}: {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  caption?: string;
  onClick?: () => void;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      quality={80}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className={`cursor-pointer hover:opacity-90 transition-opacity ${className}`}
      caption={caption}
      onClick={onClick}
    />
  );
}

// Composant spécialisé pour les avatars
export function AvatarImage({
  src,
  alt,
  size = 40,
  className = '',
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      quality={90}
      className={`rounded-full ${className}`}
      sizes="40px"
    />
  );
}

// Composant spécialisé pour les icônes de service
export function ServiceIcon({
  src,
  alt,
  size = 60,
  className = '',
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      quality={90}
      className={`object-contain ${className}`}
      sizes="60px"
    />
  );
}
