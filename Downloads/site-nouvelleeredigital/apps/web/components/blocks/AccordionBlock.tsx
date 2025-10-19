// components/blocks/AccordionBlock.tsx
'use client';

import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { BlockRenderer } from './BlockRenderer';

interface Block {
  id: string;
  type: string;
  data: any;
}

interface AccordionSection {
  id: string;
  title: string;
  content: Block[];
  openByDefault?: boolean;
}

interface AccordionBlockData {
  sections: AccordionSection[];
  allowMultiple?: boolean;
  title?: string;
  description?: string;
  style?: 'default' | 'bordered' | 'minimal';
}

interface AccordionBlockProps {
  data: AccordionBlockData;
}

export function AccordionBlock({ data }: AccordionBlockProps) {
  const {
    sections = [],
    allowMultiple = false,
    title = '',
    description = '',
    style = 'default',
  } = data;

  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(
      sections
        .filter(section => section.openByDefault)
        .map(section => section.id)
    )
  );

  const toggleSection = (sectionId: string) => {
    const newOpenSections = new Set(openSections);

    if (allowMultiple) {
      if (newOpenSections.has(sectionId)) {
        newOpenSections.delete(sectionId);
      } else {
        newOpenSections.add(sectionId);
      }
    } else {
      if (newOpenSections.has(sectionId)) {
        newOpenSections.clear();
      } else {
        newOpenSections.clear();
        newOpenSections.add(sectionId);
      }
    }

    setOpenSections(newOpenSections);
  };

  const getStyleClasses = () => {
    switch (style) {
      case 'bordered':
        return 'border border-border rounded-lg';
      case 'minimal':
        return 'border-b border-border';
      default:
        return 'bg-card border border-border rounded-lg shadow-sm';
    }
  };

  if (sections.length === 0) {
    return (
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-muted-foreground0">
            <p>Aucune section d'accordéon configurée</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        {(title || description) && (
          <div className="text-center mb-12">
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

        {/* Accordion */}
        <div className={`space-y-4 ${getStyleClasses()}`}>
          {sections.map((section, index) => {
            const isOpen = openSections.has(section.id);

            return (
              <div key={section.id} className="accordion-item">
                <Collapsible
                  open={isOpen}
                  onOpenChange={() => toggleSection(section.id)}
                >
                  <CollapsibleTrigger asChild>
                    <button
                      className={`
                        w-full text-left px-6 py-4 flex items-center justify-between
                        hover:bg-muted transition-colors duration-200
                        ${isOpen ? 'bg-indigo-50' : 'bg-card'}
                        ${style === 'minimal' ? 'border-none' : 'border-b border-gray-100'}
                        ${index === 0 ? 'rounded-t-lg' : ''}
                        ${index === sections.length - 1 ? 'rounded-b-lg' : ''}
                      `}
                    >
                      <span className="font-medium text-muted-foreground">
                        {section.title}
                      </span>
                      <div className="flex items-center">
                        {isOpen ? (
                          <ChevronDown className="w-5 h-5 text-indigo-600" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        )}
                      </div>
                    </button>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="px-6 py-4 bg-card">
                    <div className="prose prose-lg max-w-none">
                      <BlockRenderer blocks={section.content} />
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
