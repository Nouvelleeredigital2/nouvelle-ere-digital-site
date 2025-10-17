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
    ${error ? 'border-red-500' : 'border-gray-300'}
  `;

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
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
        <p className="text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
}
