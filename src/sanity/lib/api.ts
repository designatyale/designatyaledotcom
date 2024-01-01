/*
 * api.ts
 * author: Evan Kirkiles
 * created on Sat Nov 18 2023
 * 2023 Design at Yale
 *
 * https://github.com/sanity-io/template-nextjs-personal-website/blob/main/sanity/lib/api.ts
 */

import {
  SANITY_API_VERSION,
  SANITY_DATASET,
  SANITY_PROJECT_ID,
  SANITY_WEBHOOK_SECRET,
} from '@/env';

export const dataset = assertValue(
  SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
);

export const projectId = assertValue(
  SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
);

// see https://www.sanity.io/docs/api-versioning for how versioning works
export const apiVersion = SANITY_API_VERSION || '2023-06-21';

// See the app/api/revalidate/route.ts for how this is used
export const revalidateSecret = SANITY_WEBHOOK_SECRET;

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage);
  }

  return v;
}
/**
 * Used to configure edit intent links, for Presentation Mode, as well as to configure where the Studio is mounted in the router.
 */
export const studioUrl = '/studio';
