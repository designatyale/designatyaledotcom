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
        <ul className={s.buttons}>
          <li>Studio</li>
          <li>Community</li>
          <li>
            <Link href="/">
              <DAY className={s.buttons_day} />
            </Link>
          </li>
          <li>About</li>
          <li>Alumni</li>
        </ul>
      </nav>
    </>
  );
}
