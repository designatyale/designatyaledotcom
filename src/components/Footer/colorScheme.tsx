/*
 * colorTheme.tsx
 * Author: evan kirkiles
 * Created On Sat Sep 09 2023
 * 2023 Design at Yale
 */
'use client';

import useColorScheme, { ColorScheme } from '@/hooks/useColorScheme';
import React, { ChangeEventHandler, useCallback } from 'react';
import s from './Footer.module.scss';
import classNames from 'classnames';

export default function ColorScheme() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) =>
    setColorScheme(e.target.value as ColorScheme);

  return (
    <section
      aria-label="Color Scheme"
      className={classNames(s.section, s.section_noheight)}
    >
      <h2>COLOR SCHEME</h2>
      <div className={s.color_scheme}>
        {(['dark', 'light', 'auto'] as const).map((scheme) => (
          <div key={scheme} className={s.color_scheme_option}>
            <input
              type="radio"
              id={`color_scheme_${scheme}`}
              name="color_scheme"
              value={scheme}
              checked={colorScheme.scheme === scheme}
              onChange={onChange}
              disabled={scheme !== 'dark'}
            />
            <label htmlFor={`color_scheme_${scheme}`}>
              {(scheme === 'auto' ? 'system' : scheme).toUpperCase()}
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}
