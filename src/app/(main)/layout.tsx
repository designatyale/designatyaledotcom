/*
 * layout.tsx
 * Author: evan kirkiles
 * Created On Mon Aug 28 2023
 * 2023 Design at Yale
 *
 * A basic layout template for you to use as you implement components.
 */

import SkipLink from '@/components/SkipLink';
import { PropsWithChildren } from 'react';
import s from './Layout.module.scss';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import Providers from '@/app/(main)/providers';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Providers>
      <SkipLink />
      <Nav>hi</Nav>
      <main>{children}</main>
      <Footer />
    </Providers>
  );
}
