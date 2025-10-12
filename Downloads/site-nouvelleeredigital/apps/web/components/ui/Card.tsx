"use client";

import { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { useStyle } from "@/contexts/StyleContext";

/** Carte neutre, fond clair + ombre douce, radius personnalisable */
export const Card = ({
  children,
  className,
  hover = false,
  ...props
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
} & HTMLAttributes<HTMLDivElement>) => {
  const { config } = useStyle();

  const getCardStyles = () => {
    const baseStyles = {
      backgroundColor: config.mode === 'dark' ? '#1f2937' : '#ffffff',
      borderRadius: config.borderRadius === 'none' ? '0' :
                   config.borderRadius === 'small' ? '0.25rem' :
                   config.borderRadius === 'medium' ? '0.5rem' :
                   config.borderRadius === 'large' ? '0.75rem' : '1rem',
      padding: config.spacing === 'compact' ? '1rem' :
               config.spacing === 'comfortable' ? '2rem' : '3rem',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      border: `1px solid ${config.mode === 'dark' ? '#374151' : '#e5e7eb'}`,
      overflow: 'hidden',
    };

    if (hover) {
      return {
        ...baseStyles,
        ':hover': {
          boxShadow: `0 10px 30px ${config.primaryColor}20`,
          transform: 'translateY(-5px)',
        }
      };
    }

    return baseStyles;
  };

  return (
    <div
      className={cn(
        "card",
        className
      )}
      style={getCardStyles()}
      {...props}
    >
      {children}
    </div>
  );
};
