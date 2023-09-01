/*
 * page.tsx
 * Author: evan kirkiles
 * Created On Fri Sep 01 2023
 * 2023 Design at Yale
 */

import METADATA from '@/app/metadata';
import PageBuilder from '@/components/PageBuilder';
import PreviewPageBuilder from '@/components/PageBuilder/preview';
import PreviewProvider from '@/components/PreviewProvider';
import getClient from '@/sanity/client';
import { pageQuery, pagesQuery, subpageQuery } from '@/sanity/groq';
import { PeCopy, SanityKeyed, SitePage } from '@/sanity/schema';
import getPreview from '@/util/getPreview';
import { toPlainText } from '@portabletext/react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import s from './SubPage.module.scss';

/* ---------------------------- Param generation ---------------------------- */

// builds the list of sub-pages to statically generate
export async function generateStaticParams({
  params: { pageSlug },
}: {
  params: { pageSlug: string };
}) {
  const params = { pageSlug: `/${pageSlug}` };
  const subPages: SanityKeyed<SitePage>[] | null = await getClient().fetch(
    subpageQuery,
    params,
    { next: { revalidate: 0 } }
  );
  return (
    subPages?.map(({ slug }) => ({
      pageSlug,
      subSlug: slug.current.replace(`${params.pageSlug}/`, ''),
    })) ?? []
  );
}

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */
// All subpages are simply a wrapped PageBuilder with necessary DOM elements.

interface PageProps {
  params: { pageSlug: string; subSlug: string };
}

export default async function SubSubPage({
  params: { pageSlug, subSlug },
}: PageProps) {
  const preview = getPreview();
  const params = { pageSlug: `/${pageSlug}/${subSlug}` };
  const page: SitePage | null = await getClient(preview).fetch(
    pageQuery,
    params,
    { next: { tags: [`page:${params.pageSlug}`] } }
  );
  if (!page) notFound();

  return (
    <section aria-labelledby="subpage-header" className={s.container}>
      {preview && preview.token ? (
        <PreviewProvider token={preview.token}>
          <PreviewPageBuilder
            initialValue={page}
            query={pageQuery}
            params={params}
          />
        </PreviewProvider>
      ) : (
        <PageBuilder content={page.pageBuilder} />
      )}
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Metadata                                  */
/* -------------------------------------------------------------------------- */

export const revalidate = false;

// generate the metadata for the page.
export async function generateMetadata({
  params: { pageSlug, subSlug },
}: PageProps) {
  const params = { pageSlug: `/${pageSlug}/${subSlug}` };
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
