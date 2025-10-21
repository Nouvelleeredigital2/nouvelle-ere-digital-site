'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RichTextBlockDataSchema } from '@/lib/types/blocks';
import { InspectorSection } from '../InspectorSection';
import { SelectControl } from '../PropertyControls/SelectControl';
import { RichTextEditor } from '../RichTextEditor';
import type { RichTextBlock } from '@/lib/types/blocks';

interface RichTextInspectorProps {
  data: RichTextBlock['data'];
  onUpdate: (data: Partial<RichTextBlock['data']>) => void;
}

export function RichTextInspector({ data, onUpdate }: RichTextInspectorProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RichTextBlock['data']>({
    resolver: zodResolver(RichTextBlockDataSchema),
    defaultValues: data,
  });

  const currentValues = watch();

  const handleFormSubmit = (data: RichTextBlock['data']) => {
    onUpdate(data);
  };

  // Gérer les changements en temps réel
  React.useEffect(() => {
    const subscription = watch((value) => {
      onUpdate(value as RichTextBlock['data']);
    });
    return () => subscription.unsubscribe();
  }, [watch, onUpdate]);

  const handleContentChange = (content: string) => {
    setValue('content', content);
    onUpdate({ ...currentValues, content });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Éditeur de texte riche */}
        <InspectorSection 
          title="Contenu" 
          defaultOpen={true}
          info="Éditez votre contenu avec l'éditeur de texte riche"
        >
          <RichTextEditor
            content={currentValues.content || ''}
            onChange={handleContentChange}
            placeholder="Commencez à écrire votre contenu..."
          />
        </InspectorSection>

        {/* Configuration du layout */}
        <InspectorSection 
          title="Mise en page" 
          defaultOpen={true}
          info="Personnalisez l'affichage du contenu"
        >
          <div className="space-y-4">
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
                { value: 'lg', label: 'Grande (1024px)' },
                { value: 'xl', label: 'Très grande (1280px)' },
                { value: 'full', label: 'Pleine largeur' },
              ]}
              register={register}
              error={errors.maxWidth}
            />

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
          </div>
        </InspectorSection>

        {/* Aperçu */}
        <InspectorSection 
          title="Aperçu" 
          defaultOpen={true}
          info="Voir le rendu de votre contenu"
        >
          <div className="p-4 bg-gray-50 rounded-lg">
            <div 
              className={`
                prose prose-sm max-w-none
                ${currentValues.alignment === 'center' ? 'text-center' : ''}
                ${currentValues.alignment === 'right' ? 'text-right' : ''}
                ${currentValues.alignment === 'justify' ? 'text-justify' : ''}
                ${currentValues.maxWidth === 'sm' ? 'max-w-sm' : ''}
                ${currentValues.maxWidth === 'md' ? 'max-w-md' : ''}
                ${currentValues.maxWidth === 'lg' ? 'max-w-lg' : ''}
                ${currentValues.maxWidth === 'xl' ? 'max-w-xl' : ''}
                ${currentValues.maxWidth === 'full' ? 'max-w-full' : ''}
                ${currentValues.paddingY === 'none' ? 'py-0' : ''}
                ${currentValues.paddingY === 'sm' ? 'py-2' : ''}
                ${currentValues.paddingY === 'md' ? 'py-4' : ''}
                ${currentValues.paddingY === 'lg' ? 'py-6' : ''}
                ${currentValues.paddingY === 'xl' ? 'py-8' : ''}
              `}
              dangerouslySetInnerHTML={{ __html: currentValues.content || '<p>Votre contenu apparaîtra ici...</p>' }}
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
              <span className="font-medium">Type:</span> Texte riche
            </div>
            <div>
              <span className="font-medium">Alignement:</span> {currentValues.alignment || 'Gauche'}
            </div>
            <div>
              <span className="font-medium">Largeur max:</span> {currentValues.maxWidth || 'Pleine largeur'}
            </div>
            <div>
              <span className="font-medium">Espacement:</span> {currentValues.paddingY || 'Moyen'}
            </div>
            <div>
              <span className="font-medium">Taille du contenu:</span> {currentValues.content?.length || 0} caractères
            </div>
            <div>
              <span className="font-medium">Mots:</span> {currentValues.content?.split(/\s+/).filter(word => word.length > 0).length || 0}
            </div>
          </div>
        </InspectorSection>

        {/* Conseils d'écriture */}
        <InspectorSection 
          title="Conseils d'écriture" 
          defaultOpen={false}
          info="Bonnes pratiques pour un contenu efficace"
        >
          <div className="text-sm space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="font-medium text-blue-900 mb-1">📝 Structure</div>
              <div className="text-blue-700">
                Utilisez les titres H1-H6 pour structurer votre contenu. Un seul H1 par page.
              </div>
            </div>
            
            <div className="p-3 bg-green-50 rounded-lg">
              <div className="font-medium text-green-900 mb-1">🎯 Lisibilité</div>
              <div className="text-green-700">
                Rédigez des paragraphes courts (3-4 phrases max) pour une meilleure lisibilité.
              </div>
            </div>
            
            <div className="p-3 bg-yellow-50 rounded-lg">
              <div className="font-medium text-yellow-900 mb-1">🔗 Liens</div>
              <div className="text-yellow-700">
                Ajoutez des liens vers des ressources externes pour enrichir votre contenu.
              </div>
            </div>
            
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="font-medium text-purple-900 mb-1">📱 Mobile</div>
              <div className="text-purple-700">
                Testez votre contenu sur mobile pour vérifier la lisibilité.
              </div>
            </div>
          </div>
        </InspectorSection>
      </form>
    </div>
  );
}