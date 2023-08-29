/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Tue Aug 29 2023
 * 2023 Design at Yale
 */
import DAY from '@/assets/svg/DAY';
import s from './HomeHero.module.scss';
import Link from 'next/link';

export default function HomeHero() {
  return (
    <div className={s.container}>
      <div className={s.cta}>
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
      </div>
      <div className={s.t1}>
        <h2>
          <Link href="/work">Work with the Studio&nbsp;→</Link>
        </h2>
        <p>
          Available for Fall 2023. <br />
          Or work with our Alumni year-round.
        </p>
      </div>
      <div className={s.t2}>
        <h2>
          <Link href="/work">Join the Community&nbsp;→</Link>
        </h2>
        <p>Yale students, fill out the form and join our GroupMe!</p>
      </div>
    </div>
  );
}
