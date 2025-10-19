'use client';

import React from 'react';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectControlProps {
  name: string;
  label: string;
  options: SelectOption[];
  register: UseFormRegister<any>;
  error?: FieldError;
  required?: boolean;
}

export function SelectControl({
  name,
  label,
  options,
  register,
  error,
  required = false,
}: SelectControlProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-muted-foreground">
        {label}
        {required && <span className="text-error ml-1">*</span>}
      </label>
      
      <select
        id={name}
        className={`
          w-full px-3 py-2 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          ${error ? 'border-red-500' : 'border-border'}
        `}
        {...register(name)}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
      {error && (
        <p className="text-sm text-error">{error.message}</p>
      )}
    </div>
  );
}
