/*
 * page.tsx
 * Author: evan kirkiles
 * Created On Mon Aug 28 2023
 * 2023 Design at Yale
 */

import s from './Root.module.scss';
import DAY from '@/assets/svg/DAY';
import Link from 'next/link';
import dynamic from 'next/dynamic';

const Drawing = dynamic(() => import('@/app/(main)/drawing'), {
  ssr: false,
});

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

export default async function Page() {
  // const preview = getPreview();
  // const params = { pageSlug: `/` };
  // const page: SitePage | null = await getClient(preview).fetch(
  //   pageQuery,
  //   params,
  //   { next: { tags: [`page:${params.pageSlug}`] } }
  // );

  return (
    <article className={s.container}>
      <Drawing className={s.canvas} />
      <section className={s.cta}>
        <div className={s.cta_logo}>
          <DAY />
        </div>
        <h1 data-nosnippet>
          Design at Yale is a<br /> Studio and Community.
        </h1>
        <p>
          We are Yale&apos;s undergraduate design club. We run a small studio,
          host events exploring practice and industry across design disciplines,
          and have fun making things together.
        </p>
      </section>
      <section className={s.t1}>
        <h2>
          <Link href="/studio">Work with the Studio&nbsp;→</Link>
        </h2>
        <p>Available for Fall 2023—or work with our Alumni year-round.</p>
      </section>
      <section className={s.t2}>
        <h2>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLScn7wXT70fL68crb2IgtBYMJ-NObnrqlDpppMMCJkeVKQXIxQ/viewform"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join the Community&nbsp;→
          </a>
        </h2>
        <p>
          Yale students, fill out the form and keep your eyes out for events!
        </p>
      </section>
      {/* <div className={s.under_construction} data-nosnippet>
        WEBSITE IS UNDER CONSTRUCTION!
      </div> */}
    </article>
  );
}

export const revalidate = false;
