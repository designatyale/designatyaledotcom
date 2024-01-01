/*
 * useQuery.ts
 * author: Evan Kirkiles
 * created on Sat Nov 18 2023
 * 2023 Design at Yale
 */

import {
  type QueryParams,
  type QueryResponseInitial,
  useEncodeDataAttribute,
  type UseQueryOptionsDefinedInitial,
} from '@sanity/react-loader/rsc';

import { studioUrl } from '@/sanity/lib/api';

import { queryStore } from './createQueryStore';
import { SiteSettings } from '@/sanity/types';
import { settingsQuery } from '../lib/queries';

/**
 * Exports to be used in client-only or components that render both server and client
 */
export const useQuery = <
  QueryResponseResult = unknown,
  QueryResponseError = unknown,
>(
  query: string,
  params?: QueryParams,
  options?: UseQueryOptionsDefinedInitial<QueryResponseResult>
) => {
  const snapshot = queryStore.useQuery<QueryResponseResult, QueryResponseError>(
    query,
    params,
    options
  );

  const encodeDataAttribute = useEncodeDataAttribute(
    snapshot.data,
    snapshot.sourceMap,
    studioUrl
  );

  // Always throw errors if there are any
  if (snapshot.error) {
    throw snapshot.error;
  }

  return {
    ...snapshot,
    encodeDataAttribute,
  };
};

/**
 * Used by `./VisualEditing.tsx` to connect to `sanity/presentation`
 */
export const { useLiveMode } = queryStore;

/**
 * Loaders that are used in more than one place are declared here, otherwise they're colocated with the component
 */

export function useSettings(initial: QueryResponseInitial<SiteSettings>) {
  return useQuery<SiteSettings>(settingsQuery, {}, { initial });
}
