/*
 * client.ts
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 */

import { createClient } from 'next-sanity';
import { SanityClient } from '@sanity/client';
import { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION } from '@/env';

/**
 * Retrieves a client for interacting with Sanity data, either on the server
 * or on the client.
 *
 * @param preview An optional preview token when draftmode is enabled
 * @returns A Sanity client to perform fetches.
 */
export function getClient(preview?: { token?: string }): SanityClient {
  const client = createClient({
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
    apiVersion: SANITY_API_VERSION,
    useCdn: false,
    perspective: 'published',
  });

  // if in preview mode, switch to previewDrafts perspective
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts.');
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: 'previewDrafts',
    });
  }
  return client;
}

export default getClient;
