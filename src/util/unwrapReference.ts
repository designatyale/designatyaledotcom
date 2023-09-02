/*
 * unwrapReference.ts
 * author: evan kirkiles
 * created on Fri Aug 25 2023
 * 2023 17o1 Records
 */

import {
  SanityKeyed,
  SanityKeyedReference,
  SanityReference,
} from '@/sanity/schema';
import { SanityDocument } from 'next-sanity';

type ResolvedReferences<T> =
  // match `SanityKeyedReference` and unwrap via `infer U`
  T extends SanityKeyedReference<infer U>
    ? SanityKeyed<U>
    : // match `SanityReference` and unwrap via `infer U`
    T extends SanityReference<infer U>
    ? U
    : // match arrays, unwrap with `T[number]`,
    // recursively run through `ResolvedReferences`
    // then re-wrap in an another array
    T extends any[]
    ? Array<ResolvedReferences<T[number]>>
    : // match objects, then utilize map types to
    // recursively run children through `ResolvedReferences`
    T extends Record<string, unknown>
    ? { [P in keyof T]: ResolvedReferences<T[P]> }
    : T;

export default function unwrapReference<
  _T extends SanityKeyedReference<any> | SanityReference<any>,
>(obj: _T): ResolvedReferences<_T> {
  if (obj._type === 'reference')
    throw new Error('Asset reference has not been expanded!');
  return obj as unknown as ResolvedReferences<_T>;
}
