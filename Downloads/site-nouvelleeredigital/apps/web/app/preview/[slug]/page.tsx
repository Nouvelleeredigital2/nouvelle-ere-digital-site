import { notFound } from 'next/navigation';
import { BlocksRenderer } from '@/components/blocks/BlocksRenderer';
import { generatePageMetadata } from '@/lib/seo-utils';
import { getPreviewDraft } from '@/lib/preview-utils';
import type { Metadata } from 'next';

interface PreviewPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    token?: string;
  };
}

export async function generateMetadata({ params, searchParams }: PreviewPageProps): Promise<Metadata> {
  const { slug } = params;
  const { token } = searchParams;

  if (!token) {
    return generatePageMetadata({
      title: 'Prévisualisation non autorisée',
      slug,
    });
  }

  try {
    const draft = await getPreviewDraft(slug, token);

    if (!draft) {
      return generatePageMetadata({
        title: 'Prévisualisation expirée',
        slug,
      });
    }

    return generatePageMetadata({
      title: draft.title,
      slug,
      description: draft.seo?.description,
      ogImage: draft.seo?.ogImage,
    });
  } catch (error) {
    console.error('Erreur génération metadata prévisualisation:', error);
    return generatePageMetadata({
      title: 'Erreur de prévisualisation',
      slug,
    });
  }
}

export default async function PreviewPage({ params, searchParams }: PreviewPageProps) {
  const { slug } = params;
  const { token } = searchParams;

  // Vérifier le token
  if (!token) {
    notFound();
  }

  try {
    const draft = await getPreviewDraft(slug, token);

    if (!draft) {
      notFound();
    }

    // Parser le layout
    const layout = typeof draft.layout === 'string'
      ? JSON.parse(draft.layout)
      : draft.layout;

    return (
      <div className="min-h-screen bg-white">
        {/* Bannière de prévisualisation */}
        <div className="bg-indigo-600 text-white px-4 py-2 text-sm text-center">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            Prévisualisation - Brouillon non publié
          </div>
        </div>

        {/* Contenu de la page */}
        <BlocksRenderer blocks={layout.blocks || []} />

        {/* Footer de prévisualisation */}
        <div className="bg-gray-100 px-4 py-3 text-center text-sm text-gray-600 border-t">
          <p>
            Cette page est en mode prévisualisation.
            Elle n'est visible que via le lien de partage.
          </p>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Erreur rendu prévisualisation:', error);
    notFound();
  }
}
