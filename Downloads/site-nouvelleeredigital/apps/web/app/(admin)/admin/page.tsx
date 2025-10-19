'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Eye, Trash2, LogOut, Settings } from 'lucide-react';
import { toast } from 'sonner';

interface Page {
  id: string;
  slug: string;
  title: string;
  status: 'DRAFT' | 'REVIEW' | 'SCHEDULED' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      setLoading(true);
      // Pour l'instant, on simule des données
      // Dans un vrai projet, vous feriez un appel à /api/pages
      const mockPages: Page[] = [
        {
          id: '1',
          slug: 'accueil',
          title: 'Page d\'accueil',
          status: 'PUBLISHED',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: '2024-01-15T10:30:00Z',
        },
        {
          id: '2',
          slug: 'a-propos',
          title: 'À propos',
          status: 'DRAFT',
          createdAt: '2024-01-05T00:00:00Z',
          updatedAt: '2024-01-10T14:20:00Z',
        },
        {
          id: '3',
          slug: 'contact',
          title: 'Contact',
          status: 'PUBLISHED',
          createdAt: '2024-01-08T00:00:00Z',
          updatedAt: '2024-01-12T09:15:00Z',
        },
      ];
      
      setPages(mockPages);
    } catch (error) {
      console.error('Erreur lors du chargement des pages:', error);
      toast.error('Erreur lors du chargement des pages');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/login', {
        method: 'DELETE',
      });
      toast.success('Déconnexion réussie');
      router.push('/login');
    } catch (error) {
      console.error('Erreur de déconnexion:', error);
      toast.error('Erreur de déconnexion');
    }
  };

  const getStatusColor = (status: Page['status']) => {
    switch (status) {
      case 'PUBLISHED':
        return 'bg-green-100 text-green-800';
      case 'DRAFT':
        return 'bg-yellow-100 text-yellow-800';
      case 'REVIEW':
        return 'bg-blue-100 text-blue-800';
      case 'SCHEDULED':
        return 'bg-purple-100 text-purple-800';
      case 'ARCHIVED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: Page['status']) => {
    switch (status) {
      case 'PUBLISHED':
        return 'Publié';
      case 'DRAFT':
        return 'Brouillon';
      case 'REVIEW':
        return 'En révision';
      case 'SCHEDULED':
        return 'Programmé';
      case 'ARCHIVED':
        return 'Archivé';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Administration
              </h1>
              <p className="text-sm text-gray-500">
                Gestion des pages et du contenu
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle page
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="text-red-600 hover:text-red-700"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Cards de navigation rapide */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link href="/admin/studio/accueil">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                🎨 Éditeur Visuel
              </h3>
              <p className="text-gray-600 mb-4">Créez et modifiez vos pages avec l'éditeur visuel</p>
              <div className="text-blue-600 font-medium">Accéder au Studio →</div>
            </div>
          </Link>

          <Link href="/admin/services">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-lg font-semibold mb-2 flex items-center">
                ⚙️ Services
              </h3>
              <p className="text-gray-600 mb-4">Gérez vos services et offres</p>
              <div className="text-blue-600 font-medium">Gérer les services →</div>
            </div>
          </Link>
        </div>

        {/* Liste des pages */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Pages ({pages.length})
            </h2>
          </div>

          {pages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Aucune page trouvée</p>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Créer votre première page
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Page
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dernière modification
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {pages.map((page) => (
                    <tr key={page.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {page.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            /{page.slug}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(page.status)}`}
                        >
                          {getStatusLabel(page.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(page.updatedAt).toLocaleDateString('fr-FR', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Link href={`/admin/studio/${page.slug}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Éditer
                            </Button>
                          </Link>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-green-600 hover:text-green-900"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Voir
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}