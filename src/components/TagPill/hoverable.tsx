/*
 * hoverable.tsx
 * Author: evan kirkiles
 * Created On Fri Sep 08 2023
 * 2023 Design at Yale
 */
'use client';

import { CSSTransition } from 'react-transition-group';
import classNames from 'classnames';
import s from './TagPill.module.scss';
import { DesignTag } from '@/sanity/schema';
import { useRef, useState } from 'react';

interface TagPillProps {
  tag: DesignTag;
}

export default function TagPillHoverable({ tag }: TagPillProps) {
  const [hovered, setHovered] = useState(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  return (
    <li
      className={classNames(s.container_collapsed)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        className={classNames(s.color, s.color_smaller)}
        style={{ backgroundColor: tag.color?.hex }}
        role="presentation"
      />
      <CSSTransition appear in={hovered} nodeRef={nodeRef} timeout={300}>
        <div
          className={classNames(s.container, s.container_appearing)}
          ref={nodeRef}
          aria-hidden={!hovered}
        >
          <span
            className={s.color}
            style={{ backgroundColor: tag.color?.hex }}
          />
          <span>{tag.title}</span>
        </div>
      </CSSTransition>
    </li>
  );
}
