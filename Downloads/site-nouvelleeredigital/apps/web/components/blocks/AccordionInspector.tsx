// components/blocks/AccordionInspector.tsx
import React, { useState } from 'react';
import { TextControl } from '@/components/studio/PropertyControls/TextControl';
import { SelectControl } from '@/components/studio/PropertyControls/SelectControl';
import { CheckboxControl } from '@/components/studio/PropertyControls/CheckboxControl';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit, ChevronDown, ChevronUp } from 'lucide-react';
import { BlockRenderer } from './BlockRenderer';

interface Block {
  id: string;
  type: string;
  data: any;
}

interface AccordionSection {
  id: string;
  title: string;
  content: Block[];
  openByDefault?: boolean;
}

interface AccordionBlockData {
  sections: AccordionSection[];
  allowMultiple?: boolean;
  title?: string;
  description?: string;
  style?: 'default' | 'bordered' | 'minimal';
}

interface AccordionInspectorProps {
  data: AccordionBlockData;
  onUpdate: (data: AccordionBlockData) => void;
}

export function AccordionInspector({ data, onUpdate }: AccordionInspectorProps) {
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [newSectionTitle, setNewSectionTitle] = useState('');

  const handleChange = (field: keyof AccordionBlockData, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  const addSection = () => {
    if (!newSectionTitle.trim()) return;

    const newSection: AccordionSection = {
      id: `section-${Date.now()}`,
      title: newSectionTitle,
      content: [],
      openByDefault: false,
    };

    onUpdate({
      ...data,
      sections: [...(data.sections || []), newSection],
    });

    setNewSectionTitle('');
  };

  const removeSection = (sectionId: string) => {
    const updatedSections = data.sections?.filter(section => section.id !== sectionId) || [];
    onUpdate({ ...data, sections: updatedSections });
  };

  const updateSection = (sectionId: string, updates: Partial<AccordionSection>) => {
    const updatedSections = data.sections?.map(section =>
      section.id === sectionId ? { ...section, ...updates } : section
    ) || [];

    onUpdate({ ...data, sections: updatedSections });
  };

  const moveSection = (sectionId: string, direction: 'up' | 'down') => {
    const sections = data.sections || [];
    const currentIndex = sections.findIndex(s => s.id === sectionId);

    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === sections.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const newSections = [...sections];
    [newSections[currentIndex], newSections[newIndex]] = [newSections[newIndex], newSections[currentIndex]];

    onUpdate({ ...data, sections: newSections });
  };

  const addBlockToSection = (sectionId: string, block: Block) => {
    const updatedSections = data.sections?.map(section =>
      section.id === sectionId
        ? { ...section, content: [...(section.content || []), block] }
        : section
    ) || [];

    onUpdate({ ...data, sections: updatedSections });
  };

  const removeBlockFromSection = (sectionId: string, blockId: string) => {
    const updatedSections = data.sections?.map(section =>
      section.id === sectionId
        ? { ...section, content: section.content?.filter(block => block.id !== blockId) || [] }
        : section
    ) || [];

    onUpdate({ ...data, sections: updatedSections });
  };

  return (
    <div className="space-y-6">
      {/* Titre général */}
      <TextControl
        name="title"
        label="Titre de l'accordéon"
        value={data.title || ''}
        onChange={(value) => handleChange('title', value)}
        placeholder="Titre du bloc d'accordéon..."
      />

      {/* Description générale */}
      <TextControl
        name="description"
        label="Description"
        value={data.description || ''}
        onChange={(value) => handleChange('description', value)}
        placeholder="Description du bloc d'accordéon..."
      />

      {/* Options de style */}
      <SelectControl
        name="style"
        label="Style d'affichage"
        value={data.style || 'default'}
        onChange={(value) => handleChange('style', value as any)}
        options={[
          { label: 'Défaut (encadré)', value: 'default' },
          { label: 'Bordures simples', value: 'bordered' },
          { label: 'Minimaliste', value: 'minimal' },
        ]}
      />

      {/* Options de comportement */}
      <CheckboxControl
        name="allowMultiple"
        label="Permettre l'ouverture de plusieurs sections"
        checked={data.allowMultiple || false}
        onChange={(checked) => handleChange('allowMultiple', checked)}
      />

      {/* Gestion des sections */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-muted-foreground">Sections</h4>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              placeholder="Titre de la nouvelle section"
              className="px-3 py-1 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Button onClick={addSection} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {data.sections?.map((section, index) => (
            <div key={section.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Section {index + 1}: {section.title}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      onClick={() => moveSection(section.id, 'up')}
                      size="sm"
                      variant="outline"
                      disabled={index === 0}
                    >
                      <ChevronUp className="w-3 h-3" />
                    </Button>
                    <Button
                      onClick={() => moveSection(section.id, 'down')}
                      size="sm"
                      variant="outline"
                      disabled={index === (data.sections?.length || 0) - 1}
                    >
                      <ChevronDown className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <CheckboxControl
                    name={`section-open-${section.id}`}
                    label="Ouvert par défaut"
                    checked={section.openByDefault || false}
                    onChange={(checked) => updateSection(section.id, { openByDefault: checked })}
                  />
                  <Button
                    onClick={() => setEditingSection(section.id)}
                    size="sm"
                    variant="outline"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => removeSection(section.id)}
                    size="sm"
                    variant="outline"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Édition du titre */}
              {editingSection === section.id && (
                <div className="mb-3">
                  <TextControl
                    name={`section-title-${section.id}`}
                    label="Titre de la section"
                    value={section.title}
                    onChange={(value) => updateSection(section.id, { title: value })}
                  />
                  <Button
                    onClick={() => setEditingSection(null)}
                    size="sm"
                    variant="outline"
                  >
                    Terminer l'édition
                  </Button>
                </div>
              )}

              {/* Contenu de la section */}
              <div className="mt-3">
                <h5 className="text-xs font-medium text-muted-foreground mb-2">
                  Contenu de la section ({section.content?.length || 0} blocs)
                </h5>
                <div className="bg-muted p-3 rounded border">
                  {section.content && section.content.length > 0 ? (
                    <BlockRenderer blocks={section.content} />
                  ) : (
                    <p className="text-sm text-muted-foreground0 text-center py-4">
                      Aucun contenu dans cette section
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {(!data.sections || data.sections.length === 0) && (
          <p className="text-sm text-muted-foreground0 text-center py-4">
            Aucune section configurée. Ajoutez-en une pour commencer.
          </p>
        )}
      </div>
    </div>
  );
}
