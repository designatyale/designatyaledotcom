/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Tue Sep 05 2023
 * 2023 Design at Yale
 */

import { ALGOLIA_ADMIN_API_KEY, ALGOLIA_APP_ID, NODE_ENV } from '@/env';
import getClient from '@/sanity/client';
import algoliasearch from 'algoliasearch';
import indexer from 'sanity-algolia';
import { SanityDocumentStub } from 'next-sanity';
import { NextResponse } from 'next/server';

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
  const sanityAlgolia = indexer(
    {
      member: {
        index: algolia.initIndex('member'),
        projection: `{
          name,
          slug,
          about,
          class_year,
          search_hidden,
          socials[] { ... },
          design_tags[] -> {
            _id,
            title,
            color {
              hex
            }
          }
        }`,
      },
      event: {
        index: algolia.initIndex('event'),
        projection: `{
          title,
          slug,
          "pictureUrl": picture.asset->url,
          about,
          search_hidden,
          location,
          date,
          design_tags[] -> {
            _id,
            title,
            color {
              hex
            }
          }
      }`,
      },
    },
    (document: SanityDocumentStub) => {
      switch (document._type) {
        case 'member':
        case 'event':
        default:
          return document;
      }
    },
    (document: SanityDocumentStub) => {
      if (document.hasOwnProperty('search_hidden'))
        return !document.search_hidden;
      return true;
    }
  );

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
