/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Mon Aug 28 2023
 * 2023 Design at Yale
 *
 * A skip link is an accessible way for keyboard-only users to jump
 * directly to the main content of a page. It is the first-focusable
 * element in the page, and only visible on keyboard :focus.
 *
 * Refresh the page and use Alt+Tab to see it.
 *
 * You should probably change the styling to fit better your application.
 */
'use client';

import s from './SkipLink.module.scss';

export default function SkipLink() {
  return (
    <button
      onClick={() => {
        document.querySelector<HTMLElement>('main')?.focus();
      }}
      className={s.content_skip}
      data-nosnippet
    >
      Skip to content
    </button>
  );
}
