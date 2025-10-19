'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ColumnsBlockDataSchema } from '@/lib/types/blocks';
import { InspectorSection } from '../InspectorSection';
import { SelectControl } from '../PropertyControls/SelectControl';
import { Button } from '@/components/ui/Button';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import type { ColumnsBlock } from '@/lib/types/blocks';

interface ColumnsInspectorProps {
  block: ColumnsBlock;
  onUpdate: (data: Partial<ColumnsBlock['data']>) => void;
}

export function ColumnsInspector({ block, onUpdate }: ColumnsInspectorProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ColumnsBlock['data']>({
    resolver: zodResolver(ColumnsBlockDataSchema),
    defaultValues: block.data,
  });

  const currentValues = watch();

  const handleFormSubmit = (data: ColumnsBlock['data']) => {
    onUpdate(data);
  };

  // Gérer les changements en temps réel
  React.useEffect(() => {
    const subscription = watch((value) => {
      onUpdate(value as ColumnsBlock['data']);
    });
    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  const addColumn = () => {
    const newColumn = {
      id: `column-${Date.now()}`,
      blocks: [],
      width: Math.floor(12 / (block.data.columns.length + 1)),
    };

    const newColumns = [...block.data.columns, newColumn];
    
    // Réajuster les largeurs pour que la somme fasse 12
    const totalWidth = newColumns.reduce((sum, col) => sum + col.width, 0);
    const adjustment = Math.floor((12 - totalWidth) / newColumns.length);
    
    const adjustedColumns = newColumns.map(col => ({
      ...col,
      width: Math.max(1, col.width + adjustment),
    }));

    setValue('columns', adjustedColumns);
    onUpdate({ columns: adjustedColumns });
  };

  const removeColumn = (columnId: string) => {
    if (block.data.columns.length <= 2) return; // Minimum 2 colonnes

    const newColumns = block.data.columns.filter(col => col.id !== columnId);
    
    // Réajuster les largeurs
    const totalWidth = newColumns.reduce((sum, col) => sum + col.width, 0);
    const adjustment = Math.floor((12 - totalWidth) / newColumns.length);
    
    const adjustedColumns = newColumns.map(col => ({
      ...col,
      width: Math.max(1, col.width + adjustment),
    }));

    setValue('columns', adjustedColumns);
    onUpdate({ columns: adjustedColumns });
  };

  const updateColumnWidth = (columnId: string, newWidth: number) => {
    const newColumns = block.data.columns.map(col => {
      if (col.id === columnId) {
        return { ...col, width: newWidth };
      }
      return col;
    });

    // Vérifier que la somme des largeurs ne dépasse pas 12
    const totalWidth = newColumns.reduce((sum, col) => sum + col.width, 0);
    if (totalWidth > 12) {
      // Ajuster les autres colonnes
      const excess = totalWidth - 12;
      const otherColumns = newColumns.filter(col => col.id !== columnId);
      const adjustmentPerColumn = Math.floor(excess / otherColumns.length);
      
      const adjustedColumns = newColumns.map(col => {
        if (col.id !== columnId) {
          return { ...col, width: Math.max(1, col.width - adjustmentPerColumn) };
        }
        return col;
      });

      setValue('columns', adjustedColumns);
      onUpdate({ columns: adjustedColumns });
    } else {
      setValue('columns', newColumns);
      onUpdate({ columns: newColumns });
    }
  };

  const getGridTemplateColumns = () => {
    return block.data.columns.map(col => `${col.width}fr`).join(' ');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Configuration générale */}
        <InspectorSection 
          title="Configuration" 
          defaultOpen={true}
          info="Paramètres généraux des colonnes"
        >
          <div className="grid grid-cols-2 gap-4">
            <SelectControl
              name="gap"
              label="Espacement"
              options={[
                { value: 'none', label: 'Aucun' },
                { value: 'sm', label: 'Petit' },
                { value: 'md', label: 'Moyen' },
                { value: 'lg', label: 'Grand' },
                { value: 'xl', label: 'Très grand' },
              ]}
              register={register}
              error={errors.gap}
            />

            <SelectControl
              name="alignment"
              label="Alignement vertical"
              options={[
                { value: 'start', label: 'Haut' },
                { value: 'center', label: 'Centre' },
                { value: 'end', label: 'Bas' },
                { value: 'stretch', label: 'Étiré' },
              ]}
              register={register}
              error={errors.alignment}
            />
          </div>
        </InspectorSection>

        {/* Gestion des colonnes */}
        <InspectorSection 
          title="Colonnes" 
          defaultOpen={true}
          info="Gérez le nombre et la largeur des colonnes"
        >
          <div className="space-y-4">
            {/* Aperçu de la grille */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm font-medium text-gray-700 mb-2">
                Aperçu de la grille ({block.data.columns.length} colonnes)
              </div>
              <div 
                className="grid gap-1 h-8"
                style={{ gridTemplateColumns: getGridTemplateColumns() }}
              >
                {block.data.columns.map((column, index) => (
                  <div
                    key={column.id}
                    className="bg-blue-200 rounded flex items-center justify-center text-xs font-medium text-blue-800"
                  >
                    {column.width}/12
                  </div>
                ))}
              </div>
            </div>

            {/* Liste des colonnes */}
            <div className="space-y-3">
              {block.data.columns.map((column, index) => (
                <div key={column.id} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <GripVertical className="w-4 h-4 text-gray-400" />
                  
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700">
                      Colonne {index + 1}
                    </div>
                    <div className="text-xs text-gray-500">
                      {column.blocks.length} bloc(s)
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <label className="text-xs text-gray-600">Largeur:</label>
                    <select
                      value={column.width}
                      onChange={(e) => updateColumnWidth(column.id, parseInt(e.target.value))}
                      className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(width => (
                        <option key={width} value={width}>
                          {width}/12
                        </option>
                      ))}
                    </select>
                  </div>

                  {block.data.columns.length > 2 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeColumn(column.id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Bouton pour ajouter une colonne */}
            {block.data.columns.length < 4 && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addColumn}
                className="w-full flex items-center justify-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Ajouter une colonne</span>
              </Button>
            )}
          </div>
        </InspectorSection>

        {/* Configuration responsive */}
        <InspectorSection 
          title="Responsive" 
          defaultOpen={false}
          info="Comportement sur différents appareils"
        >
          <div className="space-y-4">
            <SelectControl
              name="responsive.mobile"
              label="Mobile"
              options={[
                { value: 'stack', label: 'Empilé' },
                { value: 'columns', label: 'Colonnes' },
              ]}
              register={register}
              error={errors.responsive?.mobile}
            />

            <SelectControl
              name="responsive.tablet"
              label="Tablette"
              options={[
                { value: 'stack', label: 'Empilé' },
                { value: 'columns', label: 'Colonnes' },
              ]}
              register={register}
              error={errors.responsive?.tablet}
            />

            <SelectControl
              name="responsive.desktop"
              label="Desktop"
              options={[
                { value: 'stack', label: 'Empilé' },
                { value: 'columns', label: 'Colonnes' },
              ]}
              register={register}
              error={errors.responsive?.desktop}
            />
          </div>
        </InspectorSection>

        {/* Informations */}
        <InspectorSection 
          title="Informations" 
          defaultOpen={false}
          info="Détails techniques sur ce bloc"
        >
          <div className="text-sm space-y-2">
            <div>
              <span className="font-medium">Type:</span> Colonnes
            </div>
            <div>
              <span className="font-medium">Nombre de colonnes:</span> {block.data.columns.length}
            </div>
            <div>
              <span className="font-medium">Espacement:</span> {block.data.gap}
            </div>
            <div>
              <span className="font-medium">Alignement:</span> {block.data.alignment}
            </div>
            <div>
              <span className="font-medium">Total des blocs:</span> {block.data.columns.reduce((sum, col) => sum + col.blocks.length, 0)}
            </div>
          </div>
        </InspectorSection>
      </form>
    </div>
  );
}