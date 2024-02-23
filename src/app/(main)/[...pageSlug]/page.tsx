/*
 * page.tsx
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 */

import getClient from '@/sanity/client';
import { pageQuery } from '@/sanity/groq';
import { PeCopy, SanityKeyed, SitePage } from '@/sanity/schema';
import { toPlainText } from '@portabletext/react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import METADATA from '@/app/metadata';
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlug';
import { loadPage } from '@/sanity/loader/loadQuery';
import { draftMode } from 'next/headers';
import NormalPagePreview from '@/app/(main)/[...pageSlug]/_page/preview';
import NormalPageContent from '@/app/(main)/[...pageSlug]/_page/content';

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */
// All subpages are simply a wrapped PageBuilder with necessary DOM elements.

interface PageProps {
  params: { pageSlug: string[] };
}

export default async function NormalPage({ params: { pageSlug } }: PageProps) {
  const initial = await loadPage(pageSlug.join('/'));
  if (draftMode().isEnabled)
    return <NormalPagePreview initial={initial} slug={pageSlug.join('/')} />;
  if (!initial.data) return notFound();
  return <NormalPageContent data={initial.data} />;
}

/* -------------------------------------------------------------------------- */
/*                                  Metadata                                  */
/* -------------------------------------------------------------------------- */

/* ---------------------------- Param generation ---------------------------- */

// builds the list of pages to statically generate
export async function generateStaticParams() {
  return generateStaticSlugs('site_page');
}

// generate the metadata for the page.
export async function generateMetadata({ params: { pageSlug } }: PageProps) {
  const params = { pageSlug: `/${pageSlug.join('/')}` };
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
