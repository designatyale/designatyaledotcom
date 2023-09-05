/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Mon Sep 04 2023
 * 2023 Design at Yale
 */

import { DesignTag } from '@/sanity/schema';
import s from './TagPill.module.scss';

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
