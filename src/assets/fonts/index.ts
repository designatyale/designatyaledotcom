/*
 * index.ts
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 *
 * A place to define + export next/localFonts. Place the actual font files in
 * subdirectories here. Read more here:
 * https://nextjs.org/docs/app/building-your-application/optimizing/fonts#local-fonts
 *
 * Example implementation:
 * ```
 * import localFont from 'next/font/local';
 *
 * export const ArialNarrow = localFont({
 * variable: '--font-arialnarrow',
 * src: [
 *    {
 *      path: './Arial-Narrow-Bold.ttf',
 *      weight: '700',
 *      style: 'normal',
 *    },
 *   ],
 * });
 * ```
 */
import localFont from 'next/font/local';

export const ABCDiatype = localFont({
  variable: '--font-abcdiatype',
  src: [
    {
      path: './ABC Diatype Edu Web/ABCDiatypeEdu-Light.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './ABC Diatype Edu Web/ABCDiatypeEdu-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './ABC Diatype Edu Web/ABCDiatypeEdu-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
});
