/*
 * page.tsx
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 */

import { Studio } from '@/app/(sanity)/studio/[[...index]]/Studio';

export const dynamic = 'force-static';
export { metadata } from 'next-sanity/studio/metadata';
export { viewport } from 'next-sanity/studio/viewport';

export default function StudioPage() {
  return (
    <main style={{ gridArea: 'main' }}>
      <Studio />
    </main>
  );
}