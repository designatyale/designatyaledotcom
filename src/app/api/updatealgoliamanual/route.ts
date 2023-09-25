/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Tue Sep 05 2023
 * 2023 Design at Yale
 */

import { ALGOLIA_ADMIN_API_KEY, ALGOLIA_APP_ID, NODE_ENV } from '@/env';
import getClient from '@/sanity/client';
import algoliasearch from 'algoliasearch';
import { NextResponse } from 'next/server';
import buildSanityAlgolia from '@/app/api/algoliaUtils';

// init our admin Algolia instance
const algolia = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY);

// Fetch the _id of all the documents we want to index
const types = ['member', 'event'];
const query = `* [_type in $types && !(_id in path("drafts.**"))][]._id`;

export async function GET() {
  // fail on requests outside of the dev environment.
  if (NODE_ENV !== 'development') {
    return NextResponse.json({
      success: false,
      message: 'Manual route handler revalidation is only available locally.',
    });
  }

  // Configure this to match an existing Algolia index name
  const sanityAlgolia = buildSanityAlgolia(algolia);

  // add to algolia
  await getClient()
    .fetch(query, { types })
    .then((ids) => {
      console.log(ids);
      sanityAlgolia.webhookSync(getClient(), {
        ids: { created: ids, updated: [], deleted: [] },
      });
    });

  return NextResponse.json({ success: true });
}
