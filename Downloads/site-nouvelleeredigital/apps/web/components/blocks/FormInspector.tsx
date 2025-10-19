// components/blocks/FormInspector.tsx
import React, { useState } from 'react';
import { TextControl } from '@/components/studio/PropertyControls/TextControl';
import { SelectControl } from '@/components/studio/PropertyControls/SelectControl';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, Edit, Settings } from 'lucide-react';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'number';
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[]; // Pour select et radio
  validation?: {
    min?: number;
    max?: number;
    pattern?: string;
  };
}

interface FormBlockData {
  title?: string;
  description?: string;
  fields: FormField[];
  submitText?: string;
  submitUrl?: string;
  method?: 'POST' | 'GET';
  successMessage?: string;
  errorMessage?: string;
}

interface FormInspectorProps {
  data: FormBlockData;
  onUpdate: (data: FormBlockData) => void;
}

export function FormInspector({ data, onUpdate }: FormInspectorProps) {
  const [editingField, setEditingField] = useState<string | null>(null);
  const [newFieldLabel, setNewFieldLabel] = useState('');
  const [newFieldType, setNewFieldType] = useState<FormField['type']>('text');
  const [newFieldOptions, setNewFieldOptions] = useState('');

  const handleChange = (field: keyof FormBlockData, value: any) => {
    onUpdate({ ...data, [field]: value });
  };

  const addField = () => {
    if (!newFieldLabel.trim()) return;

    const newField: FormField = {
      id: `field-${Date.now()}`,
      type: newFieldType,
      label: newFieldLabel,
      required: false,
      options: newFieldType === 'select' || newFieldType === 'radio' ? newFieldOptions.split(',').map(opt => opt.trim()).filter(opt => opt) : undefined,
    };

    onUpdate({
      ...data,
      fields: [...(data.fields || []), newField],
    });

    setNewFieldLabel('');
    setNewFieldOptions('');
  };

  const removeField = (fieldId: string) => {
    const updatedFields = data.fields?.filter(field => field.id !== fieldId) || [];
    onUpdate({ ...data, fields: updatedFields });
  };

  const updateField = (fieldId: string, updates: Partial<FormField>) => {
    const updatedFields = data.fields?.map(field =>
      field.id === fieldId ? { ...field, ...updates } : field
    ) || [];

    onUpdate({ ...data, fields: updatedFields });
  };

  const moveField = (fieldId: string, direction: 'up' | 'down') => {
    const fields = data.fields || [];
    const currentIndex = fields.findIndex(f => f.id === fieldId);

    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === fields.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const newFields = [...fields];
    [newFields[currentIndex], newFields[newIndex]] = [newFields[newIndex], newFields[currentIndex]];

    onUpdate({ ...data, fields: newFields });
  };

  return (
    <div className="space-y-6">
      {/* Titre général */}
      <TextControl
        name="title"
        label="Titre du formulaire"
        value={data.title || ''}
        onChange={(value) => handleChange('title', value)}
        placeholder="Titre du formulaire..."
      />

      {/* Description générale */}
      <TextControl
        name="description"
        label="Description"
        value={data.description || ''}
        onChange={(value) => handleChange('description', value)}
        placeholder="Description du formulaire..."
      />

      {/* Configuration générale */}
      <div className="grid grid-cols-2 gap-4">
        <TextControl
          name="submitText"
          label="Texte du bouton"
          value={data.submitText || ''}
          onChange={(value) => handleChange('submitText', value)}
          placeholder="Envoyer"
        />

        <SelectControl
          name="method"
          label="Méthode d'envoi"
          value={data.method || 'POST'}
          onChange={(value) => handleChange('method', value)}
          options={[
            { label: 'POST', value: 'POST' },
            { label: 'GET', value: 'GET' },
          ]}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <TextControl
          name="submitUrl"
          label="URL d'envoi (optionnel)"
          value={data.submitUrl || ''}
          onChange={(value) => handleChange('submitUrl', value)}
          placeholder="https://api.example.com/submit"
        />

        <TextControl
          name="successMessage"
          label="Message de succès"
          value={data.successMessage || ''}
          onChange={(value) => handleChange('successMessage', value)}
          placeholder="Merci ! Votre message a été envoyé."
        />
      </div>

      <TextControl
        name="errorMessage"
        label="Message d'erreur"
        value={data.errorMessage || ''}
        onChange={(value) => handleChange('errorMessage', value)}
        placeholder="Une erreur s'est produite. Veuillez réessayer."
      />

      {/* Gestion des champs */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-muted-foreground">Champs du formulaire</h4>
          <div className="flex items-center gap-2">
            <select
              value={newFieldType}
              onChange={(e) => setNewFieldType(e.target.value as FormField['type'])}
              className="px-3 py-1 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="text">Texte</option>
              <option value="email">Email</option>
              <option value="tel">Téléphone</option>
              <option value="number">Nombre</option>
              <option value="textarea">Zone de texte</option>
              <option value="select">Sélection</option>
              <option value="radio">Boutons radio</option>
              <option value="checkbox">Case à cocher</option>
            </select>
            <input
              type="text"
              value={newFieldLabel}
              onChange={(e) => setNewFieldLabel(e.target.value)}
              placeholder="Libellé du champ"
              className="px-3 py-1 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {(newFieldType === 'select' || newFieldType === 'radio') && (
              <input
                type="text"
                value={newFieldOptions}
                onChange={(e) => setNewFieldOptions(e.target.value)}
                placeholder="Options (séparées par des virgules)"
                className="px-3 py-1 text-sm border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            )}
            <Button onClick={addField} size="sm">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          {data.fields?.map((field, index) => (
            <div key={field.id} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    Champ {index + 1}: {field.label} ({field.type})
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      onClick={() => moveField(field.id, 'up')}
                      size="sm"
                      variant="outline"
                      disabled={index === 0}
                    >
                      ↑
                    </Button>
                    <Button
                      onClick={() => moveField(field.id, 'down')}
                      size="sm"
                      variant="outline"
                      disabled={index === (data.fields?.length || 0) - 1}
                    >
                      ↓
                    </Button>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setEditingField(field.id)}
                    size="sm"
                    variant="outline"
                  >
                    <Settings className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => removeField(field.id)}
                    size="sm"
                    variant="outline"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Édition du champ */}
              {editingField === field.id && (
                <div className="space-y-3 mb-3">
                  <div className="grid grid-cols-2 gap-2">
                    <TextControl
                      name={`field-label-${field.id}`}
                      label="Libellé"
                      value={field.label}
                      onChange={(value) => updateField(field.id, { label: value })}
                    />
                    <SelectControl
                      name={`field-type-${field.id}`}
                      label="Type"
                      value={field.type}
                      onChange={(value) => updateField(field.id, { type: value as FormField['type'] })}
                      options={[
                        { label: 'Texte', value: 'text' },
                        { label: 'Email', value: 'email' },
                        { label: 'Téléphone', value: 'tel' },
                        { label: 'Nombre', value: 'number' },
                        { label: 'Zone de texte', value: 'textarea' },
                        { label: 'Sélection', value: 'select' },
                        { label: 'Boutons radio', value: 'radio' },
                        { label: 'Case à cocher', value: 'checkbox' },
                      ]}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <TextControl
                      name={`field-placeholder-${field.id}`}
                      label="Placeholder"
                      value={field.placeholder || ''}
                      onChange={(value) => updateField(field.id, { placeholder: value })}
                    />
                    {(field.type === 'select' || field.type === 'radio') && (
                      <TextControl
                        name={`field-options-${field.id}`}
                        label="Options (séparées par des virgules)"
                        value={field.options?.join(', ') || ''}
                        onChange={(value) => updateField(field.id, {
                          options: value.split(',').map(opt => opt.trim()).filter(opt => opt)
                        })}
                      />
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={field.required || false}
                        onChange={(e) => updateField(field.id, { required: e.target.checked })}
                        className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-border rounded"
                      />
                      <span className="text-sm">Champ requis</span>
                    </label>

                    {(field.type === 'text' || field.type === 'textarea') && (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          placeholder="Min"
                          value={field.validation?.min || ''}
                          onChange={(e) => updateField(field.id, {
                            validation: { ...field.validation, min: parseInt(e.target.value) || undefined }
                          })}
                          className="w-20 px-2 py-1 text-sm border border-border rounded"
                        />
                        <input
                          type="number"
                          placeholder="Max"
                          value={field.validation?.max || ''}
                          onChange={(e) => updateField(field.id, {
                            validation: { ...field.validation, max: parseInt(e.target.value) || undefined }
                          })}
                          className="w-20 px-2 py-1 text-sm border border-border rounded"
                        />
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => setEditingField(null)}
                    size="sm"
                    variant="outline"
                  >
                    Terminer l'édition
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>

        {(!data.fields || data.fields.length === 0) && (
          <p className="text-sm text-muted-foreground0 text-center py-4">
            Aucun champ configuré. Ajoutez-en un pour commencer.
          </p>
        )}
      </div>
    </div>
  );
}
