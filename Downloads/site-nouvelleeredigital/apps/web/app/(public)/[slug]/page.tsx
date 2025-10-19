import { notFound } from 'next/navigation';
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
    notFound();
  }

  return (
    <main className="min-h-screen">
      <BlocksRenderer blocks={pageData.layout.blocks || []} />
    </main>
  );
}
