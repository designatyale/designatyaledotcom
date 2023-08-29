/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Tue Aug 29 2023
 * 2023 Design at Yale
 */
'use client';

import { PropsWithChildren, useRef } from 'react';
import useNavState from '@/hooks/useNavState';
import classNames from 'classnames';
import s from './Nav.module.scss';
import DAY from '@/assets/svg/DAY';
import Link from 'next/link';

const NAV_LINKS = [
  ['Work', '/work'],
  ['Community', '/community'],
  [<DAY key="/" className={s.buttons_day} />, '/'],
  ['About', '/about'],
  ['Alumni', '/alumni'],
] as const;

export default function Nav({ children }: PropsWithChildren) {
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { open, setOpen, scrolled, onKeyDown } = useNavState({
    menuRef,
    buttonRef,
  });

  return (
    <>
      <div
        className={classNames(s.underlay, {
          [s.underlay_open]: open,
        })}
        role="presentation"
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      />
      <nav
        className={classNames(s.container, {
          [s.container__scrolled]: scrolled && !open,
        })}
        role="primary"
        ref={menuRef}
        onKeyDown={open ? onKeyDown : undefined}
      >
        <div className={s.light_gradient} role="presentation" />
        <ul className={s.buttons}>
          {NAV_LINKS.map(([contents, href]) => (
            <li key={href}>
              <Link href={href}>{contents}</Link>
            </li>
          ))}
        </ul>
        <div className={s.color_gradient} role="presentation" />
      </nav>
    </>
  );
}
