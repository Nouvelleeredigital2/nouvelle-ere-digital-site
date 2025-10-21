'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useEditorStore } from '@/stores/editorStore';
import { useHistory } from '@/hooks/useHistory';
import { Button } from '@/components/ui/Button';
import { Canvas } from '@/components/studio/Canvas';
import { Inspector } from '@/components/studio/Inspector/Inspector';
import { BlockPalette } from '@/components/studio/BlockPalette/BlockPalette';
import { SaveIndicator } from '@/components/studio/SaveIndicator';
import { SEOPanel } from '@/components/studio/SEOPanel';
import { ToastProvider } from '@/components/studio/ToastProvider';
import { LoadingButton } from '@/components/ui/LoadingStates';
import { toast } from 'sonner';
import { Undo2, Redo2, Save } from 'lucide-react';

export default function StudioPage() {
  const params = useParams();
  const slug = (params?.['slug'] as string) || '';
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  
  const {
    page,
    hasUnsavedChanges,
    setPage,
    markAsSaving,
    markAsSaved,
  } = useEditorStore();

  const { undo, redo, canUndo, canRedo } = useHistory();

  // Charger la page au montage
  useEffect(() => {
    const loadPage = async () => {
      if (!slug) return;
      
      try {
        setIsLoading(true);
        const response = await fetch(`/api/pages/${slug}`);
        
        if (!response.ok) {
          throw new Error('Page non trouvée');
        }
        
        const pageData = await response.json();
        
        // Adapter les données pour le store
        const adaptedPage = {
          id: pageData.id,
          slug: pageData.slug,
          title: pageData.title,
          status: pageData.status,
          blocks: Array.isArray(pageData.content) ? pageData.content : [],
        };
        
        setPage(adaptedPage);
      } catch (error) {
        console.error('Erreur lors du chargement de la page:', error);
        toast.error('Erreur lors du chargement de la page');
      } finally {
        setIsLoading(false);
      }
    };

    loadPage();
  }, [slug, setPage]);

  // Fonction de sauvegarde
  const handleSave = async () => {
    if (!page || !hasUnsavedChanges) return;
    
    setIsSaving(true);
    markAsSaving();
    toast.loading('Sauvegarde en cours...');

    try {
      const response = await fetch(`/api/pages/${slug}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: page.blocks,
          title: page.title,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Échec de la sauvegarde');
      }

      await response.json();
      markAsSaved();
      toast.success('Page sauvegardée avec succès !');
      
    } catch (error) {
      console.error('Erreur de sauvegarde:', error);
      toast.error((error as Error).message || 'Une erreur est survenue');
    } finally {
      setIsSaving(false);
    }
  };

  // Sauvegarde automatique (optionnelle)
  useEffect(() => {
    if (!hasUnsavedChanges) return;
    
    const timeoutId = setTimeout(() => {
      handleSave();
    }, 30000); // Sauvegarde automatique après 30 secondes d'inactivité

    return () => clearTimeout(timeoutId);
  }, [hasUnsavedChanges]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement de la page...</p>
        </div>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Page non trouvée</h1>
          <p className="text-gray-600">La page "{slug}" n'existe pas.</p>
        </div>
      </div>
    );
  }

  return (
    <ToastProvider>
      <div className="h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">
              Studio d'édition
            </h1>
            <span className="text-sm text-gray-500">/ {page.title}</span>
          </div>
          
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={undo}
                        disabled={!canUndo}
                        title="Annuler (Ctrl+Z)"
                      >
                        <Undo2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={redo}
                        disabled={!canRedo}
                        title="Rétablir (Ctrl+Shift+Z)"
                      >
                        <Redo2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <SaveIndicator 
                      isSaving={isSaving}
                      hasUnsavedChanges={hasUnsavedChanges}
                      lastSaved={new Date()}
                    />
                    <LoadingButton
                      loading={isSaving}
                      onClick={handleSave}
                      disabled={!hasUnsavedChanges}
                      icon={<Save className="w-4 h-4" />}
                      loadingText="Sauvegarde..."
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      Sauvegarder
                    </LoadingButton>
                  </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Sidebar gauche - Palette de blocs */}
          <aside className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
            <BlockPalette onClose={() => {}} />
          </aside>

          {/* Zone centrale - Canvas */}
          <main className="flex-1 overflow-y-auto bg-gray-100">
            <div className="p-6">
              <Canvas />
            </div>
          </main>

          {/* Sidebar droite - Inspector */}
          <aside className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
            <Inspector />
          </aside>
        </div>

        {/* Panel SEO (optionnel, peut être dans un modal) */}
        <SEOPanel 
          data={{
            title: page?.title || '',
            description: '',
            keywords: '',
            ogImage: '',
            ogTitle: '',
            ogDescription: ''
          }}
          onUpdate={() => {}}
        />
      </div>
    </ToastProvider>
  );
}
