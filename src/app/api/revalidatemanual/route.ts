/*
 * route.ts
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 *
 * THIS IS AN UNSAFE  MANUAL REVALIDATION ROUTE. It is used locally to invalidate
 * the dev Next.js Data cache, as we can't use webhooks there. This allows
 * users to trigger local revalidation manually from the dashboard.
 *
 * Used in the document action for manually revalidating tags.
 */

import { NODE_ENV } from '@/env';
import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // fail on requests outside of the dev environment.
  if (NODE_ENV !== 'development') {
    return NextResponse.json({
      success: false,
      message: 'Manual route handler revalidation is only available locally.',
    });
  }

  try {
    let {
      body: { tags },
    } = (await req.json()) as { body: { tags: string[] } };
    tags.forEach(revalidateTag);
    return NextResponse.json({ success: true, tags });
  } catch (e) {
    return NextResponse.json({ success: false, error: e });
  }
}
