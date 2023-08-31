/*
 * layout.tsx
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 */

import type { Metadata } from 'next';
import { ABCDiatype } from '@/fonts';
import { ColorSchemeScript } from '@/util/earlyScripts';
import { SITE_URL } from '@/env';
import s from './Layout.module.scss';
import './globals.scss';

// Base metadata for the entire app
export const metadata: Metadata = {
  title: 'Design at Yale — A Studio and Community.',
  description:
    "Design at Yale is Yale's undergraduate design club. We run a small studio, host events exploring practice and industry across design disciplines, and have fun making things together.",
  metadataBase: new URL(SITE_URL),
};

/**
 * A root layout in which both the main app and the sanity studio are wrapped.
 * Apply font classes here to keep your DOM clean of unnecessary <div />'s.
 * Here, you can also add information about your favicon. Use this tool always:
 *  - https://realfavicongenerator.net
 * Then paste the HTML code here, the files in /public, and close the closing carets.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${ABCDiatype.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
          media="(prefers-color-scheme: light)"
        />
        {/* <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon-dark.png"
          media="(prefers-color-scheme: dark)"
        /> */}
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
          media="(prefers-color-scheme: light)"
        />
        {/* <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32-dark.png"
          media="(prefers-color-scheme: dark)"
        /> */}
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
          media="(prefers-color-scheme: light)"
        />
        {/* <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16-dark.png"
          media="(prefers-color-scheme: dark)"
        /> */}
        <link rel="manifest" href="/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color="#000000"
          media="(prefers-color-scheme: light)"
        />
        {/* <link
          rel="mask-icon"
          href="/safari-pinned-tab.svg"
          color="#ffffff"
          media="(prefers-color-scheme: dark)"
        /> */}
        <meta name="msapplication-TileColor" content="#ffc40d" />
        <ColorSchemeScript />
      </head>
      <body className={s.body}>{children}</body>
    </html>
  );
}
