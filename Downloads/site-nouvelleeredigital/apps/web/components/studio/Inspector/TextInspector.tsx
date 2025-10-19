'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { textBlockSchema, TextBlockFormData } from '@/lib/inspectorSchemas';
import { TextControl } from '../PropertyControls/TextControl';
import { SelectControl } from '../PropertyControls/SelectControl';
import { ColorControl } from '../PropertyControls/ColorControl';
import { InspectorSection, InspectorTip, InspectorPreview } from './InspectorSection';

interface TextInspectorProps {
  data: any;
  onUpdate: (data: Partial<any>) => void;
}

export function TextInspector({ data, onUpdate }: TextInspectorProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TextBlockFormData>({
    resolver: zodResolver(textBlockSchema),
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
      <div className="pb-3 border-b border-border">
        <h4 className="font-semibold text-muted-foreground">
          Bloc Texte
        </h4>
        <p className="text-xs text-muted-foreground0 mt-1">
          Bloc de contenu riche pour vos paragraphes et contenus
        </p>
      </div>

      <InspectorSection 
        title="Contenu" 
        defaultOpen={true}
        info="Utilisez du HTML pour formater votre texte"
      >
        <TextControl
          name="content"
          label="Contenu HTML"
          register={register}
          error={errors.content}
          placeholder="<p>Votre contenu HTML...</p>"
          multiline
          rows={8}
          required
        />

        <InspectorTip type="info">
          Utilisez les balises HTML standard: &lt;p&gt;, &lt;h2&gt;, &lt;strong&gt;, &lt;em&gt;, &lt;ul&gt;, &lt;li&gt;, etc.
        </InspectorTip>
      </InspectorSection>

      <InspectorSection 
        title="Mise en Page" 
        defaultOpen={true}
        info="Contrôlez l'alignement et la largeur de votre texte"
      >
        <SelectControl
          name="alignment"
          label="Alignement"
          options={[
            { value: 'left', label: 'Gauche' },
            { value: 'center', label: 'Centré' },
            { value: 'right', label: 'Droite' },
            { value: 'justify', label: 'Justifié' },
          ]}
          register={register}
          error={errors.alignment}
        />

        <SelectControl
          name="maxWidth"
          label="Largeur maximale"
          options={[
            { value: 'sm', label: 'Petite (640px)' },
            { value: 'md', label: 'Moyenne (768px)' },
            { value: 'lg', label: 'Large (1024px)' },
            { value: 'xl', label: 'Très large (1280px)' },
            { value: 'full', label: 'Pleine largeur' },
          ]}
          register={register}
          error={errors.maxWidth}
        />
      </InspectorSection>

      <InspectorSection 
        title="Espacement" 
        defaultOpen={false}
        info="Ajustez l'espace autour du bloc"
      >
        <div className="grid grid-cols-2 gap-4">
          <SelectControl
            name="paddingY"
            label="Espacement vertical"
            options={[
              { value: 'none', label: 'Aucun' },
              { value: 'sm', label: 'Petit' },
              { value: 'md', label: 'Moyen' },
              { value: 'lg', label: 'Grand' },
              { value: 'xl', label: 'Très grand' },
            ]}
            register={register}
            error={errors.paddingY}
          />

          <SelectControl
            name="paddingX"
            label="Espacement horizontal"
            options={[
              { value: 'none', label: 'Aucun' },
              { value: 'sm', label: 'Petit' },
              { value: 'md', label: 'Moyen' },
              { value: 'lg', label: 'Grand' },
              { value: 'xl', label: 'Très grand' },
            ]}
            register={register}
            error={errors.paddingX}
          />
        </div>
      </InspectorSection>

      <InspectorSection 
        title="Couleurs" 
        defaultOpen={false}
        info="Personnalisez les couleurs de fond et de texte"
      >
        <ColorControl
          name="backgroundColor"
          label="Couleur de fond"
          register={register}
          setValue={setValue}
          watch={watch}
        />

        <ColorControl
          name="textColor"
          label="Couleur du texte"
          register={register}
          setValue={setValue}
          watch={watch}
        />

        <InspectorTip type="warning">
          Assurez-vous d'un bon contraste entre le texte et le fond pour la lisibilité.
        </InspectorTip>
      </InspectorSection>
    </div>
  );
}
