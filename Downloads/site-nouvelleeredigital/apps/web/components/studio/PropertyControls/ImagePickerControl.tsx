'use client';

import React, { useState } from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Image as ImageIcon, Upload, X, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { MediaLibrary } from '@/components/media/MediaLibrary';

interface ImagePickerControlProps {
  name: string;
  label: string;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  alt: string;
  caption: string;
  createdAt: string;
}

export function ImagePickerControl({
  name,
  label,
  setValue,
  watch,
}: ImagePickerControlProps) {
  const currentValue = watch(name) || '';
  const [isUploading, setIsUploading] = useState(false);
  const [showMediaLibrary, setShowMediaLibrary] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('alt', file.name);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setValue(name, data.media.path);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Erreur lors de l\'upload');
      }
    } catch (error) {
      console.error('Erreur upload:', error);
      alert('Erreur lors de l\'upload');
    } finally {
      setIsUploading(false);
    }
  };

  const handleMediaSelect = (media: MediaItem) => {
    setValue(name, media.path);
    setShowMediaLibrary(false);
  };

  const handleRemove = () => {
    setValue(name, '');
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-muted-foreground">
        {label}
      </label>
      
      {currentValue ? (
        <div className="relative group">
          <img
            src={currentValue}
            alt="Preview"
            className="w-full h-32 object-cover rounded-lg border border-border"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-error text-card-foreground rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
            {isUploading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-2"></div>
                <p className="text-sm text-muted-foreground">Upload...</p>
              </div>
            ) : (
              <div className="text-center">
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">
                  Cliquez pour uploader
                </p>
                <p className="text-xs text-muted-foreground0">
                  PNG, JPG, GIF jusqu'à 10MB
                </p>
              </div>
            )}
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>
          
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setShowMediaLibrary(true)}
              className="flex-1"
            >
              <FolderOpen className="w-4 h-4 mr-2" />
              Bibliothèque
            </Button>
          </div>
        </div>
      )}
      
      {/* URL manuelle */}
      <div>
        <input
          type="text"
          value={currentValue}
          onChange={(e) => setValue(name, e.target.value)}
          placeholder="Ou entrez une URL"
          className="w-full px-3 py-2 border border-border rounded-lg text-sm"
        />
      </div>

      {/* Media Library Modal */}
      <MediaLibrary
        isOpen={showMediaLibrary}
        onClose={() => setShowMediaLibrary(false)}
        onSelect={handleMediaSelect}
        type="image"
      />
    </div>
  );
}
