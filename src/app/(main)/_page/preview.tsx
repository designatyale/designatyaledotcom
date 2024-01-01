/*
 * preview.tsx
 * Author: Evan Kirkiles
 * Created On Sat Dec 09 2023
 * 2023 Design at Yale
 */
'use client';

import HomePageContent from '@/app/(main)/_page/content';
import { homeQuery } from '@/sanity/lib/queries';
import { useQuery } from '@/sanity/loader/useQuery';
import { SiteHome } from '@/sanity/types';
import { QueryResponseInitial } from '@sanity/react-loader/rsc';

interface HomePagePreviewProps {
  initial: QueryResponseInitial<SiteHome | null>;
}

export default function HomePagePreview({ initial }: HomePagePreviewProps) {
  const { data } = useQuery<SiteHome | null>(homeQuery, {}, { initial });
  if (!data) return <div>Edit the Home document to see the preview!</div>;
  return <HomePageContent data={data} />;
}
