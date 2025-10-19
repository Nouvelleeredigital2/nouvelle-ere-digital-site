'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useHistory } from '@/hooks/useHistory';

interface Page {
  id: string;
  slug: string;
  title: string;
  status: 'DRAFT' | 'REVIEW' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
  author: {
    name: string;
    email: string;
  };
}

export default function PagesAdmin() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'hierarchy'>('list');
  
  // Hook d'historique pour undo/redo
  const { undo, redo, canUndo, canRedo } = useHistory();

  // Fonctions pour gérer l'historique des pages
  const handleUndoPages = () => {
    undo();
    // Recharger la liste après undo
    handleRefreshPages();
  };

  const handleRedoPages = () => {
    redo();
    // Recharger la liste après redo
    handleRefreshPages();
  };

  useEffect(() => {
    const loadPages = async () => {
      try {
        setLoading(true);
        
        // Récupérer les pages depuis l'API
        const response = await fetch('/api/pages');
        
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des pages');
        }
        
        const apiPages = await response.json();
        
        // Transformer les données de l'API pour correspondre à notre interface
        const transformedPages: Page[] = apiPages.map((page: any) => ({
          id: page.id,
          slug: page.slug,
          title: page.title,
          status: page.status || 'DRAFT',
          createdAt: page.createdAt,
          updatedAt: page.updatedAt,
          author: {
            name: 'Admin', // TODO: Récupérer depuis page.author si disponible
            email: 'admin@example.com'
          }
        }));
        
        setPages(transformedPages);
        setError(null);
      } catch (error) {
        console.error('Erreur lors du chargement des pages:', error);
        setError('Erreur lors du chargement des pages. Utilisation des données de démonstration.');
        
        // En cas d'erreur, utiliser des données mock pour le développement
        const mockPages: Page[] = [
          {
            id: '1',
            slug: 'accueil',
            title: 'Page d\'accueil',
            status: 'PUBLISHED',
            createdAt: '2024-01-15T10:00:00Z',
            updatedAt: '2024-01-20T14:30:00Z',
            author: { name: 'Admin', email: 'admin@example.com' }
          },
          {
            id: '2',
            slug: 'a-propos',
            title: 'À propos',
            status: 'DRAFT',
            createdAt: '2024-01-16T09:00:00Z',
            updatedAt: '2024-01-18T16:45:00Z',
            author: { name: 'Admin', email: 'admin@example.com' }
          }
        ];
        
        setPages(mockPages);
      } finally {
        setLoading(false);
      }
    };

    loadPages();
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      DRAFT: { label: 'Brouillon', color: 'bg-gray-100 text-gray-800' },
      REVIEW: { label: 'En révision', color: 'bg-yellow-100 text-yellow-800' },
      SCHEDULED: { label: 'Programmé', color: 'bg-blue-100 text-blue-800' },
      PUBLISHED: { label: 'Publié', color: 'bg-green-100 text-green-800' },
      ARCHIVED: { label: 'Archivé', color: 'bg-red-100 text-red-800' },
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.DRAFT;
    return (
      <span className={`px-2 py-1 text-xs rounded-full ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || page.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDeletePage = async (pageId: string, pageTitle: string) => {
    if (!confirm(`Êtes-vous sûr de vouloir supprimer la page "${pageTitle}" ?`)) {
      return;
    }

    try {
      const response = await fetch(`/api/pages/${pageId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Recharger la liste des pages
        setPages(prevPages => prevPages.filter(page => page.id !== pageId));
        alert('Page supprimée avec succès');
      } else {
        throw new Error('Erreur lors de la suppression');
      }
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
      alert('Erreur lors de la suppression de la page');
    }
  };

  const handleRefreshPages = () => {
    // Recharger les pages
    const loadPages = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/pages');
        
        if (response.ok) {
          const apiPages = await response.json();
          const transformedPages: Page[] = apiPages.map((page: any) => ({
            id: page.id,
            slug: page.slug,
            title: page.title,
            status: page.status || 'DRAFT',
            createdAt: page.createdAt,
            updatedAt: page.updatedAt,
            author: {
              name: 'Admin',
              email: 'admin@example.com'
            }
          }));
          setPages(transformedPages);
        }
      } catch (error) {
        console.error('Erreur lors du rechargement:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPages();
  };

  const handleSeedPages = async () => {
    if (!confirm('Créer des pages d\'exemple ? Cela remplacera les pages existantes.')) {
      return;
    }

    try {
      const response = await fetch('/api/pages/seed', {
        method: 'POST',
      });

      if (response.ok) {
        const result = await response.json();
        alert(`✅ ${result.message}`);
        // Recharger la liste
        handleRefreshPages();
      } else {
        throw new Error('Erreur lors de la création des pages');
      }
    } catch (error) {
      console.error('Erreur lors de la création des pages:', error);
      alert('❌ Erreur lors de la création des pages d\'exemple');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des pages...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestion des Pages</h1>
            <p className="text-gray-600 mt-1">
              Gérez et organisez toutes les pages de votre site
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Boutons de vue */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                📋 Liste
              </button>
              <button
                onClick={() => setViewMode('hierarchy')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'hierarchy'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🌳 Arborescence
              </button>
            </div>
            
            <button
              onClick={handleRefreshPages}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
              title="Actualiser la liste"
            >
              🔄 Actualiser
            </button>
            
            {/* Contrôles Undo/Redo */}
            <div className="flex items-center space-x-1">
              <button
                onClick={handleUndoPages}
                disabled={!canUndo}
                className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 py-2 rounded-md"
                title="Annuler (Ctrl+Z)"
              >
                ↶ Annuler
              </button>
              <button
                onClick={handleRedoPages}
                disabled={!canRedo}
                className="bg-gray-500 hover:bg-gray-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 py-2 rounded-md"
                title="Rétablir (Ctrl+Shift+Z)"
              >
                ↷ Rétablir
              </button>
            </div>
            
            <button
              onClick={handleSeedPages}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              title="Créer des pages d'exemple"
            >
              🌱 Pages d'exemple
            </button>
            
            <Link href="/admin/studio">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                ➕ Nouvelle Page
              </button>
            </Link>
          </div>
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <div className="text-yellow-600 mr-3">⚠️</div>
              <div>
                <p className="text-yellow-800 font-medium">Attention</p>
                <p className="text-yellow-700 text-sm">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Filtres et recherche */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Recherche */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Rechercher une page..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filtre par statut */}
            <div className="flex items-center space-x-4">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">Tous les statuts</option>
                <option value="PUBLISHED">Publié</option>
                <option value="DRAFT">Brouillon</option>
                <option value="REVIEW">En révision</option>
                <option value="SCHEDULED">Programmé</option>
                <option value="ARCHIVED">Archivé</option>
              </select>
            </div>
          </div>
        </div>

        {/* Contenu principal */}
        <div className="grid gap-6">
          {viewMode === 'hierarchy' ? (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="text-center py-8">
                <div className="text-4xl mb-4">🌳</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Vue Arborescence
                </h3>
                <p className="text-gray-600">
                  Cette fonctionnalité sera bientôt disponible
                </p>
              </div>
            </div>
          ) : (
            /* Vue liste */
            <>
              {filteredPages.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <div className="text-center py-12">
                    <div className="text-4xl mb-4">📄</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      {searchTerm || statusFilter !== 'all' ? 'Aucune page trouvée' : 'Aucune page créée'}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {searchTerm || statusFilter !== 'all' 
                        ? 'Essayez de modifier vos critères de recherche.' 
                        : 'Commencez par créer votre première page.'
                      }
                    </p>
                    {(!searchTerm && statusFilter === 'all') && (
                      <Link href="/admin/studio">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
                          ➕ Créer une page
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              ) : (
                filteredPages.map((page) => (
                  <div key={page.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {page.title}
                          </h3>
                          {getStatusBadge(page.status)}
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                          <div className="flex items-center">
                            👤 {page.author.name}
                          </div>
                          <div className="flex items-center">
                            📅 Modifié le {new Date(page.updatedAt).toLocaleDateString('fr-FR')}
                          </div>
                          <div className="flex items-center">
                            📄 /{page.slug}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Link href={`/admin/studio/${page.slug}`}>
                          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
                            ✏️ Éditer
                          </button>
                        </Link>
                        
                        <Link href={`/${page.slug}`} target="_blank">
                          <button className="px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">
                            👁️ Voir
                          </button>
                        </Link>
                        
                        <button 
                          onClick={() => handleDeletePage(page.id, page.title)}
                          className="px-3 py-1 border border-red-300 rounded-md text-red-600 hover:bg-red-50"
                          title="Supprimer la page"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>

        {/* Statistiques */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                📄
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{pages.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                ✅
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Publiées</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pages.filter(p => p.status === 'PUBLISHED').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                📝
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Brouillons</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pages.filter(p => p.status === 'DRAFT').length}
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center">
              <div className="p-2 bg-gray-100 rounded-lg">
                📅
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Programmées</p>
                <p className="text-2xl font-bold text-gray-900">
                  {pages.filter(p => p.status === 'SCHEDULED').length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}