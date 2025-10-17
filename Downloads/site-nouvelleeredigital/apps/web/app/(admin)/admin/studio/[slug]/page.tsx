'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useEditorStore } from '@/stores/editorStore';
import { useAutosave } from '@/hooks/useAutosave';
import { useHistory } from '@/hooks/useHistory';
import { Canvas } from '@/components/studio/Canvas';
import { Inspector } from '@/components/studio/Inspector/Inspector';
import { Save, Eye, Settings, ArrowLeft, Clock, Undo2, Redo2 } from 'lucide-react';

export default function StudioPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  
  const {
    page,
    setPage,
    setTitle,
    isSaving,
    lastSaved,
    hasUnsavedChanges,
  } = useEditorStore();
  
  const [loading, setLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  
  // Undo/Redo
  const { undo, redo, canUndo, canRedo } = useHistory();

  // Charger la page au montage
  useEffect(() => {
    loadPage();
  }, [slug]);

  const loadPage = async () => {
    try {
      const response = await fetch(`/api/pages/${slug}`);
      if (response.ok) {
        const data = await response.json();
        const layout = typeof data.layout === 'string' ? JSON.parse(data.layout) : data.layout;
        setPage({
          id: data.id,
          slug: data.slug,
          title: data.title,
          status: data.status,
          blocks: layout.blocks || [],
        });
      } else if (response.status === 404) {
        // Page n'existe pas, créons-en une nouvelle
        setPage({
          id: '',
          slug,
          title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
          status: 'DRAFT',
          blocks: [],
        });
      }
    } catch (error) {
      console.error('Erreur lors du chargement de la page:', error);
    } finally {
      setLoading(false);
    }
  };

  // Sauvegarde manuelle
  const handleManualSave = async () => {
    if (!page) return;
    await saveToAPI(page.blocks, page.title);
  };

  // Fonction de sauvegarde appelée par l'autosave
  const saveToAPI = async (blocks: any[], title: string) => {
    if (!page) return;

    try {
      const response = await fetch('/api/pages', {
        method: page.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: page.id || undefined,
          slug,
          title,
          layout: JSON.stringify({ blocks }),
          status: page.status,
        }),
      });

      if (response.ok) {
        const saved = await response.json();
        // Mettre à jour l'ID si c'était une nouvelle page
        if (!page.id) {
          setPage({ ...page, id: saved.id });
        }
      } else {
        throw new Error('Erreur lors de la sauvegarde');
      }
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      throw error;
    }
  };

  // Activer l'autosave
  useAutosave({
    onSave: saveToAPI,
    delay: 2000, // 2 secondes après la dernière modification
  });

  // Formater la date de dernière sauvegarde
  const formatLastSaved = (date: Date | null) => {
    if (!date) return 'Jamais';
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 5) return 'À l\'instant';
    if (seconds < 60) return `Il y a ${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `Il y a ${minutes}min`;
    const hours = Math.floor(minutes / 60);
    return `Il y a ${hours}h`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <div className="text-lg text-gray-600">Chargement...</div>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-lg text-gray-600">Page introuvable</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => router.push('/admin')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Retour"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              
              <div>
                <input
                  type="text"
                  value={page.title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="text-xl font-bold text-gray-900 bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded px-2 py-1"
                  placeholder="Titre de la page"
                />
                <div className="flex items-center gap-2 text-xs text-gray-500 mt-1 px-2">
                  <Clock className="w-3 h-3" />
                  <span>
                    {isSaving ? (
                      <span className="text-indigo-600">Enregistrement...</span>
                    ) : hasUnsavedChanges ? (
                      <span className="text-orange-600">Modifications non enregistrées</span>
                    ) : (
                      <span>Enregistré {formatLastSaved(lastSaved)}</span>
                    )}
                  </span>
                </div>
              </div>

              <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                page.status === 'PUBLISHED'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {page.status}
              </span>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {/* Undo/Redo */}
              <div className="flex items-center gap-1 mr-2">
                <button
                  onClick={undo}
                  disabled={!canUndo}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Annuler (Ctrl+Z)"
                >
                  <Undo2 className="w-5 h-5 text-gray-600" />
                </button>
                <button
                  onClick={redo}
                  disabled={!canRedo}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  title="Rétablir (Ctrl+Shift+Z)"
                >
                  <Redo2 className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <button
                onClick={handleManualSave}
                disabled={isSaving}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {isSaving ? 'Enregistrement...' : 'Enregistrer'}
              </button>

              <button
                onClick={() => window.open(`/${slug}`, '_blank')}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Prévisualiser
              </button>

              <button
                onClick={() => setShowSettings(!showSettings)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas (zone principale) */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto py-8">
            <Canvas />
          </div>
        </main>

        {/* Inspecteur de propriétés (à droite) */}
        <Inspector />
      </div>
    </div>
  );
}
