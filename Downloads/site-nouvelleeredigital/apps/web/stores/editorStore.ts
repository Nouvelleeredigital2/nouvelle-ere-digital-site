import { create } from 'zustand';
import type { Block } from '@/lib/types/blocks';

interface PageData {
  id: string;
  slug: string;
  title: string;
  status: 'DRAFT' | 'PUBLISHED';
  blocks: Block[];
}

interface EditorState {
  // Page data
  page: PageData | null;
  originalBlocks: Block[]; // Pour détecter les changements
  
  // UI state
  selectedBlockId: string | null;
  isDragging: boolean;
  isSaving: boolean;
  lastSaved: Date | null;
  hasUnsavedChanges: boolean;
  
  // Actions - Page
  setPage: (page: PageData) => void;
  setBlocks: (blocks: Block[]) => void;
  setTitle: (title: string) => void;
  
  // Actions - Blocks
  addBlock: (block: Block, index?: number) => void;
  updateBlock: (blockId: string, data: Partial<Block['data']>) => void;
  deleteBlock: (blockId: string) => void;
  reorderBlocks: (fromIndex: number, toIndex: number) => void;
  duplicateBlock: (blockId: string) => void;
  
  // Actions - Selection
  selectBlock: (blockId: string | null) => void;
  
  // Actions - Save
  markAsSaving: () => void;
  markAsSaved: () => void;
  resetUnsavedChanges: () => void;
  
  // Actions - Drag
  setIsDragging: (isDragging: boolean) => void;
}

export const useEditorStore = create<EditorState>((set, get) => ({
  // Initial state
  page: null,
  originalBlocks: [],
  selectedBlockId: null,
  isDragging: false,
  isSaving: false,
  lastSaved: null,
  hasUnsavedChanges: false,
  
  // Page actions
  setPage: (page) => set({ 
    page, 
    originalBlocks: page.blocks,
    hasUnsavedChanges: false 
  }),
  
  setBlocks: (blocks) => set((state) => ({
    page: state.page ? { ...state.page, blocks } : null,
    hasUnsavedChanges: true,
  })),
  
  setTitle: (title) => set((state) => ({
    page: state.page ? { ...state.page, title } : null,
    hasUnsavedChanges: true,
  })),
  
  // Block actions
  addBlock: (block, index) => set((state) => {
    if (!state.page) return state;
    
    const blocks = [...state.page.blocks];
    if (index !== undefined) {
      blocks.splice(index, 0, block);
    } else {
      blocks.push(block);
    }
    
    return {
      page: { ...state.page, blocks },
      hasUnsavedChanges: true,
      selectedBlockId: block.id,
    };
  }),
  
  updateBlock: (blockId, data) => set((state) => {
    if (!state.page) return state;
    
    const blocks = state.page.blocks.map((block) =>
      block.id === blockId
        ? { ...block, data: { ...block.data, ...data } }
        : block
    );
    
    return {
      page: { ...state.page, blocks },
      hasUnsavedChanges: true,
    };
  }),
  
  deleteBlock: (blockId) => set((state) => {
    if (!state.page) return state;
    
    const blocks = state.page.blocks.filter((block) => block.id !== blockId);
    
    return {
      page: { ...state.page, blocks },
      hasUnsavedChanges: true,
      selectedBlockId: state.selectedBlockId === blockId ? null : state.selectedBlockId,
    };
  }),
  
  reorderBlocks: (fromIndex, toIndex) => set((state) => {
    if (!state.page) return state;
    
    const blocks = [...state.page.blocks];
    const [movedBlock] = blocks.splice(fromIndex, 1);
    blocks.splice(toIndex, 0, movedBlock);
    
    return {
      page: { ...state.page, blocks },
      hasUnsavedChanges: true,
    };
  }),
  
  duplicateBlock: (blockId) => set((state) => {
    if (!state.page) return state;
    
    const blockIndex = state.page.blocks.findIndex((b) => b.id === blockId);
    if (blockIndex === -1) return state;
    
    const originalBlock = state.page.blocks[blockIndex];
    const duplicatedBlock = {
      ...originalBlock,
      id: `${originalBlock.type}-${Date.now()}`,
    };
    
    const blocks = [...state.page.blocks];
    blocks.splice(blockIndex + 1, 0, duplicatedBlock);
    
    return {
      page: { ...state.page, blocks },
      hasUnsavedChanges: true,
      selectedBlockId: duplicatedBlock.id,
    };
  }),
  
  // Selection
  selectBlock: (blockId) => set({ selectedBlockId: blockId }),
  
  // Save state
  markAsSaving: () => set({ isSaving: true }),
  
  markAsSaved: () => set({ 
    isSaving: false, 
    lastSaved: new Date(),
    hasUnsavedChanges: false,
    originalBlocks: get().page?.blocks || [],
  }),
  
  resetUnsavedChanges: () => set({ hasUnsavedChanges: false }),
  
  // Drag state
  setIsDragging: (isDragging) => set({ isDragging }),
}));
