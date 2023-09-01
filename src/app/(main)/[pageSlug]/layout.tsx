/*
 * layout.tsx
 * Author: evan kirkiles
 * Created On Fri Sep 01 2023
 * 2023 Design at Yale
 */

import PageBuilder from '@/components/PageBuilder';
import PreviewPageBuilder from '@/components/PageBuilder/preview';
import PreviewProvider from '@/components/PreviewProvider';
import getClient from '@/sanity/client';
import { pageQuery, pagesQuery, subpageQuery } from '@/sanity/groq';
import { SanityKeyed, SitePage } from '@/sanity/schema';
import getPreview from '@/util/getPreview';
import { notFound } from 'next/navigation';
import s from './Page.module.scss';
import { PropsWithChildren } from 'react';
import SubNav from '@/components/SubNav';
import PreviewSubNav from '@/components/SubNav/preview';

/* ---------------------------- Param generation ---------------------------- */

// builds the list of sub-pages to statically generate
export async function generateStaticParams() {
  const pages: SitePage[] = await getClient().fetch(pagesQuery, undefined, {
    next: { revalidate: 0 },
  });
  return pages.map(({ slug }) => ({
    pageSlug: slug.current.replace('/', ''),
  }));
}

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */
// All subpages are simply a wrapped PageBuilder with necessary DOM elements.

interface PageProps {
  params: { pageSlug: string[] };
}

export default async function SubPageLayout({
  params: { pageSlug },
  children,
}: PropsWithChildren<PageProps>) {
  const preview = getPreview();
  const params = { pageSlug: `/${pageSlug}` };
  const page: SitePage | null = await getClient(preview).fetch(
    pageQuery,
    params,
    { next: { tags: [`page:${params.pageSlug}`] } }
  );
  if (!page) notFound();
  const subPages: SanityKeyed<SitePage>[] | null = await getClient(
    preview
  ).fetch(subpageQuery, params, { next: { tags: [`page:${params.pageSlug}`] } });

  return (
    <article className={s.container}>
      <h1>{page.title}</h1>
      {preview && preview.token ? (
        <PreviewProvider token={preview.token}>
          <PreviewPageBuilder
            initialValue={page}
            query={pageQuery}
            params={params}
          />
          <PreviewSubNav
            baseHref={params.pageSlug}
            page={{
              initialValue: page,
              query: pageQuery,
              params,
            }}
            subpages={{
              initialValue: subPages,
              query: subpageQuery,
              params,
            }}
          />
        </PreviewProvider>
      ) : (
        <>
          <PageBuilder content={page.pageBuilder} />
          {subPages?.length ? (
            <SubNav
              baseTitle={page.rootSubPageTitle}
              baseHref={params.pageSlug}
              subPages={subPages}
            />
          ) : null}
        </>
      )}
      {children}
    </article>
  );
}