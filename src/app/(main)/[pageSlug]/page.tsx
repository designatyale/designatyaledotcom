/*
 * page.tsx
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 */

import PageBuilder from '@/components/PageBuilder';
import PreviewPageBuilder from '@/components/PageBuilder/preview';
import PreviewProvider from '@/components/PreviewProvider';
import getClient from '@/sanity/client';
import { pageQuery, pagesQuery } from '@/sanity/groq';
import { PeCopy, SanityKeyed, SitePage } from '@/sanity/schema';
import getPreview from '@/util/getPreview';
import { toPlainText } from '@portabletext/react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import METADATA from '@/app/metadata';
import s from './[subSlug]/SubPage.module.scss';

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */
// All subpages are simply a wrapped PageBuilder with necessary DOM elements.

interface PageProps {
  params: { pageSlug: string };
}

export default async function SubPage({ params: { pageSlug } }: PageProps) {
  const preview = getPreview();
  const params = { pageSlug: `/${pageSlug}` };
  const page: SitePage | null = await getClient(preview).fetch(
    pageQuery,
    params,
    { next: { tags: [`page:${params.pageSlug}`] } }
  );
  if (!page) notFound();

  return (
    <article aria-labelledby="subpage-header" className={s.container}>
      {preview && preview.token ? (
        <PreviewProvider token={preview.token}>
          <PreviewPageBuilder
            initialValue={page}
            path="rootSubPageBuilder"
            query={pageQuery}
            params={params}
          />
        </PreviewProvider>
      ) : (
        <PageBuilder content={page.rootSubPageBuilder ?? []} />
      )}
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Metadata                                  */
/* -------------------------------------------------------------------------- */

export const revalidate = false;

// generate the metadata for the page.
export async function generateMetadata({ params: { pageSlug } }: PageProps) {
  const params = { pageSlug: `/${pageSlug}` };
  const page: SitePage | null = await getClient().fetch(pageQuery, params, {
    next: { tags: [`page:${params.pageSlug}`] },
  });
  if (!page) return {};

  // create metadata titles
  const title = `${page.seo_title || page.title} | ${METADATA.title}`;
  const OGTitle = `${page.seo_title || page.title} // ${METADATA.title}`;

  // parse page body into a description if no description provided
  const descriptionUF =
    page.seo_description ||
    page.pageBuilder
      ?.filter(
        (pageEl): pageEl is SanityKeyed<PeCopy> => pageEl._type === 'pe_copy'
      )
      .map(({ content }) => toPlainText(content ?? []))
      .join(' ');
  const description =
    descriptionUF && descriptionUF.length > 152
      ? descriptionUF.substring(0, 152) + '...'
      : descriptionUF;

  const metadata: Metadata = {
    title,
    description,
    keywords: page.seo_keywords,
    openGraph: {
      title: OGTitle,
      description,
      url: params.pageSlug,
    },
    twitter: {
      title,
      description,
      site: params.pageSlug,
    },
  };

  return metadata;
}
