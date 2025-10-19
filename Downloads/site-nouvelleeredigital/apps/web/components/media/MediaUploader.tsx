'use client';

import React, { useState, useCallback } from 'react';
import { Upload, X, Check } from 'lucide-react';

interface MediaUploaderProps {
  onClose: () => void;
  onUploadComplete: () => void;
}

export function MediaUploader({ onClose, onUploadComplete }: MediaUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith('image/')
    );
    setFiles(prev => [...prev, ...droppedFiles]);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    setUploading(true);

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          setUploadProgress(prev => ({ ...prev, [file.name]: 100 }));
        } else {
          console.error('Erreur upload:', file.name);
        }
      } catch (error) {
        console.error('Erreur:', error);
      }
    }

    setUploading(false);
    onUploadComplete();
  };

  return (
    <div className="fixed inset-0 bg-background bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-2xl font-bold text-muted-foreground">
            Uploader des Médias
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-muted-foreground0" />
          </button>
        </div>

        {/* Drop Zone */}
        <div className="p-6 flex-1 overflow-y-auto">
          <div
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
            className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-indigo-500 transition-colors cursor-pointer"
          >
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-lg font-medium text-muted-foreground mb-2">
              Glissez-déposez vos images ici
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              ou
            </p>
            <label className="inline-block px-6 py-3 bg-primary text-card-foreground rounded-lg hover:bg-primary cursor-pointer transition-colors">
              Parcourir les fichiers
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
            <p className="text-xs text-muted-foreground0 mt-4">
              PNG, JPG, GIF, WEBP jusqu'à 10MB
            </p>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="mt-6 space-y-3">
              <h3 className="font-medium text-muted-foreground">
                Fichiers sélectionnés ({files.length})
              </h3>
              {files.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 bg-muted rounded flex items-center justify-center overflow-hidden">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-muted-foreground truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-muted-foreground0">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  {uploadProgress[file.name] === 100 ? (
                    <Check className="w-5 h-5 text-success" />
                  ) : (
                    <button
                      onClick={() => removeFile(index)}
                      disabled={uploading}
                      className="p-1 hover:bg-muted rounded transition-colors disabled:opacity-50"
                    >
                      <X className="w-5 h-5 text-muted-foreground0" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-border text-muted-foreground rounded-lg hover:bg-muted transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleUpload}
            disabled={files.length === 0 || uploading}
            className="px-6 py-2 bg-primary text-card-foreground rounded-lg hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Upload en cours...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Uploader ({files.length})
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
