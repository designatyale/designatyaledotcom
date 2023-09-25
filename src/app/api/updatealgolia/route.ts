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
import getClient from '@/sanity/client';
import buildSanityAlgolia from '@/app/api/algoliaUtils';

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
  const sanityAlgolia = buildSanityAlgolia(algolia);

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
