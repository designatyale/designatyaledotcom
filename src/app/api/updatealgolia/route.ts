/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Tue Sep 05 2023
 * 2023 Design at Yale
 */

import {
  ALGOLIA_ADMIN_API_KEY,
  ALGOLIA_APP_ID,
  SANITY_WEBHOOK_SECRET,
} from '@/env';
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook';
import { NextRequest, NextResponse } from 'next/server';
import algoliasearch from 'algoliasearch';
import indexer from 'sanity-algolia';
import { Member } from '@/sanity/schema';
import { SanityDocumentStub } from 'next-sanity';
import getClient from '@/sanity/client';

// init our admin Algolia instance
const algolia = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_ADMIN_API_KEY);

export async function POST(req: NextRequest) {
  const body = await req.json();

  // first, validate the request signature if in dev
  if (process.env.NODE_ENV !== 'development') {
    const signature = req.headers.get(SIGNATURE_HEADER_NAME);
    if (!signature) return NextResponse.json({});
    const isValid = isValidSignature(
      JSON.stringify(body),
      signature,
      SANITY_WEBHOOK_SECRET
    );
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: 'Invalid signature.' },
        { status: 401 }
      );
    }
  }
  if (!body) {
    return NextResponse.json(
      { success: false, message: 'Invalid body.' },
      { status: 400 }
    );
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

  // Finally connect the Sanity webhook payload to Algolia indices via the
  // configured serializers and optional visibility function. `webhookSync` will
  // inspect the webhook payload, make queries back to Sanity with the `sanity`
  // client and make sure the algolia indices are synced to match.
  try {
    await sanityAlgolia.webhookSync(getClient(), body);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ success: false, error: e }, { status: 500 });
  }
}
