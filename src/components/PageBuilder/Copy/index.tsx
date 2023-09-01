/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 */

import components from '@/components/PortableText';
import { PeCopy } from '@/sanity/schema';
import { PortableText } from '@portabletext/react';
import classNames from 'classnames';
import s from './Copy.module.scss';

export default function Copy({ value }: { value: PeCopy }) {
  return (
    <div
      className={classNames(s.container, {
        [s.column_2]: value.columns === 2,
        [s.column_3]: value.columns === 3,
      })}
    >
      <PortableText value={value.content ?? []} components={components} />
    </div>
  );
}
