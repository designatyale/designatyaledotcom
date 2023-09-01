/*
 * preview.tsx
 * Author: evan kirkiles
 * Created On Fri Sep 01 2023
 * 2023 Design at Yale
 */
'use client';

import PageBuilder from '@/components/PageBuilder';
import SubNav from '@/components/SubNav';
import { SitePage } from '@/sanity/schema';
import { useLiveQuery } from '@sanity/preview-kit';

interface PreviewProps<T> {
  initialValue: T;
  query: Parameters<typeof useLiveQuery>[1];
  params?: Parameters<typeof useLiveQuery>[2];
  options?: Parameters<typeof useLiveQuery>[3];
}

interface PreviewSubNavProps {
  baseHref: string;
  page: PreviewProps<Pick<SitePage, 'rootSubPageTitle'>>;
  subpages: PreviewProps<SitePage[] | null>;
}

/**
 * A page builder client component which dynamically updates the content of the
 * page builder based on drafted changes in the Sanity Studio.
 */
export default function PreviewSubNav({
  baseHref,
  page: pq,
  subpages: sp,
}: PreviewSubNavProps) {
  const [page] = useLiveQuery(pq.initialValue, pq.query, pq.params, pq.options);
  const [subpages] = useLiveQuery(
    sp.initialValue,
    sp.query,
    sp.params,
    sp.options
  );
  if (!page || !subpages || !subpages.length) return null;
  return (
    <SubNav
      baseTitle={page.rootSubPageTitle}
      baseHref={baseHref}
      subPages={subpages}
    />
  );
}
