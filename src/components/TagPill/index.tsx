/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Mon Sep 04 2023
 * 2023 Design at Yale
 */

import { DesignTag } from '@/sanity/schema';
import s from './TagPill.module.scss';
import { useRefinementList } from 'react-instantsearch';
import classNames from 'classnames';

interface TagPillProps {
  tag: DesignTag;
}

export default function TagPill({ tag }: TagPillProps) {
  return (
    <li className={s.container}>
      <span className={s.color} style={{ backgroundColor: tag.color?.hex }} />
      <span>{tag.title}</span>
    </li>
  );
}
interface TagPillCheckboxProps {
  item: ReturnType<typeof useRefinementList>['items'][0];
  refine: ReturnType<typeof useRefinementList>['refine'];
}

export function TagPillCheckbox({ item, refine }: TagPillCheckboxProps) {
  return (
    <li
      className={classNames(s.container, {
        [s.container_checked]: item.isRefined,
      })}
    >
      <label className={s.label}>
        <input
          type="checkbox"
          checked={item.isRefined}
          onChange={() => refine(item.value)}
        />
        {/* <span className={s.color} style={{ backgroundColor: tag.color?.hex }} /> */}
        <span>{item.label}</span>
        <span> ({item.count})</span>
      </label>
    </li>
  );
}
