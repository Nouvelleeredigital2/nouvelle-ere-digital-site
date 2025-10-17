'use client';

import React, { useState } from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';

interface ColorControlProps {
  name: string;
  label: string;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

const presetColors = [
  '#000000', '#ffffff', '#ef4444', '#f97316', '#f59e0b',
  '#84cc16', '#22c55e', '#06b6d4', '#3b82f6', '#6366f1',
  '#8b5cf6', '#ec4899', '#f43f5e', '#64748b', '#71717a',
];

export function ColorControl({
  name,
  label,
  register,
  setValue,
  watch,
}: ColorControlProps) {
  const currentValue = watch(name) || '';
  const [showCustom, setShowCustom] = useState(false);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      
      {/* Presets */}
      <div className="grid grid-cols-5 gap-2">
        {presetColors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => setValue(name, color)}
            className={`
              w-10 h-10 rounded border-2 transition-all
              ${currentValue === color ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-gray-300'}
            `}
            style={{ backgroundColor: color }}
            title={color}
          />
        ))}
      </div>
      
      {/* Custom Color */}
      <div>
        <button
          type="button"
          onClick={() => setShowCustom(!showCustom)}
          className="text-sm text-indigo-600 hover:text-indigo-700"
        >
          {showCustom ? 'Masquer' : 'Couleur personnalisée'}
        </button>
        
        {showCustom && (
          <div className="mt-2 flex items-center gap-2">
            <input
              type="color"
              value={currentValue || '#000000'}
              onChange={(e) => setValue(name, e.target.value)}
              className="w-12 h-10 rounded border border-gray-300 cursor-pointer"
            />
            <input
              type="text"
              value={currentValue}
              onChange={(e) => setValue(name, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="#000000"
            />
          </div>
        )}
      </div>
      
      {/* Current Value */}
      {currentValue && (
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <div
            className="w-4 h-4 rounded border border-gray-300"
            style={{ backgroundColor: currentValue }}
          />
          <span>{currentValue}</span>
        </div>
      )}
    </div>
  );
}
