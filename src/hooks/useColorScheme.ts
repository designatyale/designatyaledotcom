/*
 * useColorScheme.ts
 * Author: evan kirkiles
 * Created On Mon Aug 28 2023
 * 2023 Design at Yale
 */

import { useReducer } from 'react';

const COLOR_SCHEMES = ['light', 'dark', 'auto'] as const;
type ColorScheme = (typeof COLOR_SCHEMES)[number];

/**
 * A hook to manage the color scheme (e.g. dark or light mode) of the site.
 */
export default function useColorScheme() {
  const [colorScheme, setColorScheme] = useReducer(
    (scheme: ColorScheme) => {
      localStorage.setItem('daylight-color-scheme', scheme);
      COLOR_SCHEMES.forEach((oldScheme) =>
        document.documentElement.classList.remove(`${oldScheme}-mode`)
      );
      document.documentElement.classList.add(`${scheme}-mode`);
      return scheme;
    },
    ((typeof window !== 'undefined' &&
      localStorage.getItem('daylight-color-scheme')) ||
      'auto') as ColorScheme
  );

  return { colorScheme, setColorScheme };
}
