/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Tue Aug 29 2023
 * 2023 Design at Yale
 */
import RegistrationMark from '@/assets/svg/RegistrationMark';
import s from './Footer.module.scss';
import BackToTop from '@/components/Footer/scrollTop';
import Link from 'next/link';
import getPreview from '@/util/getPreview';
import DAY from '@/assets/svg/DAY';

export default function Footer() {
  const preview = getPreview();

  return (
    <footer className={s.container}>
      <div className={s.crop_lines} role="presentation">
        <RegistrationMark />
      </div>
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
            <h2>JOIN THE STUDIO</h2>
            <p>
              Want to be a close part of DAY? Studio member applications are
              open!
            </p>
            <Link href="/studio" className={s.section_button}>
              Join DAY Studio
            </Link>
          </section>
          <section className={s.section}>
            <h2>MORE LINKS</h2>
            <ul>
              <li>
                <BackToTop className={s.back_to_top}>Back to top ↑</BackToTop>
              </li>
              <li>
                <Link href="/studio">Studio</Link>
              </li>
              <li>
                <Link href="/community">Community</Link>
              </li>
              <li>
                <Link href="/community/events">Events</Link>
              </li>
              <li>
                <Link href="/work">Work</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
          </section>
        </div>
        <div className={s.row}>
          <section className={s.section}>
            <h2>NEWSLETTER</h2>
            <p>
              Sign up for our newsletter to receive updates on what&apos;s
              happening with DAY.
            </p>
            {/* Mailchimp signup */}
            <form
              action="https://designatyale.us20.list-manage.com/subscribe/post?u=5d9deb15439ca8c25e27f2744&amp;id=3a9365ecce&amp;f_id=00737aeaf0"
              method="post"
              id="mc-embedded-subscribe-form"
              name="mc-embedded-subscribe-form"
              target="_blank"
            >
              <input type="hidden" name="tags" value="3479484" />
              <input
                type="email"
                name="EMAIL"
                id="mce-EMAIL"
                placeholder="Your email..."
                required
              />
              <div
                aria-hidden="true"
                style={{ position: 'absolute', left: '-5000px' }}
              >
                <input
                  type="text"
                  name="b_5d9deb15439ca8c25e27f2744_3a9365ecce"
                  tabIndex={-1}
                />
              </div>
              <input
                type="submit"
                name="subscribe"
                id="mc-embedded-subscribe"
                value="Submit"
              />
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
              <DAY />
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
            <p>T: ABC Diatype.</p>
            <p>S: Next, Sanity.</p>
          </section>
        </div>
      </div>
    </footer>
  );
}
