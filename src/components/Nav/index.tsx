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
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaLinkedin,
  FaTwitterSquare,
} from 'react-icons/fa';
import { PiCaretRight, PiCaretLeft } from 'react-icons/pi';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  ['Work', '/work'],
  ['Community', '/community'],
  [<DAY key="/" className={s.buttons_day} />, '/'],
  ['About', '/about'],
  ['Alumni', '/alumni'],
] as const;

export default function Nav({ children }: PropsWithChildren) {
  const pathname = usePathname();
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
        role="navigation"
        aria-label="Primary navigation"
        id="nav-bar"
        ref={menuRef}
        onKeyDown={open ? onKeyDown : undefined}
      >
        <button
          type="button"
          aria-label="Open the context menu."
          aria-controls="nav-bar"
          aria-expanded={open}
          className={s.menu_toggle}
          onClick={() => setOpen(!open)}
        >
          <PiCaretRight />
          <PiCaretLeft />
        </button>
        <div className={s.light_gradient} role="presentation" />
        <ul className={s.buttons}>
          {NAV_LINKS.map(([contents, href]) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={pathname.startsWith(href) ? 'page' : undefined}
              >
                {contents}
              </Link>
            </li>
          ))}
        </ul>
        <div className={s.color_gradient} role="presentation" />
        <section
          className={classNames(s.menu, {
            [s.menu_open]: open,
          })}
          aria-hidden={!open ?? undefined}
          aria-live="assertive"
        >
          {/* <p>Design at Yale is a Studio and Community.</p> */}
          <ul className={s.nav_links}>
            {NAV_LINKS.map(
              ([contents, href]) =>
                href !== '/' && (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={
                        pathname.startsWith(href) ? 'page' : undefined
                      }
                    >
                      <span>{contents}</span>
                    </Link>
                  </li>
                )
            )}
          </ul>
          <ul className={s.socials}>
            <li>
              <a
                href="https://instagram.com/designatyale"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={!open ? -1 : undefined}
              >
                <FaInstagramSquare />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/designatyale"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={!open ? -1 : undefined}
              >
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/designatyale"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={!open ? -1 : undefined}
              >
                <FaTwitterSquare />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com/designatyale"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={!open ? -1 : undefined}
              >
                <FaFacebookSquare />
              </a>
            </li>
          </ul>
          <form className={s.nl}>
            <p>Sign up for our newsletter</p>
          </form>
        </section>
      </nav>
    </>
  );
}
