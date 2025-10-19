'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { imageBlockSchema, ImageBlockFormData } from '@/lib/inspectorSchemas';
import { TextControl } from '../PropertyControls/TextControl';
import { SelectControl } from '../PropertyControls/SelectControl';
import { ImagePickerControl } from '../PropertyControls/ImagePickerControl';

interface ImageInspectorProps {
  data: any;
  onUpdate: (data: Partial<any>) => void;
}

export function ImageInspector({ data, onUpdate }: ImageInspectorProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ImageBlockFormData>({
    resolver: zodResolver(imageBlockSchema),
    defaultValues: data,
  });

  useEffect(() => {
    const subscription = watch((value) => {
      onUpdate(value as Partial<any>);
    });
    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-muted-foreground border-b pb-2">
        Bloc Image
      </h4>

      <ImagePickerControl
        name="src"
        label="Image"
        setValue={setValue}
        watch={watch}
      />

      <TextControl
        name="alt"
        label="Texte alternatif (Alt)"
        register={register}
        error={errors.alt}
        placeholder="Description de l'image pour l'accessibilité"
        required
      />

      <TextControl
        name="caption"
        label="Légende"
        register={register}
        error={errors.caption}
        placeholder="Légende optionnelle sous l'image"
        multiline
        rows={2}
      />

      <SelectControl
        name="layout"
        label="Mise en page"
        options={[
          { value: 'full', label: 'Pleine largeur' },
          { value: 'contained', label: 'Contenue' },
        ]}
        register={register}
        error={errors.layout}
      />

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
    </div>
  );
}
