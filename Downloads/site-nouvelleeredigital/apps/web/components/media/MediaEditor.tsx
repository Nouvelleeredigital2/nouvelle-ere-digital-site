'use client';

import React, { useState, useCallback } from 'react';
import { X, Save, Crop, Target } from 'lucide-react';
import Cropper from 'react-easy-crop';
import type { Area, Point } from 'react-easy-crop';

interface Media {
  id: string;
  filename: string;
  url: string;
  alt?: string;
  size: number;
  focalX?: number;
  focalY?: number;
  createdAt: string;
}

interface MediaEditorProps {
  media: Media;
  onClose: () => void;
  onSave: () => void;
}

type EditorMode = 'metadata' | 'crop' | 'focal';

export function MediaEditor({ media, onClose, onSave }: MediaEditorProps) {
  const [mode, setMode] = useState<EditorMode>('metadata');
  const [alt, setAlt] = useState(media.alt || '');
  const [focalPoint, setFocalPoint] = useState({
    x: media.focalX || 0.5,
    y: media.focalY || 0.5,
  });
  const [saving, setSaving] = useState(false);
  
  // États pour le recadrage
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/media/${media.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          alt,
          focalX: focalPoint.x,
          focalY: focalPoint.y,
        }),
      });

      if (response.ok) {
        onSave();
      } else {
        alert('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setSaving(false);
    }
  };

  const handleFocalPointClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setFocalPoint({ x, y });
  };

  return (
    <div className="fixed inset-0 bg-background/80 z-50 flex items-center justify-center p-4">
      <div className="bg-card text-card-foreground rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] flex flex-col border border-border">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-2xl font-bold text-card-foreground">
              Éditer le Média
            </h2>
            <div className="flex gap-2 mt-3">
              <button
                onClick={() => setMode('metadata')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  mode === 'metadata'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-muted text-muted-foreground hover:bg-muted'
                }`}
              >
                Métadonnées
              </button>
              <button
                onClick={() => setMode('crop')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  mode === 'crop'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-muted text-muted-foreground hover:bg-muted'
                }`}
              >
                <Crop className="w-4 h-4" />
                Recadrage
              </button>
              <button
                onClick={() => setMode('focal')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 ${
                  mode === 'focal'
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'bg-muted text-muted-foreground hover:bg-muted'
                }`}
              >
                <Target className="w-4 h-4" />
                Point Focal
              </button>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-muted-foreground0" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {mode === 'metadata' && (
            <div className="grid md:grid-cols-2 gap-6">
              {/* Image Preview */}
              <div>
                <h3 className="font-medium text-muted-foreground mb-3">Aperçu</h3>
                <div className="bg-muted rounded-lg overflow-hidden">
                  <img
                    src={media.url}
                    alt={alt || media.filename}
                    className="w-full h-auto"
                  />
                </div>
                <div className="mt-3 text-sm text-muted-foreground">
                  <p><strong>Fichier:</strong> {media.filename}</p>
                  <p><strong>Taille:</strong> {(media.size / 1024 / 1024).toFixed(2)} MB</p>
                  <p><strong>URL:</strong> <code className="text-xs bg-muted px-2 py-1 rounded">{media.url}</code></p>
                </div>
              </div>

              {/* Edit Form */}
              <div>
                <h3 className="font-medium text-muted-foreground mb-3">Métadonnées</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="alt" className="block text-sm font-medium text-muted-foreground mb-2">
                      Texte Alternatif (Alt) <span className="text-error">*</span>
                    </label>
                    <textarea
                      id="alt"
                      value={alt}
                      onChange={(e) => setAlt(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Description de l'image pour l'accessibilité"
                    />
                    <p className="text-xs text-muted-foreground0 mt-1">
                      Décrivez l'image pour les lecteurs d'écran et le référencement
                    </p>
                  </div>

                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-primary mb-2">
                      💡 Bonnes Pratiques SEO
                    </h4>
                    <ul className="text-xs text-primary space-y-1">
                      <li>• Soyez descriptif et précis</li>
                      <li>• Incluez des mots-clés pertinents</li>
                      <li>• Évitez "image de" ou "photo de"</li>
                      <li>• Maximum 125 caractères</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {mode === 'crop' && (
            <div className="h-[500px] relative">
              <div className="absolute inset-0 bg-muted">
                <Cropper
                  image={media.url}
                  crop={crop}
                  zoom={zoom}
                  aspect={16 / 9}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                />
              </div>
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-card rounded-lg shadow-lg p-4 z-10">
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Zoom
                </label>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-64"
                />
                <p className="text-xs text-muted-foreground0 mt-2 text-center">
                  Note: Le recadrage sera appliqué lors de la prochaine version
                </p>
              </div>
            </div>
          )}

          {mode === 'focal' && (
            <div className="max-w-4xl mx-auto">
              <div className="mb-4">
                <h3 className="font-medium text-muted-foreground mb-2">Point Focal</h3>
                <p className="text-sm text-muted-foreground">
                  Cliquez sur l'image pour définir le point focal. Ce point sera utilisé pour le recadrage intelligent.
                </p>
              </div>
              <div
                className="relative cursor-crosshair bg-muted rounded-lg overflow-hidden"
                onClick={handleFocalPointClick}
                style={{ maxHeight: '600px' }}
              >
                <img
                  src={media.url}
                  alt={alt || media.filename}
                  className="w-full h-auto"
                />
                {/* Point focal indicator */}
                <div
                  className="absolute w-8 h-8 -ml-4 -mt-4 pointer-events-none"
                  style={{
                    left: `${focalPoint.x * 100}%`,
                    top: `${focalPoint.y * 100}%`,
                  }}
                >
                  <div className="relative w-full h-full">
                    <div className="absolute inset-0 rounded-full bg-card border-2 border-indigo-600 animate-ping opacity-75"></div>
                    <div className="absolute inset-0 rounded-full bg-primary border-2 border-white"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Target className="w-4 h-4 text-card-foreground" />
                    </div>
                  </div>
                </div>
                {/* Grille d'aide */}
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute top-1/3 left-0 right-0 h-px bg-card opacity-30"></div>
                  <div className="absolute top-2/3 left-0 right-0 h-px bg-card opacity-30"></div>
                  <div className="absolute left-1/3 top-0 bottom-0 w-px bg-card opacity-30"></div>
                  <div className="absolute left-2/3 top-0 bottom-0 w-px bg-card opacity-30"></div>
                </div>
              </div>
              <div className="mt-4 text-sm text-muted-foreground bg-muted rounded-lg p-4">
                <p className="font-medium mb-1">Position actuelle:</p>
                <p>X: {(focalPoint.x * 100).toFixed(1)}% | Y: {(focalPoint.y * 100).toFixed(1)}%</p>
              </div>
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
            onClick={handleSave}
            disabled={saving || !alt}
            className="px-6 py-2 bg-primary text-card-foreground rounded-lg hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </div>
  );
}
