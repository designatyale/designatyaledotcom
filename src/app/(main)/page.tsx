/*
 * page.tsx
 * Author: evan kirkiles
 * Created On Mon Aug 28 2023
 * 2023 Design at Yale
 */

// import getClient from '@/sanity/client';
// import { pageQuery } from '@/sanity/groq';
// import { SitePage } from '@/sanity/schema';
// import getPreview from '@/util/getPreview';
import s from './Root.module.scss';
import DAY from '@/assets/svg/DAY';
import Link from 'next/link';

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
      <section className={s.cta}>
        <div className={s.cta_logo}>
          <DAY />
        </div>
        <h1>
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
          <Link href="/work">Work with the Studio&nbsp;→</Link>
        </h2>
        <p>
          Available for Fall 2023. <br />
          Or work with our Alumni year-round.
        </p>
      </section>
      <section className={s.t2}>
        <h2>
          <Link href="/work">Join the Community&nbsp;→</Link>
        </h2>
        <p>Yale students, fill out the form and join our GroupMe!</p>
      </section>
    </article>
  );
}

export const revalidate = false;
