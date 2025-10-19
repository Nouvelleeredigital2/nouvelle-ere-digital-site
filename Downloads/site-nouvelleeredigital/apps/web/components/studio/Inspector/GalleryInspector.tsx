'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SelectControl } from '../PropertyControls/SelectControl';
import { InspectorSection, InspectorTip } from './InspectorSection';
import { Plus, Trash2, GripVertical, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';

const galleryBlockSchema = z.object({
  images: z.array(z.object({
    id: z.string(),
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
  })).min(1, 'Au moins une image est requise'),
  layout: z.enum(['grid', 'masonry', 'carousel']).default('grid'),
  columns: z.enum(['2', '3', '4']).default('3'),
  gap: z.enum(['sm', 'md', 'lg']).default('md'),
  aspectRatio: z.enum(['16/9', '4/3', '1/1', 'auto']).default('auto'),
});

type GalleryBlockFormData = z.infer<typeof galleryBlockSchema>;

interface GalleryInspectorProps {
  data: any;
  onUpdate: (data: Partial<any>) => void;
}

export function GalleryInspector({ data, onUpdate }: GalleryInspectorProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GalleryBlockFormData>({
    resolver: zodResolver(galleryBlockSchema),
    defaultValues: {
      ...data,
      columns: String(data.columns || 3),
    },
  });

  const [showMediaPicker, setShowMediaPicker] = useState(false);

  // Mise à jour automatique
  useEffect(() => {
    const subscription = watch((value) => {
      // Convertir columns en number
      const updatedValue = {
        ...value,
        columns: Number(value.columns),
      };
      onUpdate(updatedValue as Partial<any>);
    });
    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  const currentImages = watch('images') || [];
  const currentLayout = watch('layout');

  // Ajouter une image
  const addImage = (imageData: { src: string; alt: string }) => {
    const newImage = {
      id: `img-${Date.now()}`,
      src: imageData.src,
      alt: imageData.alt,
      caption: '',
    };
    setValue('images', [...currentImages, newImage]);
  };

  // Supprimer une image
  const removeImage = (id: string) => {
    setValue('images', currentImages.filter((img: any) => img.id !== id));
  };

  // Mettre à jour une image
  const updateImage = (id: string, field: string, value: string) => {
    setValue(
      'images',
      currentImages.map((img: any) =>
        img.id === id ? { ...img, [field]: value } : img
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="pb-3 border-b border-border">
        <h4 className="font-semibold text-muted-foreground">
          Bloc Galerie
        </h4>
        <p className="text-xs text-muted-foreground0 mt-1">
          Collection d'images avec plusieurs layouts
        </p>
      </div>

      <InspectorSection 
        title="Images" 
        defaultOpen={true}
        info="Ajoutez et gérez les images de votre galerie"
      >
        {/* Liste des images */}
        <div className="space-y-3">
          {currentImages.map((image: any, index: number) => (
            <div
              key={image.id}
              className="border border-border rounded-lg p-3 space-y-2"
            >
              <div className="flex items-start gap-3">
                {/* Thumbnail */}
                <div className="relative w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                  {image.src ? (
                    <Image
                      src={image.src}
                      alt={image.alt || 'Image'}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-muted-foreground" />
                    </div>
                  )}
                </div>

                {/* Fields */}
                <div className="flex-1 space-y-2">
                  <input
                    type="text"
                    value={image.alt}
                    onChange={(e) => updateImage(image.id, 'alt', e.target.value)}
                    placeholder="Texte alternatif"
                    className="w-full px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    value={image.caption || ''}
                    onChange={(e) => updateImage(image.id, 'caption', e.target.value)}
                    placeholder="Légende (optionnelle)"
                    className="w-full px-2 py-1 text-sm border border-border rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => removeImage(image.id)}
                  className="p-1 text-error hover:bg-error/10 rounded transition-colors"
                  title="Supprimer l'image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Add image button */}
          <button
            type="button"
            onClick={() => {
              // Simuler l'ajout d'une image (en production, ouvrir le MediaPicker)
              const placeholder = {
                src: `https://via.placeholder.com/600x400?text=Image+${currentImages.length + 1}`,
                alt: `Image ${currentImages.length + 1}`,
              };
              addImage(placeholder);
            }}
            className="w-full py-3 border-2 border-dashed border-border rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-indigo-600"
          >
            <Plus className="w-4 h-4" />
            Ajouter une image
          </button>
        </div>

        {errors.images && (
          <p className="text-xs text-error mt-2">{errors.images.message}</p>
        )}

        <InspectorTip type="info">
          <strong>Astuce :</strong> Pour de meilleures performances, optimisez vos images avant de les uploader (max 1920px de largeur).
        </InspectorTip>
      </InspectorSection>

      <InspectorSection 
        title="Layout" 
        defaultOpen={true}
        info="Choisissez comment afficher vos images"
      >
        <SelectControl
          name="layout"
          label="Type de galerie"
          options={[
            { value: 'grid', label: 'Grille (Grid)' },
            { value: 'masonry', label: 'Maçonnerie (Masonry)' },
            { value: 'carousel', label: 'Carrousel (Carousel)' },
          ]}
          register={register}
          error={errors.layout}
        />

        {currentLayout !== 'carousel' && (
          <>
            <SelectControl
              name="columns"
              label="Nombre de colonnes"
              options={[
                { value: '2', label: '2 colonnes' },
                { value: '3', label: '3 colonnes' },
                { value: '4', label: '4 colonnes' },
              ]}
              register={register}
              error={errors.columns}
            />

            <SelectControl
              name="gap"
              label="Espacement"
              options={[
                { value: 'sm', label: 'Petit (0.5rem)' },
                { value: 'md', label: 'Moyen (1rem)' },
                { value: 'lg', label: 'Grand (1.5rem)' },
              ]}
              register={register}
              error={errors.gap}
            />
          </>
        )}

        {currentLayout === 'grid' && (
          <SelectControl
            name="aspectRatio"
            label="Ratio d'aspect"
            options={[
              { value: 'auto', label: 'Automatique' },
              { value: '16/9', label: '16:9 (Paysage)' },
              { value: '4/3', label: '4:3 (Standard)' },
              { value: '1/1', label: '1:1 (Carré)' },
            ]}
            register={register}
            error={errors.aspectRatio}
          />
        )}

        <InspectorTip type="info">
          <strong>Layouts disponibles :</strong>
          <br />• <strong>Grille</strong> : Images alignées en colonnes régulières
          <br />• <strong>Maçonnerie</strong> : Hauteurs variables, style Pinterest
          <br />• <strong>Carrousel</strong> : Défilement horizontal avec navigation
        </InspectorTip>
      </InspectorSection>

      <InspectorSection 
        title="Prévisualisation" 
        defaultOpen={false}
        info="Aperçu du layout choisi"
      >
        <div className="p-4 bg-muted rounded-lg">
          <p className="text-xs text-muted-foreground text-center">
            Layout: <strong>{currentLayout}</strong>
            {currentLayout !== 'carousel' && (
              <>
                {' '} • Colonnes: <strong>{watch('columns')}</strong>
              </>
            )}
            {' '} • Images: <strong>{currentImages.length}</strong>
          </p>
        </div>
      </InspectorSection>
    </div>
  );
}
