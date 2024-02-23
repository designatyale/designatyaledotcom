/*
 * page.tsx
 * Author: evan kirkiles
 * Created On Mon Aug 28 2023
 * 2023 Design at Yale
 */

import HomePageContent from '@/app/(main)/_page/content';
import { loadHomePage } from '@/sanity/loader/loadQuery';
import dynamic from 'next/dynamic';
import { draftMode } from 'next/headers';

const HomePagePreview = dynamic(() => import('@/app/(main)/_page/preview'));

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */
// The home page is still a PageBuilder, but adds some recirc links on the top.

export default async function HomePageRoute() {
  const initial = await loadHomePage();
  if (draftMode().isEnabled) return <HomePagePreview initial={initial} />;
  if (!initial.data) return <div>Home page missing.</div>;
  return <HomePageContent data={initial.data} />;
}

export const revalidate = false;
