/*
 * route.ts
 * Author: Evan Kirkiles
 * Created On Fri Nov 17 2023
 * 2023 Design at Yale
 */

import { db } from '@/lib/kysely';
import { NextRequest } from 'next/server';

interface RouteParams {
  params: {
    sketchId: string;
  };
}

export async function DELETE(
  req: NextRequest,
  { params: { sketchId } }: RouteParams
) {
  await db.deleteFrom('sketches').where('id', '==', parseInt(sketchId));
}
