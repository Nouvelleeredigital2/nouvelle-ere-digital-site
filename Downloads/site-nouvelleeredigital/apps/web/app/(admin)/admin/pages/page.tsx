'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
  Plus, 
  Edit3, 
  Eye, 
  Trash2, 
  Search,
  Filter,
  Calendar,
  User,
  FileText,
  TreePine,
  List
} from 'lucide-react';
import { PageHierarchy } from '@/components/admin/PageHierarchy';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'hierarchy'>('list');

  useEffect(() => {
    const loadPages = async () => {
      try {
        setLoading(true);
        // TODO: Remplacer par un vrai appel API
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
          },
          {
            id: '3',
            slug: 'services',
            title: 'Nos services',
            status: 'PUBLISHED',
            createdAt: '2024-01-17T11:00:00Z',
            updatedAt: '2024-01-19T13:20:00Z',
            author: { name: 'Admin', email: 'admin@example.com' }
          }
        ];
        
        setPages(mockPages);
      } catch (error) {
        console.error('Erreur lors du chargement des pages:', error);
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
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || page.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
                <List className="w-4 h-4 mr-2" />
                Liste
              </button>
              <button
                onClick={() => setViewMode('hierarchy')}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === 'hierarchy'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <TreePine className="w-4 h-4 mr-2" />
                Arborescence
              </button>
            </div>
            
            <Link href="/admin/studio">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Page
              </Button>
            </Link>
          </div>
        </div>

        {/* Filtres et recherche */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Recherche */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
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
              <Filter className="w-5 h-5 text-gray-400" />
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
            <Card>
              <CardContent className="p-6">
                <PageHierarchy 
                  onPageSelect={(page) => {
                    console.log('Page sélectionnée:', page);
                  }}
                />
              </CardContent>
            </Card>
          ) : (
            /* Vue liste */
            <>
              {filteredPages.length === 0 ? (
                <Card>
                  <CardContent className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
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
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          <Plus className="w-4 h-4 mr-2" />
                          Créer une page
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ) : (
                filteredPages.map((page) => (
                  <Card key={page.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
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
                              <User className="w-4 h-4 mr-1" />
                              {page.author.name}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              Modifié le {new Date(page.updatedAt).toLocaleDateString('fr-FR')}
                            </div>
                            <div className="flex items-center">
                              <FileText className="w-4 h-4 mr-1" />
                              /{page.slug}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Link href={`/admin/studio/${page.slug}`}>
                            <Button variant="outline" size="sm">
                              <Edit3 className="w-4 h-4 mr-1" />
                              Éditer
                            </Button>
                          </Link>
                          
                          <Link href={`/${page.slug}`} target="_blank">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-1" />
                              Voir
                            </Button>
                          </Link>
                          
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </>
          )}
        </div>

        {/* Statistiques */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total</p>
                  <p className="text-2xl font-bold text-gray-900">{pages.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Publiées</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {pages.filter(p => p.status === 'PUBLISHED').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Edit3 className="w-6 h-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Brouillons</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {pages.filter(p => p.status === 'DRAFT').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-gray-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Programmées</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {pages.filter(p => p.status === 'SCHEDULED').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
