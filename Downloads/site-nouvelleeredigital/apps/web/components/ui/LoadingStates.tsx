'use client';

import React from 'react';
import { Loader2, Upload, Download, Save, Trash2, Edit, Plus } from 'lucide-react';

interface LoadingButtonProps {
  loading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  icon?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
}

export function LoadingButton({
  loading,
  children,
  loadingText,
  icon,
  className = '',
  disabled,
  onClick,
  variant = 'primary'
}: LoadingButtonProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary hover:bg-primary text-card-foreground';
      case 'secondary':
        return 'bg-muted hover:bg-muted text-card-foreground';
      case 'outline':
        return 'border border-border hover:bg-muted text-muted-foreground';
      case 'ghost':
        return 'hover:bg-muted text-muted-foreground';
      case 'destructive':
        return 'bg-error hover:bg-error text-card-foreground';
      default:
        return 'bg-primary hover:bg-primary text-card-foreground';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium
        transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        disabled:opacity-50 disabled:cursor-not-allowed
        ${getVariantClasses()} ${className}
      `}
    >
      {loading ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          {loadingText || 'Chargement...'}
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
        </>
      )}
    </button>
  );
}

// Composants spécialisés
export function SaveButton({ loading, onSave, className }: {
  loading: boolean;
  onSave: () => void;
  className?: string;
}) {
  return (
    <LoadingButton
      loading={loading}
      onClick={onSave}
      icon={<Save className="w-4 h-4" />}
      loadingText="Sauvegarde..."
      className={className}
    >
      Sauvegarder
    </LoadingButton>
  );
}

export function UploadButton({ loading, onUpload, className }: {
  loading: boolean;
  onUpload: () => void;
  className?: string;
}) {
  return (
    <LoadingButton
      loading={loading}
      onClick={onUpload}
      icon={<Upload className="w-4 h-4" />}
      loadingText="Upload..."
      className={className}
    >
      Uploader
    </LoadingButton>
  );
}

export function DeleteButton({ loading, onDelete, className }: {
  loading: boolean;
  onDelete: () => void;
  className?: string;
}) {
  return (
    <LoadingButton
      loading={loading}
      onClick={onDelete}
      icon={<Trash2 className="w-4 h-4" />}
      loadingText="Suppression..."
      variant="destructive"
      className={className}
    >
      Supprimer
    </LoadingButton>
  );
}

// Skeleton de chargement
export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="bg-muted rounded-lg h-48 mb-4"></div>
      <div className="space-y-2">
        <div className="bg-muted rounded h-4 w-3/4"></div>
        <div className="bg-muted rounded h-4 w-1/2"></div>
      </div>
    </div>
  );
}

export function SkeletonList({ count = 3, className = '' }: { count?: number; className?: string }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-muted h-12 w-12"></div>
          <div className="flex-1 space-y-2">
            <div className="bg-muted rounded h-4 w-3/4"></div>
            <div className="bg-muted rounded h-4 w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function SkeletonTable({ rows = 5, columns = 4, className = '' }: {
  rows?: number;
  columns?: number;
  className?: string;
}) {
  return (
    <div className={`animate-pulse ${className}`}>
      <div className="space-y-4">
        {/* Header */}
        <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
          {Array.from({ length: columns }).map((_, i) => (
            <div key={i} className="bg-muted rounded h-4"></div>
          ))}
        </div>
        
        {/* Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
            {Array.from({ length: columns }).map((_, colIndex) => (
              <div key={colIndex} className="bg-muted rounded h-4"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Spinner de chargement
export function LoadingSpinner({ size = 'md', className = '' }: {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <Loader2 className={`animate-spin text-primary ${sizeClasses[size]} ${className}`} />
  );
}

// Page de chargement
export function LoadingPage({ message = 'Chargement...', className = '' }: {
  message?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-center min-h-screen ${className}`}>
      <div className="text-center">
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}
