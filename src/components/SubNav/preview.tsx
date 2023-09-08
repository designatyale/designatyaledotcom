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
import unwrapReference from '@/util/unwrapReference';
import { useLiveQuery } from '@sanity/preview-kit';

interface PreviewSubNavProps {
  baseHref: string;
  initialValue: Pick<SitePage, 'rootSubPageTitle' | 'subpageOrder'>;
  query: Parameters<typeof useLiveQuery>[1];
  params?: Parameters<typeof useLiveQuery>[2];
  options?: Parameters<typeof useLiveQuery>[3];
}
/**
 * A page builder client component which dynamically updates the content of the
 * page builder based on drafted changes in the Sanity Studio.
 */
export default function PreviewSubNav({
  baseHref,
  initialValue,
  query,
  params,
  options,
}: PreviewSubNavProps) {
  const [data] = useLiveQuery(initialValue, query, params, options);
  if (!data) return null;
  return (
    <SubNav
      baseTitle={data.rootSubPageTitle}
      baseHref={baseHref}
      subPages={data.subpageOrder?.map(unwrapReference)}
    />
  );
}
