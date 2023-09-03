/*
 * BackToTop.tsx
 * author: evan kirkiles
 * created on Fri Aug 25 2023
 * 2023 17o1 Records
 */
'use client';

import { HTMLProps } from 'react';

export default function BackToTop({
  children,
  ...props
}: HTMLProps<HTMLButtonElement>) {
  return (
    <button
      {...props}
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      {children}
    </button>
  );
}
