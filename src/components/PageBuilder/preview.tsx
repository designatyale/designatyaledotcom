/*
 * preview.tsx
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 */
'use client';

import PageBuilder from '@/components/PageBuilder';
import { SitePage } from '@/sanity/schema';
import { useLiveQuery } from '@sanity/preview-kit';

interface PreviewPageBuilderProps<
  T extends 'pageBuilder' | 'rootSubPageBuilder',
> {
  initialValue: Pick<SitePage, T>;
  path?: T;
  query: Parameters<typeof useLiveQuery>[1];
  params?: Parameters<typeof useLiveQuery>[2];
  options?: Parameters<typeof useLiveQuery>[3];
}

/**
 * A page builder client component which dynamically updates the content of the
 * page builder based on drafted changes in the Sanity Studio.
 */
export default function PreviewPageBuilder<
  T extends 'pageBuilder' | 'rootSubPageBuilder',
>({
  initialValue,
  query,
  params,
  options,
  path = 'pageBuilder' as any,
}: PreviewPageBuilderProps<T>) {
  const [data] = useLiveQuery(initialValue, query, params, options);
  if (!data) return null;
  return <PageBuilder content={data[path] ?? []} isPreview />;
}
