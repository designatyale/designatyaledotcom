/*
 * index.tsx
 * author: evan kirkiles
 * created on Mon Aug 14 2023
 * 2023 17o1 Records
 */
'use client';

import { PeActionButton } from '@/sanity/schema';
import s from './ActionButton.module.scss';
import Link from 'next/link';
import classNames from 'classnames';

export default function ActionButton({
  value,
  className,
}: {
  value: PeActionButton;
  className?: string;
}) {
  if (value.href.startsWith('/')) {
    return (
      <Link href={value.href} className={classNames(s.container, className)}>
        {value.content}
      </Link>
    );
  }
  return (
    <a
      href={value.href}
      className={classNames(s.container, className)}
      target="_blank"
      rel="noopener noreferrer"
    >
      {value.content}
    </a>
  );
}
