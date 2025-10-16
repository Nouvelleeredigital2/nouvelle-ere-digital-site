import React from 'react';

interface CTABlockData {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
  backgroundColor?: string;
  textColor?: string;
}

interface CTABlockProps {
  data: CTABlockData;
}

export function CTABlock({ data }: CTABlockProps) {
  const {
    title = 'Prêt à commencer ?',
    description = 'Rejoignez-nous dès aujourd\'hui',
    primaryButtonText = 'Commencer',
    primaryButtonLink = '#',
    secondaryButtonText = '',
    secondaryButtonLink = '#',
    backgroundColor = 'bg-indigo-700',
    textColor = 'text-white',
  } = data;

  return (
    <section className={`py-20 px-4 ${backgroundColor}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${textColor}`}>
          {title}
        </h2>
        {description && (
          <p className={`text-lg mb-8 ${textColor} opacity-90`}>
            {description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={primaryButtonLink}
            className="inline-block px-8 py-4 bg-white text-indigo-700 font-semibold rounded-lg hover:bg-gray-100 transition-colors"
          >
            {primaryButtonText}
          </a>
          {secondaryButtonText && (
            <a
              href={secondaryButtonLink}
              className={`inline-block px-8 py-4 border-2 border-white ${textColor} font-semibold rounded-lg hover:bg-white hover:text-indigo-700 transition-colors`}
            >
              {secondaryButtonText}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
