import { create } from 'zustand';
import type { Block } from '@/lib/types/blocks';

interface HistoryState {
  past: Block[][];
  present: Block[];
  future: Block[][];
  
  // Actions
  recordState: (blocks: Block[]) => void;
  undo: () => Block[] | null;
  redo: () => Block[] | null;
  clear: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;
}

const MAX_HISTORY = 50; // Limite à 50 actions

export const useHistoryStore = create<HistoryState>((set, get) => ({
  past: [],
  present: [],
  future: [],
  
  recordState: (blocks) => set((state) => {
    // Ne rien faire si c'est le même état
    if (JSON.stringify(state.present) === JSON.stringify(blocks)) {
      return state;
    }
    
    const newPast = [...state.past, state.present].slice(-MAX_HISTORY);
    
    return {
      past: newPast,
      present: blocks,
      future: [], // Effacer le future quand on enregistre un nouvel état
    };
  }),
  
  undo: () => {
    const state = get();
    if (state.past.length === 0) return null;
    
    const previous = state.past[state.past.length - 1];
    const newPast = state.past.slice(0, -1);
    
    set({
      past: newPast,
      present: previous,
      future: [state.present, ...state.future],
    });
    
    return previous;
  },
  
  redo: () => {
    const state = get();
    if (state.future.length === 0) return null;
    
    const next = state.future[0];
    const newFuture = state.future.slice(1);
    
    set({
      past: [...state.past, state.present],
      present: next,
      future: newFuture,
    });
    
    return next;
  },
  
  clear: () => set({
    past: [],
    present: [],
    future: [],
  }),
  
  canUndo: () => get().past.length > 0,
  canRedo: () => get().future.length > 0,
}));
