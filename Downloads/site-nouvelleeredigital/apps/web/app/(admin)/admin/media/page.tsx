'use client';

import { useState, useEffect } from 'react';

interface Media {
  id: string;
  filename: string;
  originalName: string;
  mime: string;
  width?: number;
  height?: number;
  alt: string;
  createdAt: string;
}

export default function MediaPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadMedia();
  }, []);

  const loadMedia = async () => {
    try {
      const response = await fetch('/api/media');
      if (response.ok) {
        const data = await response.json();
        setMedia(data);
      }
    } catch (error) {
      console.error('Erreur lors du chargement des médias:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const formData = new FormData();
    
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        await loadMedia();
        alert('Fichiers téléversés avec succès!');
      } else {
        alert('Erreur lors du téléversement');
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors du téléversement');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Chargement...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Bibliothèque de Médias</h1>
          <label className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 cursor-pointer">
            {uploading ? 'Téléversement...' : 'Téléverser des fichiers'}
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      </div>

      {/* Media Grid */}
      <div className="container mx-auto px-6 py-8">
        {media.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Aucun média pour le moment</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {media.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="aspect-square bg-gray-100 flex items-center justify-center">
                  <img
                    src={`/media/${item.filename}`}
                    alt={item.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-900 truncate">{item.originalName}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {item.width} × {item.height}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
