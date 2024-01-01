/*
 * tagging.ts
 * author: Evan Kirkiles
 * created on Mon Nov 20 2023
 * 2023 Design at Yale
 */

import { SitePage, SiteHome, SiteSettings } from '@/sanity/types';
import assertUnreachable from '@/util/assertUnreachable';
import { ToastContextValue } from '@sanity/ui';
import { SanityDocument } from 'next-sanity';
import { SanityClient } from 'sanity';

// Update the below to add new 'sanity tagged elements'
export type TaggedSanityDoc = SitePage | SiteHome | SiteSettings;
const SanityDocTags = [
  'site_page',
  'site_settings',
  'site_home',
] as const satisfies Readonly<TaggedSanityDoc['_type'][]>;

export function isTaggedSanityDoc(
  document: SanityDocument
): document is TaggedSanityDoc {
  return SanityDocTags.includes(document._type as any);
}

/**
 * Returns the internal Next.js tags related to a document.
 */
export function resolveTags(document: TaggedSanityDoc): string[] {
  switch (document._type) {
    case 'site_page':
      return [`site_page:${document.slug?.current}`];
    case 'site_home':
      return ['site_home'];
    case 'site_settings':
      return ['site_settings'];
  }
  return assertUnreachable(document);
}

interface RevalidateTagProps {
  client: SanityClient;
  id: string;
  tags: string[];
  toast?: ToastContextValue;
}

export async function revalidateItem({
  client,
  id,
  tags,
  toast,
}: RevalidateTagProps) {
  try {
    // in development, use the unsafe route handler
    if (process.env.NODE_ENV === 'development') {
      await fetch(`/api/revalidate-tags`, {
        method: 'POST',
        body: JSON.stringify({ tags }),
      });
      toast?.push({
        status: 'success',
        title: `Locally revalidated ${tags}.`,
      });
    } else {
      // always trigger the webhook using a patch operation, as we don't want
      // the production site to fall out of sync.
      await client
        .patch(id)
        .set({ last_revalidated: new Date().toISOString() })
        .commit();
      toast?.push({
        status: 'success',
        title: `Revalidated ${tags}.`,
      });
    }
  } catch (e) {
    console.error(e);
    toast?.push({
      status: 'error',
      title: `Failed revalidation of ${tags}`,
    });
  }
}
