/*
 * layout.tsx
 * Author: evan kirkiles
 * Created On Mon Aug 28 2023
 * 2023 Design at Yale
 *
 * A basic layout template for you to use as you implement components.
 */

import SkipLink from '@/components/SkipLink';
import VisualEditing from '@/sanity/loader/VisualEditing';
import { draftMode } from 'next/headers';
import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <SkipLink />
      {/* <NavBar >...</NavBar> */}
      <main>{children}</main>
      {/* <Footer /> */}
      {draftMode().isEnabled && <VisualEditing />}
    </>
  );
}
