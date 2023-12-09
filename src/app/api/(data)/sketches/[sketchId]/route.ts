/*
 * route.ts
 * Author: Evan Kirkiles
 * Created On Fri Nov 17 2023
 * 2023 Design at Yale
 */

import { removeBigInt } from '@/app/api/(data)/sketches/utils';
import { API_BACKEND_SECRET, SANITY_WEBHOOK_SECRET } from '@/env';
import { db } from '@/lib/kysely';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: {
    sketchId: string;
  };
}

export async function GET(
  req: NextRequest,
  { params: { sketchId } }: RouteParams
) {
  const secret = req.nextUrl.searchParams.get('SECRET');
  if (!secret || secret !== API_BACKEND_SECRET)
    return NextResponse.json({ success: false }, { status: 401 });
  const result = await db
    .selectFrom('sketches')
    .where('id', '=', parseInt(sketchId))
    .execute();
  return NextResponse.json(removeBigInt(result), { status: 200 });
}

export async function PUT(
  req: NextRequest,
  { params: { sketchId } }: RouteParams
) {
  const secret = req.nextUrl.searchParams.get('SECRET');
  if (!secret || secret !== API_BACKEND_SECRET)
    return NextResponse.json({ success: false }, { status: 401 });

  const favorited = !!(await req.json()).favorited;
  const result = await db
    .updateTable('sketches')
    .where('id', '=', parseInt(sketchId))
    .set({ favorited })
    .returningAll()
    .executeTakeFirst();
  return NextResponse.json(removeBigInt(result), { status: 200 });
}

export async function DELETE(
  req: NextRequest,
  { params: { sketchId } }: RouteParams
) {
  const secret = req.nextUrl.searchParams.get('SECRET');
  if (!secret || secret !== API_BACKEND_SECRET)
    return NextResponse.json({ success: false }, { status: 401 });

  const result = await db
    .deleteFrom('sketches')
    .where('id', '=', parseInt(sketchId))
    .execute();
  return NextResponse.json(removeBigInt(result), { status: 200 });
}
