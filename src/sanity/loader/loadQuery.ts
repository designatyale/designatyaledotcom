/*
 * loadQuery.ts
 * author: Evan Kirkiles
 * created on Sat Nov 18 2023
 * 2023 Design at Yale
 */
import 'server-only';

import { draftMode } from 'next/headers';

import { client } from '@/sanity/lib/client';
import { homeQuery, pageBySlugQuery, settingsQuery } from '@/sanity/lib/queries';
import { token } from '@/sanity/lib/token';
import { SitePage, SiteSettings, SiteHome } from '@/sanity/types';

import { queryStore } from './createQueryStore';

const serverClient = client.withConfig({
  token,
  stega: {
    // Enable stega if it's a Vercel preview deployment, as the Vercel Toolbar has controls that shows overlays
    enabled: process.env.VERCEL_ENV !== 'production',
  },
});

/**
 * Sets the server client for the query store, doing it here ensures that all data fetching in production
 * happens on the server and not on the client.
 * Live mode in `sanity/presentation` still works, as it uses the `useLiveMode` hook to update `useQuery` instances with
 * live draft content using `postMessage`.
 */
queryStore.setServerClient(serverClient);

const usingCdn = serverClient.config().useCdn;
// Automatically handle draft mode
export const loadQuery = ((query, params = {}, options = {}) => {
  const { perspective = draftMode().isEnabled ? 'previewDrafts' : 'published' } =
    options;
  // Don't cache by default
  let revalidate: NextFetchRequestConfig['revalidate'] = 0;
  // If `next.tags` is set, and we're not using the CDN, then it's safe to cache
  if (!usingCdn && Array.isArray(options.next?.tags)) {
    revalidate = false;
  } else if (usingCdn) {
    revalidate = 60;
  }
  return queryStore.loadQuery(query, params, {
    ...options,
    next: {
      revalidate,
      ...(options.next || {}),
    },
    perspective,
    // @TODO add support in `@sanity/client/stega` for the below
    // stega: {enabled: draftMode().isEnabled}
  });
}) satisfies typeof queryStore.loadQuery;

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */

export function loadSettings() {
  return loadQuery<SiteSettings>(
    settingsQuery,
    {},
    { next: { tags: ['site_settings', 'site_home', 'site_page'] } }
  );
}

export function loadHomePage() {
  return loadQuery<SiteHome | null>(homeQuery, undefined, {
    next: { tags: [`site_home`] },
  });
}

export function loadPage(slug: string) {
  return loadQuery<SitePage | null>(
    pageBySlugQuery,
    { slug },
    { next: { tags: [`site_page:${slug}`] } }
  );
}
