// components/blocks/VideoBlock.tsx
'use client';

import React from 'react';
import ReactPlayer from 'react-player';

interface VideoBlockData {
  src: string;
  poster?: string;
  autoplay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  caption?: string;
  aspectRatio?: '16:9' | '4:3' | '1:1' | 'custom';
  title?: string;
  description?: string;
}

interface VideoBlockProps {
  data: VideoBlockData;
}

export function VideoBlock({ data }: VideoBlockProps) {
  const {
    src = '',
    poster = '',
    autoplay = false,
    controls = true,
    loop = false,
    muted = false,
    caption = '',
    aspectRatio = '16:9',
    title = '',
    description = '',
  } = data;

  const aspectRatioClass = {
    '16:9': 'aspect-video',
    '4:3': 'aspect-4/3',
    '1:1': 'aspect-square',
    'custom': '',
  }[aspectRatio];

  if (!src) {
    return (
      <div className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className={`relative ${aspectRatioClass} bg-muted rounded-lg flex items-center justify-center`}>
            <div className="text-center text-muted-foreground0">
              <svg className="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <p>Aucune vidéo sélectionnée</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        {(title || description) && (
          <div className="text-center mb-8">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-muted-foreground mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xl text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Video Player */}
        <div className={`relative ${aspectRatioClass} rounded-lg overflow-hidden shadow-2xl`}>
          <ReactPlayer
            url={src}
            poster={poster}
            playing={autoplay}
            controls={controls}
            loop={loop}
            muted={muted}
            width="100%"
            height="100%"
            className="absolute inset-0"
            config={{
              youtube: {
                playerVars: {
                  modestbranding: 1,
                  rel: 0,
                }
              },
              vimeo: {
                playerOptions: {
                  title: false,
                }
              }
            }}
          />
        </div>

        {/* Caption */}
        {caption && (
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground italic">
              {caption}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
