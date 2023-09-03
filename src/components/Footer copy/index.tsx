/*
 * index.tsx
 * author: evan kirkiles
 * created on Mon Aug 14 2023
 * 2023 17o1 Records
 */
import DAYLogo from '@/assets/svg/DAYLogo';
import s from './Footer.module.scss';
import Link from 'next/link';
import getPreview from '@/util/getPreview';
import BackToTop from '@/components/Footer/scrollTop';

export default function Footer() {
  const preview = getPreview();

  return (
    <footer className={s.container}>
      {preview && (
        <a className={s.exit_preview_button} href="/api/exit-preview">
          You are in preview mode, where drafted changes to the site&apos;s
          content will update in realtime. Click on this button to return to
          viewing the site normally, or visit `/api/exit-preview`.
        </a>
      )}
      <div className={s.footer}>
        <div className={s.row}>
          <section className={s.section}>
            <h2>JOIN US</h2>
            <p>
              Want to be a part of 17o1? We&apos;re looking for music lovers of
              all kinds to expand our team!
            </p>
            <Link href="/about/join-us" className={s.section_button}>
              Join 17O1
            </Link>
          </section>
          <section className={s.section}>
            <h2>MORE LINKS</h2>
            <ul>
              <li>
                <BackToTop className={s.back_to_top}>Back to top ↑</BackToTop>
              </li>
              <li>
                <Link href="/about/our-team">Our Team</Link>
              </li>
              <li>All Posters</li>
              <li>Privacy</li>
              <li>Cookies</li>
            </ul>
          </section>
        </div>
        <div className={s.row}>
          <section className={s.section}>
            <h2>NEWSLETTER</h2>
            <p>
              Sign up for our newsletter to receive updates on 17o1 happenings.
            </p>
            <form>
              <input type="email" placeholder="Your email..." required />
              <button type="submit">Submit</button>
            </form>
          </section>
          <section className={s.section}>
            <h2>COLOPHON</h2>
            <p>A website by</p>
            <a
              href="https://designatyale.com"
              rel="noopener noreferrer"
              target="_blank"
              aria-label="Visit the Design at Yale website."
              className={s.day_logo}
              tabIndex={-1}
            >
              <DAYLogo />
            </a>
            <p>
              ...aka{' '}
              <a
                href="https://designatyale.com"
                rel="noopener noreferrer"
                target="_blank"
                aria-label="Visit the Design at Yale website."
              >
                Design at Yale.
              </a>
            </p>
            <p>T: ABC Favorit Mono.</p>
            <p>S: Next, Sanity.</p>
          </section>
        </div>
      </div>
    </footer>
  );
}
