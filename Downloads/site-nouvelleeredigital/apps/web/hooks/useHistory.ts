import { useEffect } from 'react';
import { useHistoryStore } from '@/stores/historyStore';
import { useEditorStore } from '@/stores/editorStore';

export function useHistory() {
  const { recordState, undo, redo, canUndo, canRedo } = useHistoryStore();
  const { page, setBlocks } = useEditorStore();

  // Enregistrer l'état actuel dans l'historique quand les blocs changent
  useEffect(() => {
    if (page?.blocks) {
      recordState(page.blocks);
    }
  }, [page?.blocks, recordState]);

  // Gérer les raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Z ou Cmd+Z pour Undo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        const previousBlocks = undo();
        if (previousBlocks) {
          setBlocks(previousBlocks);
        }
      }
      
      // Ctrl+Shift+Z ou Cmd+Shift+Z pour Redo
      if ((e.ctrlKey || e.metaKey) && e.key === 'z' && e.shiftKey) {
        e.preventDefault();
        const nextBlocks = redo();
        if (nextBlocks) {
          setBlocks(nextBlocks);
        }
      }
      
      // Ctrl+Y ou Cmd+Y pour Redo (alternative)
      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        const nextBlocks = redo();
        if (nextBlocks) {
          setBlocks(nextBlocks);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, setBlocks]);

  return {
    undo: () => {
      const previousBlocks = undo();
      if (previousBlocks) {
        setBlocks(previousBlocks);
      }
    },
    redo: () => {
      const nextBlocks = redo();
      if (nextBlocks) {
        setBlocks(nextBlocks);
      }
    },
    canUndo: canUndo(),
    canRedo: canRedo(),
  };
}
