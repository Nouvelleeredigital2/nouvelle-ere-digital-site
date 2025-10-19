'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextControl } from '../studio/PropertyControls/TextControl';
import { TextareaControl } from './PropertyControls/TextareaControl';
import { InspectorSection, InspectorTip } from '../studio/Inspector/InspectorSection';
import { Eye, RefreshCw, Globe, Twitter, Facebook } from 'lucide-react';

const seoSchema = z.object({
  title: z.string().min(1, 'Le titre est requis').max(60, 'Titre trop long (max 60 caractères)'),
  description: z.string().min(1, 'La description est requise').max(160, 'Description trop longue (max 160 caractères)'),
  keywords: z.string().optional(),
  ogImage: z.string().url('URL d\'image invalide').optional().or(z.literal('')),
  ogType: z.enum(['website', 'article', 'product']).default('website'),
  noindex: z.boolean().default(false),
  canonical: z.string().url('URL canonique invalide').optional().or(z.literal('')),
});

type SEOFormData = z.infer<typeof seoSchema>;

interface SEOPanelProps {
  data: any;
  onUpdate: (data: Partial<any>) => void;
}

export function SEOPanel({ data, onUpdate }: SEOPanelProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<SEOFormData>({
    resolver: zodResolver(seoSchema),
    defaultValues: data,
  });

  // Mise à jour automatique
  useEffect(() => {
    const subscription = watch((value) => {
      onUpdate(value as Partial<any>);
    });
    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  // Générer automatiquement la description
  const generateAutoDescription = () => {
    const title = watch('title') || 'Titre de la page';
    const autoDesc = `Découvrez ${title} sur Nouvelle Ère Digital. Contenu professionnel créé avec notre éditeur visuel intuitif.`;
    setValue('description', autoDesc);
  };

  // Générer automatiquement les mots-clés
  const generateAutoKeywords = () => {
    const title = watch('title') || '';
    const words = title
      .toLowerCase()
      .replace(/[^\w\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 2)
      .slice(0, 3)
      .join(', ');

    const baseKeywords = 'site web, création site, design web, Nouvelle Ère Digital';
    setValue('keywords', words ? `${words}, ${baseKeywords}` : baseKeywords);
  };

  // Prévisualiser le résultat dans Google
  const previewSERP = () => {
    const title = watch('title') || '';
    const description = watch('description') || '';
    const url = `https://nouvelle-ere-digital.com/${data.slug || ''}`;

    // Ouvrir dans un nouvel onglet (simulation)
    const googleUrl = `https://www.google.com/search?q=site:${encodeURIComponent(url)}`;
    window.open(googleUrl, '_blank');
  };

  const currentTitle = watch('title') || '';
  const currentDescription = watch('description') || '';

  return (
    <div className="space-y-4">
      <div className="pb-3 border-b border-border">
        <h4 className="font-semibold text-muted-foreground">
          SEO & Meta-données
        </h4>
        <p className="text-xs text-muted-foreground0 mt-1">
          Optimisez votre page pour les moteurs de recherche
        </p>
      </div>

      <InspectorSection
        title="Informations Principales"
        defaultOpen={true}
        info="Titre et description qui apparaissent dans les résultats de recherche"
      >
        <TextControl
          name="title"
          label="Titre SEO"
          register={register}
          error={errors.title}
          placeholder="Titre accrocheur (50-60 caractères)"
          required
        />

        <TextareaControl
          name="description"
          label="Description"
          register={register}
          error={errors.description}
          placeholder="Résumé accrocheur (150-160 caractères)"
          rows={3}
          required
        />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={generateAutoDescription}
            className="px-3 py-1.5 text-xs bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors flex items-center gap-1"
          >
            <RefreshCw className="w-3 h-3" />
            Générer auto
          </button>
          <button
            type="button"
            onClick={previewSERP}
            className="px-3 py-1.5 text-xs bg-success/10 text-success rounded hover:bg-success/20 transition-colors flex items-center gap-1"
          >
            <Eye className="w-3 h-3" />
            Voir dans Google
          </button>
        </div>

        <TextControl
          name="keywords"
          label="Mots-clés (optionnel)"
          register={register}
          error={errors.keywords}
          placeholder="mot-clé1, mot-clé2, mot-clé3"
        />

        <button
          type="button"
          onClick={generateAutoKeywords}
          className="px-3 py-1.5 text-xs bg-accent/10 text-accent rounded hover:bg-accent/20 transition-colors flex items-center gap-1"
        >
          <RefreshCw className="w-3 h-3" />
          Générer mots-clés
        </button>

        <InspectorTip type="info">
          <strong>Conseils SEO :</strong>
          <br />• Titre : 50-60 caractères pour éviter la troncature
          <br />• Description : 150-160 caractères pour un affichage optimal
          <br />• Mots-clés : Séparez par des virgules, soyez spécifique
        </InspectorTip>
      </InspectorSection>

      <InspectorSection
        title="Open Graph & Réseaux Sociaux"
        defaultOpen={false}
        info="Aperçu quand votre page est partagée sur les réseaux sociaux"
      >
        <TextControl
          name="ogImage"
          label="Image Open Graph"
          register={register}
          error={errors.ogImage}
          placeholder="https://exemple.com/image-og.jpg"
        />

        <div className="grid grid-cols-2 gap-2">
          <div className="bg-muted p-3 rounded-lg text-center">
            <Facebook className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-xs font-medium">Facebook</p>
            <p className="text-xs text-muted-foreground mt-1">
              {currentTitle || 'Titre de la page'}
            </p>
          </div>
          <div className="bg-muted p-3 rounded-lg text-center">
            <Twitter className="w-8 h-8 text-primary mx-auto mb-2" />
            <p className="text-xs font-medium">Twitter</p>
            <p className="text-xs text-muted-foreground mt-1">
              {currentTitle || 'Titre de la page'}
            </p>
          </div>
        </div>

        <InspectorTip type="info">
          <strong>Dimensions recommandées :</strong>
          <br />• Open Graph : 1200×630px
          <br />• Twitter Card : 1200×675px
          <br />• Format : JPG ou PNG
        </InspectorTip>
      </InspectorSection>

      <InspectorSection
        title="Paramètres Avancés"
        defaultOpen={false}
        info="Options avancées pour les moteurs de recherche"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="noindex"
              {...register('noindex')}
              className="rounded border-border text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="noindex" className="text-sm text-muted-foreground">
              Ne pas indexer cette page (noindex)
            </label>
          </div>

          <TextControl
            name="canonical"
            label="URL canonique"
            register={register}
            error={errors.canonical}
            placeholder="https://exemple.com/page-canonique"
          />

          <InspectorTip type="warning">
            <strong>Attention :</strong> N'utilisez noindex que pour les pages de développement ou les contenus dupliqués.
          </InspectorTip>
        </div>
      </InspectorSection>

      <InspectorSection
        title="Prévisualisation SERP"
        defaultOpen={false}
        info="Aperçu de votre page dans les résultats de recherche"
      >
        <div className="border border-border rounded-lg p-4 bg-card">
          {/* Résultat Google style */}
          <div className="flex gap-3">
            <div className="flex-1">
              <div className="text-success text-sm mb-1">
                https://nouvelle-ere-digital.com/{data.slug || 'page'}
              </div>
              <h3 className="text-primary text-lg hover:underline cursor-pointer mb-1">
                {currentTitle || 'Titre de votre page'}
              </h3>
              <p className="text-muted-foreground text-sm">
                {currentDescription || 'Description de votre page...'}
              </p>
            </div>
            {watch('ogImage') && (
              <div className="w-20 h-20 bg-muted rounded flex-shrink-0">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 rounded flex items-center justify-center">
                  <Globe className="w-6 h-6 text-muted-foreground0" />
                </div>
              </div>
            )}
          </div>
        </div>
      </InspectorSection>
    </div>
  );
}
