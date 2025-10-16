'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface PageData {
  id: string;
  slug: string;
  title: string;
  layout: any;
  status: string;
}

export default function StudioPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [pageData, setPageData] = useState<PageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [title, setTitle] = useState('');

  useEffect(() => {
    loadPage();
  }, [slug]);

  const loadPage = async () => {
    try {
      const response = await fetch(`/api/pages/${slug}`);
      if (response.ok) {
        const data = await response.json();
        setPageData(data);
        setTitle(data.title);
      } else if (response.status === 404) {
        // Page n'existe pas, créons-en une nouvelle
        setPageData({
          id: '',
          slug,
          title: slug.charAt(0).toUpperCase() + slug.slice(1),
          layout: JSON.stringify({ blocks: [] }),
          status: 'DRAFT',
        });
        setTitle(slug.charAt(0).toUpperCase() + slug.slice(1));
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la page:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!pageData) return;
    
    setSaving(true);
    try {
      const response = await fetch('/api/pages', {
        method: pageData.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: pageData.id || undefined,
          slug,
          title,
          layout: pageData.layout,
          status: pageData.status,
        }),
      });

      if (response.ok) {
        const saved = await response.json();
        setPageData(saved);
        alert('Page sauvegardée avec succès!');
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
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-gray-900">Studio - {slug}</h1>
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
              {pageData?.status || 'DRAFT'}
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Titre de la page
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="Titre de la page"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Structure de la page (JSON)
              </label>
              <textarea
                value={typeof pageData?.layout === 'string' ? pageData.layout : JSON.stringify(pageData?.layout, null, 2)}
                onChange={(e) => {
                  if (pageData) {
                    setPageData({ ...pageData, layout: e.target.value });
                  }
                }}
                rows={15}
                className="w-full px-4 py-2 border border-gray-300 rounded-md font-mono text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder='{"blocks": []}'
              />
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
              <h3 className="text-sm font-medium text-blue-900 mb-2">ℹ️ Information</h3>
              <p className="text-sm text-blue-700">
                Ceci est une version simplifiée de l&apos;éditeur. L&apos;interface visuelle complète avec glisser-déposer sera implémentée dans les prochaines étapes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
