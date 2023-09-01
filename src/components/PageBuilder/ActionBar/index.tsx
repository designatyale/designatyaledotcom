/*
 * index.tsx
 * author: evan kirkiles
 * created on Mon Aug 14 2023
 * 2023 17o1 Records
 */

import { PeActionBar } from '@/sanity/schema';
import ActionButton from '@/components/PageBuilder/ActionButton';
import s from './ActionBar.module.scss';

export default function ActionBar({ value }: { value: PeActionBar }) {
  return (
    <div
      className={s.container}
      style={{
        flexDirection: value.flex_dir,
        justifyContent: value.justification,
        alignItems: value.alignment,
      }}
    >
      {value.items.map((button) => (
        <ActionButton key={button._key} value={button} />
      ))}
    </div>
  );
}
