'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon?: string;
}

interface FeatureListBlockData {
  title?: string;
  subtitle?: string;
  features?: Feature[];
  columns?: number;
}

interface FeatureListBlockProps {
  data: FeatureListBlockData;
}

export function FeatureListBlock({ data }: FeatureListBlockProps) {
  const {
    title = 'Nos Fonctionnalités',
    subtitle = '',
    features = [],
    columns = 3,
  } = data;

  const gridCols = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-4',
  }[columns] || 'md:grid-cols-3';

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-muted-foreground mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Features Grid */}
        <div className={`grid ${gridCols} gap-8`}>
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-lg border border-border hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-lg flex items-center justify-center mb-4">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-muted-foreground mb-3">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
