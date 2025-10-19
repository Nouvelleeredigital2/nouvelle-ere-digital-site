'use client';

import { useState, useEffect } from 'react';
import { MediaLibrary } from '@/components/media/MediaLibrary';
import { Button } from '@/components/ui/Button';
import { LoadingButton, SkeletonCard } from '@/components/ui/LoadingStates';
import { toast } from 'sonner';
import { Upload, Image as ImageIcon } from 'lucide-react';

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

export default function MediaAdminPage() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [showLibrary, setShowLibrary] = useState(false);

  // Charger les médias
  const loadMedia = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/media?limit=50');
      if (!response.ok) throw new Error('Erreur lors du chargement');

      const data = await response.json();
      setMedia(data.media);
    } catch (error) {
      console.error('Erreur chargement médias:', error);
      toast.error('Erreur lors du chargement des médias');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  // Formater la taille du fichier
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Formater la date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <ImageIcon className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">Gestion des médias</h1>
            </div>
            <LoadingButton
              onClick={() => setShowLibrary(true)}
              icon={<Upload className="w-4 h-4" />}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Uploader des fichiers
            </LoadingButton>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ImageIcon className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Total des médias</p>
                <p className="text-2xl font-bold text-gray-900">{media.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ImageIcon className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Images</p>
                <p className="text-2xl font-bold text-gray-900">
                  {media.filter(m => m.mimeType.startsWith('image/')).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ImageIcon className="w-8 h-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Vidéos</p>
                <p className="text-2xl font-bold text-gray-900">
                  {media.filter(m => m.mimeType.startsWith('video/')).length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <ImageIcon className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">Espace utilisé</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatFileSize(media.reduce((total, m) => total + m.size, 0))}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Grille des médias */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Tous les médias</h2>
          </div>
          
          {loading ? (
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            </div>
          ) : media.length === 0 ? (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">Aucun média trouvé</p>
              <p className="text-gray-400 mt-2">
                Commencez par uploader vos premiers fichiers
              </p>
              <LoadingButton
                onClick={() => setShowLibrary(true)}
                icon={<Upload className="w-4 h-4" />}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Uploader des fichiers
              </LoadingButton>
            </div>
          ) : (
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {media.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-gray-50 border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Preview */}
                    <div className="aspect-square bg-gray-100 flex items-center justify-center">
                      {item.mimeType.startsWith('image/') ? (
                        <img
                          src={item.path}
                          alt={item.alt || item.originalName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <ImageIcon className="w-12 h-12 text-gray-400" />
                      )}
                    </div>

                    {/* Infos */}
                    <div className="p-3">
                      <p className="text-xs font-medium text-gray-900 truncate" title={item.originalName}>
                        {item.originalName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatFileSize(item.size)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {formatDate(item.createdAt)}
                      </p>
                    </div>

                    {/* Overlay avec actions */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => {
                            navigator.clipboard.writeText(item.path);
                            toast.success('URL copiée dans le presse-papiers');
                          }}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-xs"
                        >
                          Copier URL
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de la bibliothèque de médias */}
      <MediaLibrary
        isOpen={showLibrary}
        onClose={() => setShowLibrary(false)}
        onSelect={() => {
          setShowLibrary(false);
          loadMedia(); // Recharger la liste
        }}
      />
    </div>
  );
}