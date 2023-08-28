/*
 * augmentPublish.ts
 * Author: evan kirkiles
 * Created On Mon Aug 28 2023
 * 2023 Design at Yale
 *
 * Augments the Publish action to automatically revalidate a page when it is
 * published.
 */

import { SANITY_API_VERSION } from '@/env';
import { revalidateItem } from '@/sanity/desk/actions/util';
import { SitePage } from '@/sanity/schema';
import { useToast } from '@sanity/ui';
import { DocumentActionComponent, DocumentActionsContext } from 'sanity';

// how long to delay between publishing and revalidating
const PROPAGATION_WAIT_TIME_MS = 2000;

function augmentPublishAction(
  original: DocumentActionComponent,
  context: DocumentActionsContext
) {
  const client = context.getClient({ apiVersion: SANITY_API_VERSION });
  const BetterAction: DocumentActionComponent = (props) => {
    const toast = useToast();
    const originalResult = original(props);
    return {
      ...originalResult,
      label: originalResult?.label || 'Publish',
      onHandle: async () => {
        originalResult?.onHandle?.();
        if (props.type !== 'site_page') return;
        const document: SitePage = (props.published || props.draft) as any;
        setTimeout(
          () =>
            revalidateItem({
              client,
              id: props.id,
              tags: [`page:${document?.slug.current}`],
              toast,
            }),
          PROPAGATION_WAIT_TIME_MS
        );
      },
    };
  };
  return BetterAction;
}

export default augmentPublishAction;
