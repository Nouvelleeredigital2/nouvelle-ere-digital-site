'use client';

import React from 'react';

interface VideoBlockData {
  videoUrl?: string;
  title?: string;
  description?: string;
  provider?: 'youtube' | 'vimeo' | 'direct';
  autoplay?: boolean;
}

interface VideoBlockProps {
  data: VideoBlockData;
}

export function VideoBlock({ data }: VideoBlockProps) {
  const {
    videoUrl = '',
    title = '',
    description = '',
    provider = 'youtube',
    autoplay = false,
  } = data;

  const getEmbedUrl = () => {
    if (!videoUrl) return '';

    if (provider === 'youtube') {
      const videoId = videoUrl.split('v=')[1] || videoUrl.split('/').pop();
      return `https://www.youtube.com/embed/${videoId}${autoplay ? '?autoplay=1' : ''}`;
    }

    if (provider === 'vimeo') {
      const videoId = videoUrl.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}${autoplay ? '?autoplay=1' : ''}`;
    }

    return videoUrl;
  };

  return (
    <section className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        {(title || description) && (
          <div className="text-center mb-8">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xl text-gray-600">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Video */}
        {videoUrl && (
          <div className="relative rounded-lg overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
            <iframe
              src={getEmbedUrl()}
              title={title || 'Video'}
              className="absolute top-0 left-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        )}
      </div>
    </section>
  );
}
