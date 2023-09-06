/*
 * algolia.tsx
 * Author: evan kirkiles
 * Created On Tue Sep 05 2023
 * 2023 Design at Yale
 */
import { ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY } from '@/env';
import algoliasearch from 'algoliasearch/lite';

export const searchClient = algoliasearch(
  ALGOLIA_APP_ID,
  ALGOLIA_SEARCH_API_KEY
);

/* ----------------------------- Projected types ---------------------------- */

export interface AlgoliaMember extends Record<string, any> {}
