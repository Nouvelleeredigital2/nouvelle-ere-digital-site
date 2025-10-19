'use client';

import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface TextControlProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  error?: FieldError;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  rows?: number;
}

export function TextControl({
  name,
  label,
  register,
  error,
  placeholder,
  required = false,
  multiline = false,
  rows = 3,
}: TextControlProps) {
  const inputClasses = `
    w-full px-3 py-2 border rounded-lg
    focus:outline-none focus:ring-2 focus:ring-indigo-500
    ${error ? 'border-red-500' : 'border-border'}
  `;

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-muted-foreground">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      
      {multiline ? (
        <textarea
          id={name}
          rows={rows}
          className={inputClasses}
          placeholder={placeholder}
          {...register(name)}
        />
      ) : (
        <input
          id={name}
          type="text"
          className={inputClasses}
          placeholder={placeholder}
          {...register(name)}
        />
      )}
      
      {error && (
        <p className="text-sm text-error">{error.message}</p>
      )}
    </div>
  );
}
