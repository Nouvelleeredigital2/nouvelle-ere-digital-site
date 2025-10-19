'use client';

import React from 'react';
import { CheckCircle } from 'lucide-react';

interface Step {
  title: string;
  description: string;
  icon?: string;
}

interface StepsBlockData {
  title?: string;
  subtitle?: string;
  steps?: Step[];
}

interface StepsBlockProps {
  data: StepsBlockData;
}

export function StepsBlock({ data }: StepsBlockProps) {
  const {
    title = 'Notre Processus',
    subtitle = '',
    steps = [],
  } = data;

  return (
    <section className="py-16 px-4 bg-muted">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
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

        {/* Steps */}
        <div className="relative">
          {/* Ligne verticale */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-indigo-200 transform -translate-x-1/2" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="bg-card p-8 rounded-lg shadow-lg">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-indigo-600 text-card-foreground rounded-full flex items-center justify-center font-bold">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-muted-foreground mb-3">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Circle */}
                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-indigo-600 rounded-full items-center justify-center shadow-lg z-10">
                  <CheckCircle className="w-6 h-6 text-card-foreground" />
                </div>

                {/* Spacer */}
                <div className="hidden md:block flex-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
