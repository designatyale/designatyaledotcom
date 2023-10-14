/*
 * route.ts
 * Author: Evan Kirkiles
 * Created On Fri Oct 13 2023
 * 2023 Design at Yale
 *
 * BACKGROUND:
 * https://github.com/evankirkiles/nextjs-broken-data-cache-demo
 */

import { NextRequest, NextResponse } from 'next/server';
// cache types for intellisense
import FetchCache from 'next/dist/server/lib/incremental-cache/fetch-cache';
import type { IncrementalCache } from 'next/dist/server/lib/incremental-cache';

declare global {
  var __incrementalCache: IncrementalCache & { cacheHandler: FetchCache };
}

export const dynamic = 'force-dynamic';

export function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const BUILD_SECRET = searchParams.get('BUILD_SECRET');
  if (!BUILD_SECRET || BUILD_SECRET !== process.env.BUILD_SECRET) {
    return NextResponse.json('', { status: 401 });
  }

  try {
    const { cacheHandler } = globalThis.__incrementalCache;
    const endpoint = new URL(cacheHandler['cacheEndpoint']);
    const SUSPENSE_CACHE_URL = endpoint.hostname;
    const SUSPENSE_CACHE_ENDPOINT = endpoint.pathname.replace('/', '');
    const SUSPENSE_CACHE_AUTH_TOKEN = cacheHandler['headers'][
      'Authorization'
    ].replace('Bearer ', '');
    return NextResponse.json(
      `SUSPENSE_CACHE_URL=${SUSPENSE_CACHE_URL} SUSPENSE_CACHE_ENDPOINT=${SUSPENSE_CACHE_ENDPOINT} SUSPENSE_CACHE_AUTH_TOKEN=${SUSPENSE_CACHE_AUTH_TOKEN}`
    );
  } catch (e) {
    console.error(e);
  }
  return NextResponse.json('');
}
