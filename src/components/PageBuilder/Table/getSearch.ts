/*
 * getSearch.ts
 * Author: evan kirkiles
 * Created On Tue Sep 05 2023
 * 2023 Design at Yale
 */
import { searchClient } from '@/util/algolia';
import { cache } from 'react';

export const revalidate = 3600; // revalidate the data at most every 6 hours

export const getInitialSearchState = cache(async (index: string) =>
  searchClient.initIndex(index).search('', {})
);
