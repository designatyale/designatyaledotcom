/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Fri Sep 01 2023
 * 2023 Design at Yale
 */
'use client';

import { SitePage } from '@/sanity/schema';
import s from './SubNav.module.scss';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SubNavProps {
  baseTitle?: string;
  baseHref: string;
  subPages: Pick<SitePage, 'title' | 'slug'>[];
}

export default function SubNav({ baseTitle, baseHref, subPages }: SubNavProps) {
  const pathname = usePathname();

  return (
    <nav className={s.container} role="navigation" aria-label="Secondary menu">
      <ul>
        {[
          { title: baseTitle || '/', slug: { current: baseHref } },
          ...subPages,
        ].map(({ title, slug }) => {
          const link = (
            <Link
              href={slug.current}
              aria-current={pathname === slug.current ? 'page' : undefined}
              scroll={false}
            >
              {title}
            </Link>
          );
          return (
            <li key={slug.current}>
              {pathname === slug.current ? (
                <h2 id="subpage-header">{link}</h2>
              ) : (
                link
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
