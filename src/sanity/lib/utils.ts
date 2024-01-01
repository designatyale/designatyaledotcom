/*
 * utils.ts
 * author: Evan Kirkiles
 * created on Sat Nov 18 2023
 * 2023 Design at Yale
 *
 * https://github.com/sanity-io/template-nextjs-personal-website/blob/main/sanity/lib/utils.ts
 */

import createImageUrlBuilder from '@sanity/image-url';
import type { Path } from 'sanity';
import { dataset, projectId } from '@/sanity/lib/api';
import {
  SanityImageAsset,
  SanityKeyedReference,
  SanityReference,
} from '@/sanity/types';
import { EncodeDataAttributeCallback } from '@sanity/react-loader/rsc';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

export const urlForImage = (source: SanityImageAsset) => {
  return imageBuilder?.image(source).auto('format').fit('max');
};

export function urlForOpenGraphImage(image: SanityImageAsset) {
  return urlForImage(image).width(1200).height(627).fit('crop').url();
}

export function resolveHref(
  documentType?: string,
  slug?: string
): string | undefined {
  switch (documentType) {
    case 'site_home':
      return '/';
    case 'site_page':
      return slug ? `/${slug}` : undefined;
    default:
      console.warn('Invalid document type:', documentType);
      return undefined;
  }
}

export type ResolvedReference<T> =
  // match `SanityKeyedReference` and unwrap via `infer U`
  T extends SanityKeyedReference<infer U>
    ? U
    : // match `SanityReference` and unwrap via `infer U`
      T extends SanityReference<infer U>
      ? U
      : never;

export function unwrapReference<
  T extends { _type: any },
  Ref extends SanityKeyedReference<T> | SanityReference<T>,
>(obj: Ref): ResolvedReference<Ref> {
  if (obj._type === 'reference')
    throw new Error('Asset reference has not been expanded!');
  return obj as unknown as ResolvedReference<Ref>;
}

export interface SanityContentDataView<T> {
  data: T;
  encodeDataPrefix?: Path;
  encodeDataAttribute?: EncodeDataAttributeCallback;
}
