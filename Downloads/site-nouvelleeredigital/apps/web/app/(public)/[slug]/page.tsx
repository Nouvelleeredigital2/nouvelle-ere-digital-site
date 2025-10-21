import { getPageBySlug, getAllPages } from '@/lib/snapshot';
import { BlocksRenderer } from '@/components/blocks/BlocksRenderer';

export async function generateStaticParams() {
  const pages = await getAllPages();
  
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const pageData = await getPageBySlug(params.slug);

  if (!pageData) {
    return {
      title: 'Page non trouvée',
    };
  }

  return {
    title: pageData.title,
    description: `${pageData.title} - Nouvelle Ère Digital`,
  };
}

export default async function DynamicPage({ params }: { params: { slug: string } }) {
  const pageData = await getPageBySlug(params.slug);

  if (!pageData) {
    // Au lieu de notFound(), affichons une page par défaut
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Page "{params.slug}" non trouvée
          </h1>
          <p className="text-gray-600 mb-8">
            Cette page n'existe pas encore ou n'est pas publiée.
          </p>
          <div className="space-x-4">
            <a 
              href="/admin" 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block"
            >
              Administration
            </a>
            <a 
              href="/admin/pages" 
              className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg inline-block"
            >
              Gérer les pages
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <BlocksRenderer blocks={(pageData.layout.blocks || []) as any} />
    </main>
  );
}
