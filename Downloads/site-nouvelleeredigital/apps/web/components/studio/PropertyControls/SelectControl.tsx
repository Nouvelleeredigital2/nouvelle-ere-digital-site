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
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <select
        id={name}
        className={`
          w-full px-3 py-2 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-indigo-500
          ${error ? 'border-red-500' : 'border-gray-300'}
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
        <p className="text-sm text-red-500">{error.message}</p>
      )}
    </div>
  );
}
