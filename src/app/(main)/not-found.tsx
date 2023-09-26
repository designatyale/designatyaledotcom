/*
 * not-found.tsx
 * Author: evan kirkiles
 * Created On Fri Sep 01 2023
 * 2023 Design at Yale
 */
import { MonsieurLaDoulaise } from '@/fonts';
import s from './NotFound.module.scss';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className={s.container}>
      <h1 className={MonsieurLaDoulaise.className}>404</h1>
      <p>Page not found.</p>
      <a href="/">Go home</a>
    </div>
  );
}
