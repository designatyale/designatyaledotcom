/*
 * route.ts
 * Author: Evan Kirkiles
 * Created On Fri Nov 17 2023
 * 2023 Design at Yale
 */

import { db } from '@/lib/kysely';
import { NextResponse } from 'next/server';

export async function GET() {
  const items = await db.selectFrom('sketches').selectAll().limit(20).execute();
  return NextResponse.json(items, { status: 200 });
}
