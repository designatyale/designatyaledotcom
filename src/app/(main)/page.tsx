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
import { SiteSettings } from '@/sanity/schema';
import getClient from '@/sanity/client';
import getPreview from '@/util/getPreview';
import { settingsQuery } from '@/sanity/groq';
import FeaturedEvent from '@/components/FeaturedEvent';
import unwrapReference from '@/util/unwrapReference';
import PreviewProvider from '@/components/PreviewProvider';
import PreviewFeaturedEvent from '@/components/FeaturedEvent/preview';

const Drawing = dynamic(() => import('@/components/Drawing'), {
  ssr: false,
});

/* -------------------------------------------------------------------------- */
/*                                    Page                                    */
/* -------------------------------------------------------------------------- */

export default async function Page() {
  const preview = getPreview();
  const settings: SiteSettings | null = await getClient(preview).fetch(
    settingsQuery,
    undefined,
    { cache: 'no-cache', next: { tags: [`settings`] } }
  );

  return (
    <main className={s.container}>
      {settings?.featuredEvent ? (
        preview && preview.token ? (
          <PreviewProvider token={preview.token}>
            <PreviewFeaturedEvent initialValue={settings} />
          </PreviewProvider>
        ) : (
          <FeaturedEvent event={unwrapReference(settings.featuredEvent)} />
        )
      ) : (
        <Drawing />
      )}
      <section className={s.cta}>
        <div className={s.cta_logo}>
          <DAY />
        </div>
        <h1 data-nosnippet>Design at Yale is&nbsp;a Studio and Community.</h1>
        <p>
          We are Yale&apos;s undergraduate design club. We run a small studio,
          host events exploring practice and industry across design disciplines,
          and have fun making things together.
        </p>
      </section>
      <section className={s.t1}>
        <h2>
          <a
            href="https://docs.google.com/forms/d/e/1FAIpQLSe827RJjsBiA_sfyYtNAxAWIaMk83y0wKt47jnD6cvMC7dl5g/viewform?usp=sf_link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join the Studio&nbsp;→
          </a>
        </h2>
        <p>
          Our studio applications are open until September 20th, 2024!
        </p>
      </section>
      <section className={s.t2}>
        <h2>
          <Link href="/studio">Work With Us&nbsp;→</Link>
        </h2>
        <p>Available for Fall 2024—or work with our Alumni year-round.</p>
      </section>
    </main>
  );
}

export const revalidate = false;
