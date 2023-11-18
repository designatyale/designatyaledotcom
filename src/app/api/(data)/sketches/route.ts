/*
 * route.ts
 * Author: Evan Kirkiles
 * Created On Fri Nov 17 2023
 * 2023 Design at Yale
 */

import { removeBigInt } from '@/app/api/(data)/sketches/utils';
import { db } from '@/lib/kysely';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const prompt_id = req.nextUrl.searchParams.get('prompt');
  const favorited = req.nextUrl.searchParams.get('favorited');
  let items = db.selectFrom('sketches').selectAll().orderBy('createdAt desc');
  if (favorited !== null)
    items = items.where('favorited', '=', favorited === 'true');
  if (prompt_id !== null) items = items.where('prompt_id', '=', prompt_id);
  const result = await items.limit(50).execute();
  return NextResponse.json(result.map(removeBigInt), { status: 200 });
}
