/*
 * PagePreview.tsx
 * author: evan kirkiles
 * created on Sun Nov 19 2023
 * 2023 Design at Yale
 */

'use client';

import NormalPage from './content';
import { pageBySlugQuery } from '@/sanity/lib/queries';
import { useQuery } from '@/sanity/loader/useQuery';
import { SitePage } from '@/sanity/types';
import { QueryResponseInitial } from '@sanity/react-loader/rsc';

interface SitePagePreviewProps {
  initial: QueryResponseInitial<SitePage | null>;
  slug: string;
}

export default function NormalPagePreview({
  initial,
  slug,
}: SitePagePreviewProps) {
  const { data, encodeDataAttribute } = useQuery<SitePage | null>(
    pageBySlugQuery,
    { slug },
    { initial }
  );
  if (!data) return <div>Edit the site document to see the preview!</div>;
  return <NormalPage data={data} encodeDataAttribute={encodeDataAttribute} />;
}
