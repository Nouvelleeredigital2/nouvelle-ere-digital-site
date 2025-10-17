'use client';

import React from 'react';

interface SpacerBlockData {
  height?: number;
  backgroundColor?: string;
}

interface SpacerBlockProps {
  data: SpacerBlockData;
}

export function SpacerBlock({ data }: SpacerBlockProps) {
  const {
    height = 60,
    backgroundColor = 'transparent',
  } = data;

  return (
    <div 
      style={{ 
        height: `${height}px`,
        backgroundColor 
      }}
      className="w-full"
    />
  );
}
