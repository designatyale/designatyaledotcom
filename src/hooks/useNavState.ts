/*
 * useNavState.ts
 * Author: evan kirkiles
 * Created On Mon Aug 28 2023
 * 2023 Design at Yale
 */
'use client';

import { usePathname } from 'next/navigation';
import {
  KeyboardEventHandler,
  RefObject,
  useCallback,
  useEffect,
  useState,
} from 'react';

const SCROLL_TRIGGER_DEPTH = 20;
const FOCUS_SELECTOR =
  'a[href]:not([disabled]), button:not([disabled]), input:not([disabled])';

interface UseNavStateOptions {
  menuRef: RefObject<HTMLDivElement>;
  buttonRef: RefObject<HTMLButtonElement>;
}

/**
 * A helper hook to be used by your eventual implementation of a Nav Bar. Aids a lot
 * with accessibility, viewport width tracking, focus trapping, etc. Simply pass
 * it a reference to your menu open button and your actual menu. E.g.:
 * ```
 * const menuRef = useRef<HTMLDivElement>(null);
 * const buttonRef = useRef<HTMLButtonElement>(null);
 * const { open, setOpen, scrolled, onKeyDown } = useNavState({ menuRef, buttonRef });
 *
 * return (
 *   <>
 *    <div (UNDERLAY) />
 *    <nav ref={menuRef} onKeyDown={onKeyDown}>
 *      <button ref={buttonRef}>MENU</button>
 *      ...
 *    </nav>
 *  </>
 * );
 * ```
 * Place all of the above outside of the flow of your main body.
 */
export default function useNavState({ menuRef, buttonRef }: UseNavStateOptions) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 1. Close the nav menu on path change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // 2. Close the nav menu on large screens or on ESC-click
  useEffect(() => {
    // 2.1 close the menu on large screens
    const mql = window.matchMedia('(min-width: 768px)');
    function onLarge({ matches }: MediaQueryListEvent) {
      setOpen((prev) => !matches && prev);
    }
    // 2.2 set focus to button once menu is closed
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    }
    // 2.3 also track scroll state for when not at top of page
    function onScroll() {
      setScrolled(window.scrollY > SCROLL_TRIGGER_DEPTH);
    }

    // apply event listeners
    mql.addEventListener('change', onLarge, false);
    window.addEventListener('keydown', onKeyDown, false);
    window.addEventListener('scroll', onScroll, false);
    return () => {
      // remove event listeners on unmount
      mql.removeEventListener('change', onLarge, false);
      window.removeEventListener('keydown', onKeyDown, false);
      window.removeEventListener('scroll', onScroll, false);
    };
  }, [buttonRef]);

  // 3. Focus trap when nav menu is open.
  const focusEls =
    menuRef.current?.querySelectorAll<HTMLElement>(FOCUS_SELECTOR) ?? [];
  const firstEl = focusEls[0];
  const lastEl = focusEls[focusEls.length - 1];
  const onKeyDown: KeyboardEventHandler = useCallback(
    (e) => {
      if (e.key === 'Tab' || e.keyCode === 9) {
        // moving backwards
        if (e.shiftKey) {
          if (document.activeElement === firstEl) {
            lastEl.focus();
            e.preventDefault();
          }
          // moving forwards
        } else {
          if (document.activeElement === lastEl) {
            firstEl.focus();
            e.preventDefault();
          }
        }
      }
    },
    [firstEl, lastEl]
  );

  // 4. Prevent screenreader escaping from the menu when open. Assumes that
  // all of your content is in header, main, and footer. If you use the provided
  // layout setup, it will be.
  useEffect(() => {
    if (open) {
      document
        .querySelectorAll('header,main,footer')
        ?.forEach((el) => el.setAttribute('aria-hidden', 'true'));
    } else {
      document
        .querySelectorAll('header,main,footer')
        ?.forEach((el) => el.setAttribute('aria-hidden', 'true'));
    }
  }, [open]);

  return {
    open,
    setOpen,
    scrolled,
    onKeyDown: open ? onKeyDown : undefined,
  };
}
