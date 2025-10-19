'use client';

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { SelectControl } from '../PropertyControls/SelectControl';
import { InspectorSection, InspectorTip } from './InspectorSection';
import { IconSelector } from '@/components/blocks/IconBlock';
import { ColorControl } from '../PropertyControls/ColorControl';

// Schéma de validation
const iconBlockSchema = z.object({
  icon: z.string().min(1, 'L\'icône est requise'),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl', '2xl']).default('md'),
  color: z.string().optional(),
  backgroundColor: z.string().optional(),
  shape: z.enum(['none', 'circle', 'square', 'rounded']).default('none'),
  animation: z.enum(['none', 'spin', 'pulse', 'bounce']).optional(),
  link: z.string().url().optional(),
  tooltip: z.string().optional(),
});

type IconBlockFormData = z.infer<typeof iconBlockSchema>;

interface IconInspectorProps {
  data: any;
  onUpdate: (data: Partial<any>) => void;
}

export function IconInspector({ data, onUpdate }: IconInspectorProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<IconBlockFormData>({
    resolver: zodResolver(iconBlockSchema),
    defaultValues: data,
  });

  // Mise à jour automatique
  useEffect(() => {
    const subscription = watch((value) => {
      onUpdate(value as Partial<any>);
    });
    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  const currentIcon = watch('icon') || 'star';

  return (
    <div className="space-y-4">
      <div className="pb-3 border-b border-border">
        <h4 className="font-semibold text-muted-foreground">
          Bloc Icône
        </h4>
        <p className="text-xs text-muted-foreground0 mt-1">
          Icône personnalisable avec options avancées
        </p>
      </div>

      <InspectorSection 
        title="Icône" 
        defaultOpen={true}
        info="Choisissez l'icône à afficher"
      >
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Sélection d'icône
          </label>
          <IconSelector
            selectedIcon={currentIcon}
            onIconSelect={(icon) => setValue('icon', icon)}
          />
          {errors.icon && (
            <p className="text-xs text-error mt-1">{errors.icon.message}</p>
          )}
        </div>
      </InspectorSection>

      <InspectorSection 
        title="Apparence" 
        defaultOpen={true}
        info="Personnalisez la taille et les couleurs"
      >
        <SelectControl
          name="size"
          label="Taille"
          options={[
            { value: 'xs', label: 'Très petite (12px)' },
            { value: 'sm', label: 'Petite (16px)' },
            { value: 'md', label: 'Moyenne (24px)' },
            { value: 'lg', label: 'Grande (32px)' },
            { value: 'xl', label: 'Très grande (40px)' },
            { value: '2xl', label: 'Énorme (48px)' },
          ]}
          register={register}
          error={errors.size}
        />

        <SelectControl
          name="shape"
          label="Forme"
          options={[
            { value: 'none', label: 'Aucune' },
            { value: 'circle', label: 'Cercle' },
            { value: 'square', label: 'Carré' },
            { value: 'rounded', label: 'Arrondi' },
          ]}
          register={register}
          error={errors.shape}
        />

        <ColorControl
          name="color"
          label="Couleur de l'icône"
          register={register}
          setValue={setValue}
          watch={watch}
        />

        <ColorControl
          name="backgroundColor"
          label="Couleur de fond"
          register={register}
          setValue={setValue}
          watch={watch}
        />
      </InspectorSection>

      <InspectorSection 
        title="Animation" 
        defaultOpen={false}
        info="Ajoutez des effets d'animation"
      >
        <SelectControl
          name="animation"
          label="Animation"
          options={[
            { value: 'none', label: 'Aucune' },
            { value: 'spin', label: 'Rotation' },
            { value: 'pulse', label: 'Pulsation' },
            { value: 'bounce', label: 'Rebond' },
          ]}
          register={register}
          error={errors.animation}
        />

        <InspectorTip type="info">
          Les animations peuvent attirer l'attention mais évitez d'en abuser pour ne pas distraire les utilisateurs.
        </InspectorTip>
      </InspectorSection>

      <InspectorSection 
        title="Interaction" 
        defaultOpen={false}
        info="Ajoutez des liens et des tooltips"
      >
        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Lien (URL)
          </label>
          <input
            type="url"
            {...register('link')}
            placeholder="https://exemple.com"
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.link && (
             <p className="text-xs text-error mt-1">{errors.link.message}</p>
           )}
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-2">
            Tooltip (texte au survol)
          </label>
          <input
            type="text"
            {...register('tooltip')}
            placeholder="Texte affiché au survol"
            className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <InspectorTip type="info">
          Le tooltip s'affichera quand l'utilisateur survole l'icône avec sa souris.
        </InspectorTip>
      </InspectorSection>
    </div>
  );
}