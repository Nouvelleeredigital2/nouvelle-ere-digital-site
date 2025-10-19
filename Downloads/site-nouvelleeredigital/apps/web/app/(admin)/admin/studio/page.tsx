'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Page {
  id: string;
  slug: string;
  title: string;
  status: string;
  updatedAt: string;
}

export default function StudioPage() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newPageSlug, setNewPageSlug] = useState('');
  const [newPageTitle, setNewPageTitle] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/pages');
      
      if (!response.ok) {
        throw new Error('Erreur lors du chargement des pages');
      }
      
      const data = await response.json();
      setPages(data.pages || []);
    } catch (err) {
      console.error('Erreur:', err);
      setError(err instanceof Error ? err.message : 'Erreur inconnue');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePage = async () => {
    if (!newPageSlug.trim() || !newPageTitle.trim()) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    try {
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          slug: newPageSlug.trim(),
          title: newPageTitle.trim(),
          content: {
            blocks: []
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la création de la page');
      }

      // Rediriger vers l'éditeur de la nouvelle page
      router.push(`/admin/studio/${newPageSlug.trim()}`);
    } catch (err) {
      console.error('Erreur:', err);
      alert(err instanceof Error ? err.message : 'Erreur lors de la création');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'bg-green-100 text-green-800';
      case 'DRAFT':
        return 'bg-yellow-100 text-yellow-800';
      case 'ARCHIVED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'PUBLISHED':
        return 'Publié';
      case 'DRAFT':
        return 'Brouillon';
      case 'ARCHIVED':
        return 'Archivé';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement des pages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Erreur</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={loadPages}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🎨 Studio d'Édition
          </h1>
          <p className="text-gray-600">
            Gérez vos pages et créez du contenu avec l'éditeur visuel
          </p>
        </div>

        {/* Créer une nouvelle page */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            ➕ Créer une Nouvelle Page
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Slug de la page
              </label>
              <input
                type="text"
                value={newPageSlug}
                onChange={(e) => setNewPageSlug(e.target.value)}
                placeholder="ex: ma-nouvelle-page"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Titre de la page
              </label>
              <input
                type="text"
                value={newPageTitle}
                onChange={(e) => setNewPageTitle(e.target.value)}
                placeholder="ex: Ma Nouvelle Page"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleCreatePage}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
              >
                Créer et Éditer
              </button>
            </div>
          </div>
        </div>

        {/* Liste des pages existantes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              📄 Pages Existantes
            </h2>
          </div>
          
          {pages.length === 0 ? (
            <div className="p-8 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune page trouvée
              </h3>
              <p className="text-gray-600">
                Créez votre première page pour commencer à éditer.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {pages.map((page) => (
                <div key={page.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-lg font-medium text-gray-900">
                          {page.title}
                        </h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(page.status)}`}>
                          {getStatusText(page.status)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        Slug: <code className="bg-gray-100 px-1 rounded">{page.slug}</code>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Modifié le: {new Date(page.updatedAt).toLocaleDateString('fr-FR')}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Link
                        href={`/admin/studio/${page.slug}`}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                      >
                        ✏️ Éditer
                      </Link>
                      <Link
                        href={`/${page.slug}`}
                        target="_blank"
                        className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                      >
                        👁️ Voir
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions rapides */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href="/admin/pages"
            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium"
          >
            📋 Gestion des Pages
          </Link>
          <Link
            href="/admin"
            className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium"
          >
            🏠 Tableau de Bord
          </Link>
        </div>
      </div>
    </div>
  );
}
