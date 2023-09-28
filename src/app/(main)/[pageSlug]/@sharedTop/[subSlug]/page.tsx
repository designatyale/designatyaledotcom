/*
 * page.tsx
 * Author: Evan Kirkiles
 * Created On Wed Sep 27 2023
 * 2023 Design at Yale
 */

import PageBuilder from '@/components/PageBuilder';
import PreviewPageBuilder from '@/components/PageBuilder/preview';
import PreviewProvider from '@/components/PreviewProvider';
import SubNav from '@/components/SubNav';
import PreviewSubNav from '@/components/SubNav/preview';
import getClient from '@/sanity/client';
import { pageQuery } from '@/sanity/groq';
import { SitePage } from '@/sanity/schema';
import getPreview from '@/util/getPreview';
import unwrapReference from '@/util/unwrapReference';
import { notFound } from 'next/navigation';

interface PageProps {
  params: { pageSlug: string; subSlug: string[] };
}

export default async function SharedTopComponent({
  params: { pageSlug, subSlug },
}: PageProps) {
  const preview = getPreview();
  const params = { pageSlug: `/${pageSlug}` };
  const page: SitePage | null = await getClient(preview).fetch(
    pageQuery,
    params,
    { next: { tags: [`page:/${pageSlug}`, `page:/${pageSlug}/${subSlug}`] } }
  );
  if (!page) notFound();

  // only show shared top component for pages found in the list of subpages.
  // otherwise, nothing is shown in that slot.
  const subPageSlug = `/${pageSlug}/${subSlug}`;
  if (
    !page.subpageOrder
      ?.map(unwrapReference)
      .some(({ slug }) => slug.current === subPageSlug)
  ) {
    return null;
  }

  return (
    <>
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
            initialValue={page}
            query={pageQuery}
            params={params}
          />
        </PreviewProvider>
      ) : (
        <>
          <PageBuilder content={page.pageBuilder} />
          <SubNav
            baseTitle={page.rootSubPageTitle}
            baseHref={params.pageSlug}
            subPages={page.subpageOrder?.map(unwrapReference)}
          />
        </>
      )}
    </>
  );
}
