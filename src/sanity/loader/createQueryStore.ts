/*
 * createQueryStore.ts
 * Author: Evan Kirkiles
 * Created On Sat Dec 09 2023
 * 2023 Design at Yale
 *
 * https://github.com/sanity-io/template-nextjs-personal-website/blob/main/sanity/loader/createQueryStore.ts
 */

import { createQueryStore } from '@sanity/react-loader/rsc';

/**
 * The queryStore instance is shared in RSC and client components, and thus this file must be kept tiny
 * otherwise it will be included in the client bundle.
 * The API meant to be used from RSC components are exported from `./loadQuery.ts` and
 * client components should import from `./useQuery.ts`
 */
export const queryStore = createQueryStore({
  client: false,
  ssr: true,
});
