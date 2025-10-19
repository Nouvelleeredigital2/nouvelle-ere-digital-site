'use client';

import { useState, useEffect, useMemo } from 'react';
import { MediaLibrary } from '@/components/media/MediaLibrary';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Search, 
  Filter, 
  Upload, 
  Image as ImageIcon, 
  Video, 
  FileText, 
  Download,
  Trash2,
  Edit,
  Eye,
  Tag,
  Calendar,
  HardDrive
} from 'lucide-react';
import { toast } from 'sonner';

interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  path: string;
  alt: string;
  caption: string;
  uploadedBy: string;
  createdAt: string;
  tags?: string[];
  usage?: 'commercial' | 'editorial';
  license?: string;
}

interface MediaFilters {
  type: 'all' | 'image' | 'video' | 'document';
  dateRange: 'all' | 'today' | 'week' | 'month' | 'year';
  size: 'all' | 'small' | 'medium' | 'large';
  usage: 'all' | 'commercial' | 'editorial';
  search: string;
}

export function AdvancedMediaManager() {
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [showLibrary, setShowLibrary] = useState(false);
  const [editingMedia, setEditingMedia] = useState<MediaItem | null>(null);
  const [filters, setFilters] = useState<MediaFilters>({
    type: 'all',
    dateRange: 'all',
    size: 'all',
    usage: 'all',
    search: '',
  });

  // Charger les médias
  const loadMedia = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        limit: '100',
        ...(filters.search && { search: filters.search }),
        ...(filters.type !== 'all' && { type: filters.type }),
      });

      const response = await fetch(`/api/media?${queryParams}`);
      if (!response.ok) throw new Error('Erreur lors du chargement');

      const data = await response.json();
      setMedia(data.media || data.data || []);
    } catch (error) {
      console.error('Erreur chargement médias:', error);
      toast.error('Erreur lors du chargement des médias');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMedia();
  }, [filters.search, filters.type]);

  // Filtrer les médias
  const filteredMedia = useMemo(() => {
    return media.filter((item) => {
      // Filtre par type
      if (filters.type !== 'all') {
        const type = item.mimeType.split('/')[0];
        if (filters.type === 'image' && type !== 'image') return false;
        if (filters.type === 'video' && type !== 'video') return false;
        if (filters.type === 'document' && !['application', 'text'].includes(type)) return false;
      }

      // Filtre par taille
      if (filters.size !== 'all') {
        const sizeMB = item.size / (1024 * 1024);
        if (filters.size === 'small' && sizeMB > 1) return false;
        if (filters.size === 'medium' && (sizeMB <= 1 || sizeMB > 10)) return false;
        if (filters.size === 'large' && sizeMB <= 10) return false;
      }

      // Filtre par date
      if (filters.dateRange !== 'all') {
        const itemDate = new Date(item.createdAt);
        const now = new Date();
        const diffTime = now.getTime() - itemDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (filters.dateRange === 'today' && diffDays > 1) return false;
        if (filters.dateRange === 'week' && diffDays > 7) return false;
        if (filters.dateRange === 'month' && diffDays > 30) return false;
        if (filters.dateRange === 'year' && diffDays > 365) return false;
      }

      // Filtre par usage
      if (filters.usage !== 'all' && item.usage !== filters.usage) return false;

      return true;
    });
  }, [media, filters]);

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

  // Obtenir l'icône selon le type
  const getFileIcon = (mimeType: string) => {
    const type = mimeType.split('/')[0];
    switch (type) {
      case 'image':
        return <ImageIcon className="w-5 h-5 text-blue-600" />;
      case 'video':
        return <Video className="w-5 h-5 text-purple-600" />;
      case 'application':
      case 'text':
        return <FileText className="w-5 h-5 text-gray-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };

  // Obtenir la couleur du badge selon le type
  const getTypeBadgeColor = (mimeType: string) => {
    const type = mimeType.split('/')[0];
    switch (type) {
      case 'image':
        return 'bg-blue-100 text-blue-800';
      case 'video':
        return 'bg-purple-100 text-purple-800';
      case 'application':
      case 'text':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Gestion de la sélection
  const handleSelectMedia = (mediaId: string) => {
    setSelectedMedia(prev => 
      prev.includes(mediaId) 
        ? prev.filter(id => id !== mediaId)
        : [...prev, mediaId]
    );
  };

  const handleSelectAll = () => {
    if (selectedMedia.length === filteredMedia.length) {
      setSelectedMedia([]);
    } else {
      setSelectedMedia(filteredMedia.map(item => item.id));
    }
  };

  // Actions en lot
  const handleBulkDelete = async () => {
    if (selectedMedia.length === 0) return;

    try {
      const promises = selectedMedia.map(id => 
        fetch(`/api/media/${id}`, { method: 'DELETE' })
      );
      
      await Promise.all(promises);
      setSelectedMedia([]);
      await loadMedia();
      toast.success(`${selectedMedia.length} fichiers supprimés`);
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  // Statistiques
  const stats = useMemo(() => {
    const totalSize = media.reduce((sum, item) => sum + item.size, 0);
    const imageCount = media.filter(item => item.mimeType.startsWith('image/')).length;
    const videoCount = media.filter(item => item.mimeType.startsWith('video/')).length;
    const documentCount = media.filter(item => 
      item.mimeType.startsWith('application/') || item.mimeType.startsWith('text/')
    ).length;

    return {
      total: media.length,
      totalSize,
      imageCount,
      videoCount,
      documentCount,
    };
  }, [media]);

  return (
    <div className="space-y-6">
      {/* Header avec statistiques */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Gestion des médias</h1>
              <p className="text-gray-600 mt-1">
                Gérez vos images, vidéos et documents
              </p>
            </div>
            <Button
              onClick={() => setShowLibrary(true)}
              className="flex items-center space-x-2"
            >
              <Upload className="w-4 h-4" />
              <span>Uploader</span>
            </Button>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <HardDrive className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-lg font-semibold">{stats.total} fichiers</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <ImageIcon className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Images</p>
                    <p className="text-lg font-semibold">{stats.imageCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Video className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Vidéos</p>
                    <p className="text-lg font-semibold">{stats.videoCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-gray-600" />
                  <div>
                    <p className="text-sm text-gray-600">Documents</p>
                    <p className="text-lg font-semibold">{stats.documentCount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Filtres et recherche */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filtres et recherche</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {/* Recherche */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Rechercher par nom..."
                    value={filters.search}
                    onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Type */}
              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as any }))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous les types</option>
                <option value="image">Images</option>
                <option value="video">Vidéos</option>
                <option value="document">Documents</option>
              </select>

              {/* Taille */}
              <select
                value={filters.size}
                onChange={(e) => setFilters(prev => ({ ...prev, size: e.target.value as any }))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Toutes les tailles</option>
                <option value="small">Petit (&lt; 1MB)</option>
                <option value="medium">Moyen (1-10MB)</option>
                <option value="large">Grand (&gt; 10MB)</option>
              </select>

              {/* Date */}
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters(prev => ({ ...prev, dateRange: e.target.value as any }))}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Toutes les dates</option>
                <option value="today">Aujourd'hui</option>
                <option value="week">Cette semaine</option>
                <option value="month">Ce mois</option>
                <option value="year">Cette année</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Actions en lot */}
        {selectedMedia.length > 0 && (
          <Card className="mt-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {selectedMedia.length} fichier(s) sélectionné(s)
                </span>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedMedia([])}
                  >
                    Désélectionner
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleBulkDelete}
                    className="flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Supprimer</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Grille des médias */}
        <div className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              Médias ({filteredMedia.length})
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
            >
              {selectedMedia.length === filteredMedia.length ? 'Tout désélectionner' : 'Tout sélectionner'}
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {filteredMedia.map((item) => (
                <Card
                  key={item.id}
                  className={`
                    cursor-pointer transition-all duration-200 hover:shadow-lg
                    ${selectedMedia.includes(item.id) ? 'ring-2 ring-blue-500' : ''}
                  `}
                  onClick={() => handleSelectMedia(item.id)}
                >
                  <CardContent className="p-4">
                    {/* Aperçu */}
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                      {item.mimeType.startsWith('image/') ? (
                        <img
                          src={item.path}
                          alt={item.alt || item.originalName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        getFileIcon(item.mimeType)
                      )}
                    </div>

                    {/* Informations */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-900 truncate" title={item.originalName}>
                        {item.originalName}
                      </h4>
                      
                      <div className="flex items-center justify-between">
                        <Badge className={getTypeBadgeColor(item.mimeType)}>
                          {item.mimeType.split('/')[1]?.toUpperCase() || 'FILE'}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {formatFileSize(item.size)}
                        </span>
                      </div>

                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(item.createdAt)}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-1 pt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingMedia(item);
                          }}
                          className="flex-1"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(item.path, '_blank');
                          }}
                          className="flex-1"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            const link = document.createElement('a');
                            link.href = item.path;
                            link.download = item.originalName;
                            link.click();
                          }}
                          className="flex-1"
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredMedia.length === 0 && !loading && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun média trouvé</h3>
              <p className="text-gray-600 mb-4">
                {filters.search || filters.type !== 'all' 
                  ? 'Essayez de modifier vos filtres de recherche.'
                  : 'Commencez par uploader vos premiers fichiers.'
                }
              </p>
              <Button onClick={() => setShowLibrary(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Uploader des fichiers
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Modales */}
      {showLibrary && (
        <MediaLibrary
          onClose={() => setShowLibrary(false)}
          onSelect={(media) => {
            setShowLibrary(false);
            loadMedia();
          }}
        />
      )}

      {/* Modal d'édition des métadonnées */}
      {editingMedia && (
        <MediaMetadataEditor
          media={editingMedia}
          onClose={() => setEditingMedia(null)}
          onSave={(updatedMedia) => {
            setEditingMedia(null);
            loadMedia();
          }}
        />
      )}
    </div>
  );
}

// Composant pour éditer les métadonnées des médias
interface MediaMetadataEditorProps {
  media: MediaItem;
  onClose: () => void;
  onSave: (media: MediaItem) => void;
}

function MediaMetadataEditor({ media, onClose, onSave }: MediaMetadataEditorProps) {
  const [formData, setFormData] = useState({
    alt: media.alt || '',
    caption: media.caption || '',
    tags: media.tags?.join(', ') || '',
    usage: media.usage || 'editorial',
    license: media.license || '',
  });

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/media/${media.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        }),
      });

      if (!response.ok) throw new Error('Erreur lors de la sauvegarde');

      onSave({ ...media, ...formData });
      toast.success('Métadonnées sauvegardées');
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Modifier les métadonnées</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom du fichier
            </label>
            <p className="text-sm text-gray-600">{media.originalName}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Texte alternatif (alt)
            </label>
            <Input
              value={formData.alt}
              onChange={(e) => setFormData(prev => ({ ...prev, alt: e.target.value }))}
              placeholder="Description de l'image pour l'accessibilité"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Légende
            </label>
            <Input
              value={formData.caption}
              onChange={(e) => setFormData(prev => ({ ...prev, caption: e.target.value }))}
              placeholder="Légende optionnelle"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags (séparés par des virgules)
            </label>
            <Input
              value={formData.tags}
              onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
              placeholder="tag1, tag2, tag3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usage
            </label>
            <select
              value={formData.usage}
              onChange={(e) => setFormData(prev => ({ ...prev, usage: e.target.value as any }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="editorial">Éditorial</option>
              <option value="commercial">Commercial</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-2 mt-6">
          <Button variant="outline" onClick={onClose}>
            Annuler
          </Button>
          <Button onClick={handleSave}>
            Sauvegarder
          </Button>
        </div>
      </div>
    </div>
  );
}
