'use client';

import React, { useState, useEffect } from 'react';
import { Upload, Search, X, Edit2, Trash2, Image as ImageIcon } from 'lucide-react';
import { MediaUploader } from './MediaUploader';
import { MediaEditor } from './MediaEditor';

interface Media {
  id: string;
  filename: string;
  url: string;
  alt?: string;
  size: number;
  createdAt: string;
}

export function MediaLibrary() {
  const [medias, setMedias] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [showUploader, setShowUploader] = useState(false);
  const [showEditor, setShowEditor] = useState(false);

  // Charger les médias
  useEffect(() => {
    loadMedias();
  }, []);

  const loadMedias = async () => {
    try {
      const response = await fetch('/api/media');
      if (response.ok) {
        const data = await response.json();
        setMedias(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des médias:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = () => {
    setShowUploader(false);
    loadMedias();
  };

  const handleDelete = async (mediaId: string) => {
    if (!confirm('Supprimer ce média ?')) return;

    try {
      const response = await fetch(`/api/media/${mediaId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMedias(medias.filter(m => m.id !== mediaId));
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const handleEditSave = () => {
    setShowEditor(false);
    setSelectedMedia(null);
    loadMedias();
  };

  const filteredMedias = medias.filter(media =>
    media.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
    media.alt?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Bibliothèque de Médias
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              {medias.length} média{medias.length > 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => setShowUploader(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Uploader
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Rechercher par nom de fichier ou description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : filteredMedias.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <ImageIcon className="w-16 h-16 mb-4 text-gray-300" />
            <p className="text-lg font-medium">
              {searchTerm ? 'Aucun média trouvé' : 'Aucun média'}
            </p>
            {!searchTerm && (
              <button
                onClick={() => setShowUploader(true)}
                className="mt-4 text-indigo-600 hover:text-indigo-700"
              >
                Uploader votre premier média
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredMedias.map((media) => (
              <div
                key={media.id}
                className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                  <img
                    src={media.url}
                    alt={media.alt || media.filename}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {media.filename}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatFileSize(media.size)}
                  </p>
                </div>

                {/* Actions (hover) */}
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => {
                      setSelectedMedia(media);
                      setShowEditor(true);
                    }}
                    className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                    title="Éditer"
                  >
                    <Edit2 className="w-4 h-4 text-gray-700" />
                  </button>
                  <button
                    onClick={() => handleDelete(media.id)}
                    className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Uploader Modal */}
      {showUploader && (
        <MediaUploader
          onClose={() => setShowUploader(false)}
          onUploadComplete={handleUploadComplete}
        />
      )}

      {/* Editor Modal */}
      {showEditor && selectedMedia && (
        <MediaEditor
          media={selectedMedia}
          onClose={() => {
            setShowEditor(false);
            setSelectedMedia(null);
          }}
          onSave={handleEditSave}
        />
      )}
    </div>
  );
}
