'use client';

import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface TextareaControlProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  placeholder?: string;
  rows?: number;
  required?: boolean;
  className?: string;
}

export function TextareaControl({
  name,
  label,
  register,
  error,
  placeholder,
  rows = 3,
  required = false,
  className = '',
}: TextareaControlProps) {
  return (
    <div className={className}>
      <label className="block text-sm font-medium text-muted-foreground mb-1">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      <textarea
        {...register(name)}
        rows={rows}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
          error ? 'border-red-500' : 'border-border'
        }`}
      />
      {error && (
        <p className="text-xs text-error mt-1">{error.message}</p>
      )}
    </div>
  );
}
