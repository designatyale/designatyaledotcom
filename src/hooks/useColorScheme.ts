/*
 * useColorScheme.ts
 * Author: evan kirkiles
 * Created On Mon Aug 28 2023
 * 2023 Design at Yale
 */

import { useReducer } from 'react';

const COLOR_SCHEMES = ['light', 'dark', 'auto'] as const;
export type ColorScheme = (typeof COLOR_SCHEMES)[number];
interface ColorSchemeState {
  scheme: ColorScheme;
  evalScheme: Omit<ColorScheme, 'auto'>;
}

/**
 * A hook to manage the color scheme (e.g. dark or light mode) of the site.
 */
export default function useColorScheme() {
  const [colorScheme, setColorScheme] = useReducer(
    (_: ColorSchemeState, scheme: ColorScheme): ColorSchemeState => {
      localStorage.setItem('daylight-color-scheme', scheme);
      COLOR_SCHEMES.forEach((oldScheme) =>
        document.documentElement.classList.remove(`${oldScheme}-mode`)
      );
      let evalScheme = scheme;
      if (scheme == 'auto' && typeof window !== 'undefined') {
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        evalScheme = mql.matches ? 'dark' : 'light';
      }
      document.documentElement.classList.add(`${evalScheme}-mode`);
      return {
        scheme,
        evalScheme,
      };
    },
    ((typeof window !== 'undefined' &&
      localStorage.getItem('daylight-color-scheme')) ||
      'dark') as ColorScheme,
    (scheme): ColorSchemeState => {
      let evalScheme = scheme;
      if (scheme == 'auto' && typeof window !== 'undefined') {
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        evalScheme = mql.matches ? 'dark' : 'light';
      }
      return {
        scheme,
        evalScheme,
      };
    }
  );

  return { colorScheme, setColorScheme };
}
