'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { toast } from 'sonner';
import { Upload, Search, X, Image as ImageIcon, Trash2 } from 'lucide-react';

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

interface MediaLibraryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (media: MediaItem) => void;
  type?: 'image' | 'video' | 'all';
}

export function MediaLibrary({ isOpen, onClose, onSelect, type = 'image' }: MediaLibraryProps) {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Charger les médias
  const loadMedia = async (pageNum = 1, searchTerm = '') => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: pageNum.toString(),
        limit: '20',
        type: type === 'all' ? '' : type,
        search: searchTerm,
      });

      const response = await fetch(`/api/media?${params}`);
      if (!response.ok) throw new Error('Erreur lors du chargement');

      const data = await response.json();
      
      if (pageNum === 1) {
        setMedia(data.media);
      } else {
        setMedia(prev => [...prev, ...data.media]);
      }
      
      setHasMore(data.pagination.page < data.pagination.totalPages);
    } catch (error) {
      console.error('Erreur chargement médias:', error);
      toast.error('Erreur lors du chargement des médias');
    } finally {
      setLoading(false);
    }
  };

  // Charger au montage et quand les filtres changent
  useEffect(() => {
    if (isOpen) {
      setPage(1);
      loadMedia(1, search);
    }
  }, [isOpen, search, type]);

  // Charger plus de médias
  const loadMore = () => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      loadMedia(nextPage, search);
    }
  };

  // Upload de fichier
  const handleUpload = async (file: File) => {
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', file);
      formData.append('alt', file.name);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur upload');
      }

      const result = await response.json();
      toast.success('Fichier uploadé avec succès');
      
      // Recharger la liste
      setPage(1);
      loadMedia(1, search);
    } catch (error) {
      console.error('Erreur upload:', error);
      toast.error((error as Error).message || 'Erreur lors de l\'upload');
    } finally {
      setUploading(false);
    }
  };

  // Gestion du changement de fichier
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleUpload(file);
    }
  };

  // Supprimer un média
  const handleDelete = async (mediaId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce média ?')) return;

    try {
      const response = await fetch(`/api/upload?id=${mediaId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erreur suppression');

      toast.success('Média supprimé');
      setMedia(prev => prev.filter(m => m.id !== mediaId));
    } catch (error) {
      console.error('Erreur suppression:', error);
      toast.error('Erreur lors de la suppression');
    }
  };

  // Formater la taille du fichier
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <div className="h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold">Bibliothèque de médias</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="bg-primary hover:bg-primary text-card-foreground"
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? 'Upload...' : 'Uploader'}
            </Button>
            <Button variant="ghost" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Zone d'upload */}
        <div className="p-4 border-b bg-muted">
          <div
            className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-border transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              Cliquez pour uploader ou glissez-déposez vos fichiers
            </p>
            <p className="text-sm text-muted-foreground0 mt-2">
              Formats supportés: JPG, PNG, GIF, WebP, SVG (max 10MB)
            </p>
          </div>
        </div>

        {/* Grille de médias */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading && media.length === 0 ? (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {media.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Image preview */}
                  <div className="aspect-square bg-muted flex items-center justify-center">
                    {item.mimeType.startsWith('image/') ? (
                      <img
                        src={item.path}
                        alt={item.alt || item.originalName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-muted-foreground" />
                    )}
                  </div>

                  {/* Overlay avec actions */}
                  <div className="absolute inset-0 bg-background bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => onSelect(item)}
                        className="bg-primary hover:bg-primary text-card-foreground"
                      >
                        Sélectionner
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Infos du fichier */}
                  <div className="p-3">
                    <p className="text-sm font-medium text-muted-foreground truncate">
                      {item.originalName}
                    </p>
                    <p className="text-xs text-muted-foreground0">
                      {formatFileSize(item.size)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Bouton "Charger plus" */}
          {hasMore && media.length > 0 && (
            <div className="text-center mt-6">
              <Button
                onClick={loadMore}
                disabled={loading}
                variant="outline"
              >
                {loading ? 'Chargement...' : 'Charger plus'}
              </Button>
            </div>
          )}

          {/* Message si aucun média */}
          {!loading && media.length === 0 && (
            <div className="text-center py-12">
              <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground0">Aucun média trouvé</p>
              <p className="text-sm text-muted-foreground mt-2">
                Commencez par uploader vos premiers fichiers
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Input caché pour l'upload */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </Modal>
  );
}