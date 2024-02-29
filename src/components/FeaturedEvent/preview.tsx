/*
 * preview.tsx
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 */
'use client';

import FeaturedEvent from '@/components/FeaturedEvent';
import { settingsQuery } from '@/sanity/groq';
import { SiteSettings } from '@/sanity/schema';
import unwrapReference from '@/util/unwrapReference';
import { useLiveQuery } from '@sanity/preview-kit';

interface PreviewFeaturedEventProps {
  initialValue: SiteSettings;
  options?: Parameters<typeof useLiveQuery>[3];
}

/**
 * A page builder client component which dynamically updates the content of the
 * page builder based on drafted changes in the Sanity Studio.
 */
export default function PreviewFeaturedEvent({
  initialValue,
  options,
}: PreviewFeaturedEventProps) {
  const [data] = useLiveQuery<SiteSettings>(
    initialValue,
    settingsQuery,
    undefined,
    options
  );
  if (!data || !data.featuredEvent) return null;
  return <FeaturedEvent event={unwrapReference(data.featuredEvent)} />;
}
