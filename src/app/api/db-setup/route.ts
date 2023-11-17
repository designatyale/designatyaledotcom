/*
 * route.ts
 * Author: Evan Kirkiles
 * Created On Fri Nov 17 2023
 * 2023 Design at Yale
 */

import seed from '@/lib/seed';
import { NextResponse } from 'next/server';

export async function GET() {
  if (process.env.NODE_ENV !== 'development')
    return new NextResponse('401 unauthorized.', { status: 401 });
  const body = await seed();
  return new NextResponse(JSON.stringify(body), { status: 200 });
}
