/*
 * button.tsx
 * Author: evan kirkiles
 * Created On Fri Sep 08 2023
 * 2023 Design at Yale
 */
'use client';

import { HTMLProps } from 'react';

export default function ShowcaseLink({
  children,
  targetId,
  ...props
}: HTMLProps<HTMLButtonElement> & { targetId: string }) {
  return (
    <button
      {...props}
      type="button"
      aria-label="Jump to section"
      onClick={() =>
        document.getElementById(targetId)?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center',
        })
      }
    >
      {children}
    </button>
  );
}
