"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useStyle } from "@/contexts/StyleContext";

type Tone = "primary" | "secondary" | "accent" | "neutre";

export const Badge = ({
  children,
  tone = "primary",
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
}) => {
  const { config } = useStyle();

  const getBadgeStyles = () => {
    const baseStyles = {
      borderRadius: config.borderRadius === 'none' ? '0' :
                   config.borderRadius === 'small' ? '0.25rem' :
                   config.borderRadius === 'medium' ? '0.5rem' :
                   config.borderRadius === 'large' ? '0.75rem' : '1rem',
      fontFamily: config.bodyFont === 'inter' ? 'Inter, sans-serif' :
                 config.bodyFont === 'roboto' ? 'Roboto, sans-serif' :
                 config.bodyFont === 'playfair' ? 'Playfair Display, serif' : 'JetBrains Mono, monospace',
      padding: '0.25rem 0.75rem',
      fontSize: '0.875rem',
      fontWeight: '500',
      display: 'inline-block',
    };

    switch(tone) {
      case 'primary':
        return {
          ...baseStyles,
          backgroundColor: config.primaryColor,
          color: '#ffffff',
        };
      case 'secondary':
        return {
          ...baseStyles,
          backgroundColor: config.secondaryColor,
          color: '#ffffff',
        };
      case 'accent':
        return {
          ...baseStyles,
          backgroundColor: config.accentColor,
          color: '#ffffff',
        };
      case 'neutre':
        return {
          ...baseStyles,
          backgroundColor: config.mode === 'dark' ? '#374151' : '#f3f4f6',
          color: config.mode === 'dark' ? '#d1d5db' : '#374151',
        };
      default:
        return baseStyles;
    }
  };

  return (
    <span
      className={cn(
        "badge",
        className
      )}
      style={getBadgeStyles()}
    >
      {children}
    </span>
  );
};
