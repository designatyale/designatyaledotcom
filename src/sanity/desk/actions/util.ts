/*
 * util.ts
 * Author: evan kirkiles
 * Created On Mon Aug 28 2023
 * 2023 Design at Yale
 *
 * This function defines how we revalidate Next.js tags from pages in different
 * browsers. It's a bit of a hack to get around the propagation time that exists
 * between when Sanity publishes a document and when it can actually be returned to
 * the Next.js page generator in a GROQ query.
 */

import { NODE_ENV } from '@/env';
import { ToastContextValue } from '@sanity/ui';
import { SanityClient } from 'sanity';

interface RevalidateItemProps {
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
}: RevalidateItemProps) {
  try {
    // in development, use the unsafe route handler
    if (NODE_ENV === 'development') {
      await fetch(`/api/revalidatemanual`, {
        method: 'POST',
        body: JSON.stringify({ tags }),
      });
    }
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
  } catch (e) {
    console.error(e);
    toast?.push({
      status: 'error',
      title: `Failed revalidation of ${tags}`,
    });
  }
}
