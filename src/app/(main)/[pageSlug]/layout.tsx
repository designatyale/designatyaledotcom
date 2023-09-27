/*
 * layout.tsx
 * Author: evan kirkiles
 * Created On Fri Sep 01 2023
 * 2023 Design at Yale
 */

import getClient from '@/sanity/client';
import { pagesQuery } from '@/sanity/groq';
import { SitePage } from '@/sanity/schema';
import s from './Page.module.scss';
import { PropsWithChildren } from 'react';

/* ---------------------------- Param generation ---------------------------- */

// builds the list of sub-pages to statically generate
export async function generateStaticParams() {
  const pages: SitePage[] = await getClient().fetch(pagesQuery, undefined, {
    next: { revalidate: 0 },
  });
  return pages
    .filter(({ slug }) => slug.current.split('/').length === 2) // make sure only one slash (the start)
    .map(({ slug }) => ({
      pageSlug: slug.current.replace('/', ''),
    }));
}

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */
// All subpages are simply a wrapped PageBuilder with necessary DOM elements.

interface PageProps {
  sharedTop: React.ReactNode;
}

export default async function SubPageLayout({
  sharedTop,
  children,
}: PropsWithChildren<PageProps>) {
  return (
    <article className={s.container}>
      {sharedTop}
      {children}
    </article>
  );
}

export const revalidate = false;
