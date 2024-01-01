/*
 * actions.ts
 * Author: Evan Kirkiles
 * Created On Sat Dec 09 2023
 * 2023 Design at Yale
 */

import { useToast } from '@sanity/ui';
import { useState } from 'react';
import { TbBrandNextjs } from 'react-icons/tb';
import { DocumentActionComponent, DocumentActionsContext } from 'sanity';
import { SANITY_API_VERSION } from '@/env';
import { resolveTags, revalidateItem } from '@/sanity/lib/tagging';
import { isTaggedSanityDoc } from '@/sanity/lib/tagging';

const UpdatePageAction = (
  context: DocumentActionsContext
): DocumentActionComponent =>
  function ({ type, published, draft, id }) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const toast = useToast();
    const client = context.getClient({ apiVersion: SANITY_API_VERSION });
    const document = published || draft;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [loading, setLoading] = useState(false);
    if (!document) return null;
    if (!isTaggedSanityDoc(document)) return null;
    let tags: string[] = resolveTags(document);

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
          tags,
          toast,
        });
        setLoading(false);
      },
    };
  };

export default UpdatePageAction;
