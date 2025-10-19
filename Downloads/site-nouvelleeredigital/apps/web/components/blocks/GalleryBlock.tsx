'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import useEmblaCarousel from 'embla-carousel-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface GalleryBlockData {
  images: GalleryImage[];
  layout: 'grid' | 'masonry' | 'carousel';
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  aspectRatio?: '16/9' | '4/3' | '1/1' | 'auto';
}

interface GalleryBlockProps {
  data: GalleryBlockData;
}

export function GalleryBlock({ data }: GalleryBlockProps) {
  const {
    images = [],
    layout = 'grid',
    columns = 3,
    gap = 'md',
    aspectRatio = 'auto',
  } = data;

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Classes pour l'espacement
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };

  // Classes pour le ratio d'aspect
  const aspectRatioClasses = {
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    'auto': '',
  };

  // Ouvrir la lightbox
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Images pour la lightbox
  const lightboxSlides = images.map((img) => ({
    src: img.src,
    alt: img.alt,
    title: img.caption,
  }));

  if (!images || images.length === 0) {
    return (
      <div className="py-12 text-center text-muted-foreground0">
        <p>Aucune image dans la galerie</p>
      </div>
    );
  }

  // Layout GRID
  if (layout === 'grid') {
    return (
      <div className="py-8">
        <div className="container mx-auto px-4">
          <div
            className={`grid ${gapClasses[gap]}`}
            style={{
              gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
            }}
          >
            {images.map((image, index) => (
              <div
                key={image.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg"
                onClick={() => openLightbox(index)}
              >
                <div className={aspectRatioClasses[aspectRatio]}>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Overlay hover */}
                  <div className="absolute inset-0 bg-background bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <Maximize2 className="w-8 h-8 text-card-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="text-card-foreground text-sm">{image.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={lightboxSlides}
        />
      </div>
    );
  }

  // Layout MASONRY
  if (layout === 'masonry') {
    const breakpointColumns = {
      default: columns,
      1024: Math.min(columns, 3),
      768: Math.min(columns, 2),
      640: 1,
    };

    return (
      <div className="py-8">
        <div className="container mx-auto px-4">
          <Masonry
            breakpointCols={breakpointColumns}
            className="flex -ml-4"
            columnClassName={`pl-4 bg-clip-padding ${gapClasses[gap]}`}
          >
            {images.map((image, index) => (
              <div
                key={image.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg mb-4"
                onClick={() => openLightbox(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width || 400}
                  height={image.height || 600}
                  className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
                />
                {/* Overlay hover */}
                <div className="absolute inset-0 bg-background bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                  <Maximize2 className="w-8 h-8 text-card-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <p className="text-card-foreground text-sm">{image.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </Masonry>
        </div>

        {/* Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={lightboxSlides}
        />
      </div>
    );
  }

  // Layout CAROUSEL
  if (layout === 'carousel') {
    return <GalleryCarousel images={images} openLightbox={openLightbox} />;
  }

  return null;
}

// Composant Carousel séparé
function GalleryCarousel({
  images,
  openLightbox,
}: {
  images: GalleryImage[];
  openLightbox: (index: number) => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  React.useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on('select', onSelect);
    onSelect();

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <div className="relative">
          {/* Carousel viewport */}
          <div className="overflow-hidden rounded-lg" ref={emblaRef}>
            <div className="flex">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className="flex-[0_0_100%] min-w-0"
                  onClick={() => openLightbox(index)}
                >
                  <div className="relative aspect-video cursor-pointer group">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                    {/* Overlay hover */}
                    <div className="absolute inset-0 bg-background bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                      <Maximize2 className="w-12 h-12 text-card-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    {image.caption && (
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                        <p className="text-card-foreground text-lg">{image.caption}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-card/90 hover:bg-card p-3 rounded-full shadow-lg transition-all"
            aria-label="Image précédente"
          >
            <ChevronLeft className="w-6 h-6 text-muted-foreground" />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-card/90 hover:bg-card p-3 rounded-full shadow-lg transition-all"
            aria-label="Image suivante"
          >
            <ChevronRight className="w-6 h-6 text-muted-foreground" />
          </button>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-4">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi && emblaApi.scrollTo(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === selectedIndex
                    ? 'bg-indigo-600 w-8'
                    : 'bg-muted hover:bg-muted'
                }`}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
