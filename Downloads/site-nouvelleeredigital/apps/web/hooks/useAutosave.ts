import { useEffect, useRef } from 'react';
import { useEditorStore } from '@/stores/editorStore';

interface UseAutosaveOptions {
  onSave: (blocks: any[], title: string) => Promise<void>;
  delay?: number; // Délai en millisecondes (défaut: 2000ms)
}

export function useAutosave({ onSave, delay = 2000 }: UseAutosaveOptions) {
  const { page, hasUnsavedChanges, markAsSaving, markAsSaved } = useEditorStore();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isSavingRef = useRef(false);

  useEffect(() => {
    // Nettoyer le timeout précédent
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Si pas de changements ou déjà en train de sauvegarder, ne rien faire
    if (!hasUnsavedChanges || isSavingRef.current || !page) {
      return;
    }

    // Programmer la sauvegarde après le délai
    timeoutRef.current = setTimeout(async () => {
      try {
        isSavingRef.current = true;
        markAsSaving();
        
        await onSave(page.blocks, page.title);
        
        markAsSaved();
      } catch (error) {
        console.error('Erreur lors de la sauvegarde automatique:', error);
      } finally {
        isSavingRef.current = false;
      }
    }, delay);

    // Cleanup
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [hasUnsavedChanges, page, onSave, delay, markAsSaving, markAsSaved]);

  // Sauvegarder avant de quitter la page
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);
}
