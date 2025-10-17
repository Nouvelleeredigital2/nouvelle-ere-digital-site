'use client';

import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

interface Media {
  id: string;
  filename: string;
  url: string;
  alt?: string;
  size: number;
  createdAt: string;
}

interface MediaEditorProps {
  media: Media;
  onClose: () => void;
  onSave: () => void;
}

export function MediaEditor({ media, onClose, onSave }: MediaEditorProps) {
  const [alt, setAlt] = useState(media.alt || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/media/${media.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ alt }),
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">
            Éditer le Média
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Image Preview */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Aperçu</h3>
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={media.url}
                  alt={alt || media.filename}
                  className="w-full h-auto"
                />
              </div>
              <div className="mt-3 text-sm text-gray-600">
                <p><strong>Fichier:</strong> {media.filename}</p>
                <p><strong>Taille:</strong> {(media.size / 1024 / 1024).toFixed(2)} MB</p>
                <p><strong>URL:</strong> <code className="text-xs bg-gray-100 px-2 py-1 rounded">{media.url}</code></p>
              </div>
            </div>

            {/* Edit Form */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Métadonnées</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="alt" className="block text-sm font-medium text-gray-700 mb-2">
                    Texte Alternatif (Alt) <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="alt"
                    value={alt}
                    onChange={(e) => setAlt(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Description de l'image pour l'accessibilité"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Décrivez l'image pour les lecteurs d'écran et le référencement
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-blue-900 mb-2">
                    💡 Bonnes Pratiques SEO
                  </h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    <li>• Soyez descriptif et précis</li>
                    <li>• Incluez des mots-clés pertinents</li>
                    <li>• Évitez "image de" ou "photo de"</li>
                    <li>• Maximum 125 caractères</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !alt}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Enregistrement...' : 'Enregistrer'}
          </button>
        </div>
      </div>
    </div>
  );
}
