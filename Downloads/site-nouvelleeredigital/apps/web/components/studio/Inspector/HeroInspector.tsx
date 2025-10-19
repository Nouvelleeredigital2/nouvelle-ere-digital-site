'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { heroBlockSchema, HeroBlockFormData } from '@/lib/inspectorSchemas';
import { TextControl } from '../PropertyControls/TextControl';
import { SelectControl } from '../PropertyControls/SelectControl';
import { ImagePickerControl } from '../PropertyControls/ImagePickerControl';
import { InspectorSection, InspectorTip, InspectorPreview } from './InspectorSection';

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

  const currentValues = watch();

  return (
    <div className="space-y-4">
      <div className="pb-3 border-b border-border">
        <h4 className="font-semibold text-muted-foreground">
          Bloc Hero
        </h4>
        <p className="text-xs text-muted-foreground0 mt-1">
          Section d'en-tête impactante pour capter l'attention
        </p>
      </div>

      <InspectorSection 
        title="Contenu Principal" 
        defaultOpen={true}
        info="Le titre et la description sont les éléments clés de votre Hero"
      >
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

        <InspectorTip type="info">
          Le titre doit être court (5-10 mots) et percutant. La description peut être plus longue (2-3 phrases).
        </InspectorTip>
      </InspectorSection>

      <InspectorSection 
        title="Call-to-Action" 
        defaultOpen={true}
        info="Bouton d'action pour diriger vos visiteurs"
      >
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

        {currentValues.ctaText && (
          <InspectorPreview label="Aperçu du bouton">
            <button className="px-6 py-3 bg-indigo-600 text-card-foreground rounded-lg hover:bg-indigo-700 transition-colors">
              {currentValues.ctaText}
            </button>
          </InspectorPreview>
        )}
      </InspectorSection>

      <InspectorSection 
        title="Apparence" 
        defaultOpen={true}
        info="Personnalisez l'alignement et le fond de votre Hero"
      >
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

        <InspectorTip type="warning">
          Pour une meilleure lisibilité, assurez-vous que l'image de fond a un bon contraste avec le texte.
        </InspectorTip>
      </InspectorSection>
    </div>
  );
}
