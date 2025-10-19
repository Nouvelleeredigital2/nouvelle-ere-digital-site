// components/blocks/TabsInspector.tsx
import React, { useState } from 'react';
import { TextControl } from '@/components/studio/PropertyControls/TextControl';
import { SelectControl } from '@/components/studio/PropertyControls/SelectControl';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit } from 'lucide-react';
import { BlockRenderer } from './BlockRenderer';

interface Block {
  id: string;
  type: string;
  data: any;
}

interface TabsBlockData {
  tabs: Array<{
    id: string;
    title: string;
    content: Block[];
    icon?: string;
  }>;
  defaultTab?: string;
  orientation?: 'horizontal' | 'vertical';
  tabStyle?: 'default' | 'pills' | 'underline';
  title?: string;
  description?: string;
}

interface TabsInspectorProps {
  data: TabsBlockData;
  onUpdate: (data: TabsBlockData) => void;
}

export function TabsInspector({ data, onUpdate }: TabsInspectorProps) {
  const [editingTab, setEditingTab] = useState<string | null>(null);
  const [newTabTitle, setNewTabTitle] = useState('');

  const handleChange = (field: keyof TabsBlockData, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  const addTab = () => {
    if (!newTabTitle.trim()) return;

    const newTab = {
      id: `tab-${Date.now()}`,
      title: newTabTitle,
      content: [],
      icon: '',
    };

    onUpdate({
      ...data,
      tabs: [...(data.tabs || []), newTab],
    });

    setNewTabTitle('');
  };

  const removeTab = (tabId: string) => {
    const updatedTabs = data.tabs?.filter(tab => tab.id !== tabId) || [];
    onUpdate({ ...data, tabs: updatedTabs });
  };

  const updateTab = (tabId: string, updates: any) => {
    const updatedTabs = data.tabs?.map(tab =>
      tab.id === tabId ? { ...tab, ...updates } : tab
    ) || [];

    onUpdate({ ...data, tabs: updatedTabs });
  };

  const addBlockToTab = (tabId: string, block: Block) => {
    const updatedTabs = data.tabs?.map(tab =>
      tab.id === tabId
        ? { ...tab, content: [...(tab.content || []), block] }
        : tab
    ) || [];

    onUpdate({ ...data, tabs: updatedTabs });
  };

  const removeBlockFromTab = (tabId: string, blockId: string) => {
    const updatedTabs = data.tabs?.map(tab =>
      tab.id === tabId
        ? { ...tab, content: tab.content?.filter(block => block.id !== blockId) || [] }
        : tab
    ) || [];

    onUpdate({ ...data, tabs: updatedTabs });
  };

  return (
    <div className="space-y-6">
      {/* Titre général */}
      <TextControl
        name="title"
        label="Titre du bloc d'onglets"
        value={data.title || ''}
        onChange={(value) => handleChange('title', value)}
        placeholder="Titre du bloc d'onglets..."
      />

      {/* Description générale */}
      <TextControl
        name="description"
        label="Description"
        value={data.description || ''}
        onChange={(value) => handleChange('description', value)}
        placeholder="Description du bloc d'onglets..."
      />

      {/* Orientation */}
      <SelectControl
        name="orientation"
        label="Orientation"
        value={data.orientation || 'horizontal'}
        onChange={(value) => handleChange('orientation', value as any)}
        options={[
          { label: 'Horizontale', value: 'horizontal' },
          { label: 'Verticale', value: 'vertical' },
        ]}
      />

      {/* Style des onglets */}
      <SelectControl
        name="tabStyle"
        label="Style des onglets"
        value={data.tabStyle || 'default'}
        onChange={(value) => handleChange('tabStyle', value as any)}
        options={[
          { label: 'Défaut', value: 'default' },
          { label: 'Onglet actif', value: 'underline' },
          { label: 'Pastilles', value: 'pills' },
        ]}
      />

      {/* Onglet par défaut */}
      <SelectControl
        name="defaultTab"
        label="Onglet actif par défaut"
        value={data.defaultTab || ''}
        onChange={(value) => handleChange('defaultTab', value)}
        options={[
          { label: 'Premier onglet', value: '' },
          ...(data.tabs?.map(tab => ({ label: tab.title, value: tab.id })) || []),
        ]}
      />

      {/* Gestion des onglets */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-muted-foreground">Onglets</h4>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newTabTitle}
              onChange={(e) => setNewTabTitle(e.target.value)}
              placeholder="Titre du nouvel onglet"
              className="px-3 py-1 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Button onClick={addTab} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {data.tabs?.map((tab, index) => (
            <div key={tab.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Onglet {index + 1}: {tab.title}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setEditingTab(tab.id)}
                    size="sm"
                    variant="outline"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => removeTab(tab.id)}
                    size="sm"
                    variant="outline"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Édition du titre et icône */}
              {editingTab === tab.id && (
                <div className="mb-3 space-y-2">
                  <TextControl
                    name={`tab-title-${tab.id}`}
                    label="Titre de l'onglet"
                    value={tab.title}
                    onChange={(value) => updateTab(tab.id, { title: value })}
                  />
                  <TextControl
                    name={`tab-icon-${tab.id}`}
                    label="Icône (optionnel)"
                    value={tab.icon || ''}
                    onChange={(value) => updateTab(tab.id, { icon: value })}
                    placeholder="🚀, 📋, etc."
                  />
                  <Button
                    onClick={() => setEditingTab(null)}
                    size="sm"
                    variant="outline"
                  >
                    Terminer l'édition
                  </Button>
                </div>
              )}

              {/* Contenu de l'onglet */}
              <div className="mt-3">
                <h5 className="text-xs font-medium text-muted-foreground mb-2">
                  Contenu de l'onglet ({tab.content?.length || 0} blocs)
                </h5>
                <div className="bg-muted p-3 rounded border">
                  {tab.content && tab.content.length > 0 ? (
                    <BlockRenderer blocks={tab.content} />
                  ) : (
                    <p className="text-sm text-muted-foreground0 text-center py-4">
                      Aucun contenu dans cet onglet
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {(!data.tabs || data.tabs.length === 0) && (
          <p className="text-sm text-muted-foreground0 text-center py-4">
            Aucun onglet configuré. Ajoutez-en un pour commencer.
          </p>
        )}
      </div>
    </div>
  );
}
