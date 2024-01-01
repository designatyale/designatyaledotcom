/*
 * locate.ts
 * Author: Evan Kirkiles
 * Created On Sat Dec 09 2023
 * 2023 Design at Yale
 *
 * https://github.com/sanity-io/template-nextjs-personal-website/blob/main/sanity/plugins/locate.ts
 */

import { map, Observable } from 'rxjs';
import {
  DocumentLocationResolver,
  DocumentLocationsState,
} from 'sanity/presentation';

import { resolveHref } from '@/sanity/lib/utils';

export const locate: DocumentLocationResolver = (params, context) => {
  if (params.type === 'site_settings') {
    return {
      message: 'This document is used on all pages',
      tone: 'caution',
    } satisfies DocumentLocationsState;
  }

  if (params.type === 'site_home' || params.type === 'site_page') {
    const doc$ = context.documentStore.listenQuery(
      `*[_id==$id || references($id)]{_type,slug,title}`,
      params,
      { perspective: 'previewDrafts' }
    ) as Observable<
      | {
          _type: string;
          slug: { current: string };
          title: string | null;
        }[]
      | null
    >;
    return doc$.pipe(
      map((docs) => {
        const isReferencedBySettings = docs?.some(
          (doc) => doc._type === 'site_settings'
        );
        switch (params.type) {
          case 'site_home':
            return isReferencedBySettings
              ? ({
                  locations: [
                    {
                      title:
                        docs?.find((doc) => doc._type === 'site_home')?.title ||
                        'Home',
                      href: resolveHref(params.type)!,
                    },
                  ],
                  tone: 'positive',
                  message: 'This document is used to render the landing page.',
                } satisfies DocumentLocationsState)
              : ({
                  tone: 'critical',
                  message: `The nav menu isn't linking to the home page. This might make it difficult for visitors to navigate your site.`,
                } satisfies DocumentLocationsState);
          case 'site_page':
            return {
              locations: docs
                ?.map((doc) => {
                  const href = resolveHref(doc._type, doc?.slug?.current);
                  return {
                    title: doc?.title || 'Untitled',
                    href: href!,
                  };
                })
                .filter((doc) => doc.href !== undefined),
              tone: isReferencedBySettings ? 'positive' : 'critical',
              message: isReferencedBySettings
                ? 'The nav menu is linking to this page'
                : "The nav menu isn't linking to this page. It can still be accessed if the visitor knows the URL.",
            } satisfies DocumentLocationsState;
          default:
            return {
              message: 'Unable to map document type to locations',
              tone: 'critical',
            } satisfies DocumentLocationsState;
        }
      })
    );
  }

  return null;
};
