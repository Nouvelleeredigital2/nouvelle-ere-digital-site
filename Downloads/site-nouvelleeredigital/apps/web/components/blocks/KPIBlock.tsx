'use client';

import React from 'react';

interface KPI {
  value: string;
  label: string;
  suffix?: string;
}

interface KPIBlockData {
  title?: string;
  subtitle?: string;
  kpis?: KPI[];
  backgroundColor?: string;
}

interface KPIBlockProps {
  data: KPIBlockData;
}

export function KPIBlock({ data }: KPIBlockProps) {
  const {
    title = 'Nos Chiffres Clés',
    subtitle = '',
    kpis = [],
    backgroundColor = '#f9fafb',
  } = data;

  return (
    <section className="py-16 px-4" style={{ backgroundColor }}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* KPIs Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {kpis.map((kpi, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
                {kpi.value}
                {kpi.suffix && (
                  <span className="text-3xl">{kpi.suffix}</span>
                )}
              </div>
              <div className="text-gray-700 font-medium">
                {kpi.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
