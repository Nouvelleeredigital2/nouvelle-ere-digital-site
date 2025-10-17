'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { heroBlockSchema, HeroBlockFormData } from '@/lib/inspectorSchemas';
import { TextControl } from '../PropertyControls/TextControl';
import { SelectControl } from '../PropertyControls/SelectControl';
import { ImagePickerControl } from '../PropertyControls/ImagePickerControl';

interface HeroInspectorProps {
  data: any;
  onUpdate: (data: Partial<any>) => void;
}

export function HeroInspector({ data, onUpdate }: HeroInspectorProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<HeroBlockFormData>({
    resolver: zodResolver(heroBlockSchema),
    defaultValues: data,
  });

  // Mise à jour automatique au changement
  useEffect(() => {
    const subscription = watch((value) => {
      onUpdate(value as Partial<any>);
    });
    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  return (
    <div className="space-y-4">
      <h4 className="font-semibold text-gray-900 border-b pb-2">
        Bloc Hero
      </h4>

      <TextControl
        name="title"
        label="Titre"
        register={register}
        error={errors.title}
        placeholder="Votre titre accrocheur"
        required
      />

      <TextControl
        name="subtitle"
        label="Sous-titre"
        register={register}
        error={errors.subtitle}
        placeholder="Un sous-titre optionnel"
      />

      <TextControl
        name="description"
        label="Description"
        register={register}
        error={errors.description}
        placeholder="Description plus détaillée"
        multiline
        rows={4}
      />

      <div className="grid grid-cols-2 gap-4">
        <TextControl
          name="ctaText"
          label="Texte du bouton"
          register={register}
          error={errors.ctaText}
          placeholder="En savoir plus"
        />

        <TextControl
          name="ctaLink"
          label="Lien du bouton"
          register={register}
          error={errors.ctaLink}
          placeholder="/contact"
        />
      </div>

      <SelectControl
        name="alignment"
        label="Alignement"
        options={[
          { value: 'left', label: 'Gauche' },
          { value: 'center', label: 'Centré' },
          { value: 'right', label: 'Droite' },
        ]}
        register={register}
        error={errors.alignment}
      />

      <ImagePickerControl
        name="backgroundImage"
        label="Image de fond"
        setValue={setValue}
        watch={watch}
      />
    </div>
  );
}
