'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ctaBlockSchema, CTABlockFormData } from '@/lib/inspectorSchemas';
import { TextControl } from '../PropertyControls/TextControl';
import { SelectControl } from '../PropertyControls/SelectControl';
import { ColorControl } from '../PropertyControls/ColorControl';

interface CTAInspectorProps {
  data: any;
  onUpdate: (data: Partial<any>) => void;
}

export function CTAInspector({ data, onUpdate }: CTAInspectorProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CTABlockFormData>({
    resolver: zodResolver(ctaBlockSchema),
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
      <h4 className="font-semibold text-gray-900 border-b pb-2">
        Bloc Call-to-Action
      </h4>

      <TextControl
        name="title"
        label="Titre"
        register={register}
        error={errors.title}
        placeholder="Titre accrocheur"
        required
      />

      <TextControl
        name="description"
        label="Description"
        register={register}
        error={errors.description}
        placeholder="Description complémentaire"
        multiline
        rows={3}
      />

      <div className="border-t pt-4">
        <h5 className="text-sm font-medium text-gray-700 mb-3">
          Bouton Principal
        </h5>
        
        <div className="space-y-3">
          <TextControl
            name="primaryButtonText"
            label="Texte"
            register={register}
            error={errors.primaryButtonText}
            placeholder="Commencer"
          />

          <TextControl
            name="primaryButtonLink"
            label="Lien"
            register={register}
            error={errors.primaryButtonLink}
            placeholder="/contact"
          />
        </div>
      </div>

      <div className="border-t pt-4">
        <h5 className="text-sm font-medium text-gray-700 mb-3">
          Bouton Secondaire (Optionnel)
        </h5>
        
        <div className="space-y-3">
          <TextControl
            name="secondaryButtonText"
            label="Texte"
            register={register}
            error={errors.secondaryButtonText}
            placeholder="En savoir plus"
          />

          <TextControl
            name="secondaryButtonLink"
            label="Lien"
            register={register}
            error={errors.secondaryButtonLink}
            placeholder="/about"
          />
        </div>
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

      <ColorControl
        name="backgroundColor"
        label="Couleur de fond"
        register={register}
        setValue={setValue}
        watch={watch}
      />
    </div>
  );
}
