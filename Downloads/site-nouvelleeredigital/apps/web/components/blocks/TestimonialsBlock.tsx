'use client';

import React from 'react';
import { Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
}

interface TestimonialsBlockData {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
}

interface TestimonialsBlockProps {
  data: TestimonialsBlockData;
}

export function TestimonialsBlock({ data }: TestimonialsBlockProps) {
  const {
    title = 'Témoignages',
    subtitle = '',
    testimonials = [],
  } = data;

  return (
    <section className="py-16 px-4 bg-muted">
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

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-lg shadow-lg relative"
            >
              <Quote className="absolute top-4 right-4 w-8 h-8 text-indigo-200" />
              
              <p className="text-muted-foreground mb-6 italic relative z-10">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4">
                {testimonial.avatar && (
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <div>
                  <div className="font-bold text-muted-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
