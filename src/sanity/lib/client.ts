/*
 * client.ts
 * author: Evan Kirkiles
 * created on Sat Nov 18 2023
 * 2023 Design at Yale
 *
 * https://github.com/sanity-io/template-nextjs-personal-website/blob/main/sanity/lib/client.ts
 */
import { createClient } from '@sanity/client/stega';

import {
  apiVersion,
  dataset,
  projectId,
  revalidateSecret,
  studioUrl,
} from '@/sanity/lib/api';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // If webhook revalidation is setup we want the freshest content, if not then it's best to use the speedy CDN
  useCdn: revalidateSecret ? false : true,
  perspective: 'published',
  stega: {
    studioUrl,
    // logger: console,
  },
});
