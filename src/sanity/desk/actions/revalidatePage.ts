/* eslint-disable react-hooks/rules-of-hooks */
/*
 * revalidatePage.ts
 * Author: evan kirkiles
 * Created On Mon Aug 28 2023
 * 2023 Design at Yale
 */
import { SitePage } from '@/sanity/schema';
import { useToast } from '@sanity/ui';
import { useState } from 'react';
import { TbBrandNextjs } from 'react-icons/tb';
import { DocumentActionComponent, DocumentActionsContext } from 'sanity';
import { SANITY_API_VERSION } from '@/env';
import { revalidateItem } from '@/sanity/desk/actions/util';

/**
 * The UpdatePageAction provides a way to manually revalidate Next.js 13
 * tags for pages to regenerate a page once its data has been published. For
 * whatever reason, pages can sometimes regress to stale Vercel Data Cache data.
 * This button is just a failsafe to allow remuneration when that happens.
 *
 * This action is only available in Site Page document types for now.
 */
const UpdatePageAction = (
  context: DocumentActionsContext
): DocumentActionComponent =>
  function ({ type, published, draft, id }) {
    const toast = useToast();
    const client = context.getClient({ apiVersion: SANITY_API_VERSION });
    const document: SitePage | null = (published || draft) as any;
    const [loading, setLoading] = useState(false);
    if (type !== 'site_page') return null;

    return {
      label: 'Manual Page Update',
      icon: TbBrandNextjs,
      tone: 'positive',
      disabled: loading,
      onHandle: async () => {
        setLoading(true);
        await revalidateItem({
          client,
          id,
          tags: [`page:${document?.slug.current}`],
          toast,
        });
        setLoading(false);
      },
    };
  };

export default UpdatePageAction;
