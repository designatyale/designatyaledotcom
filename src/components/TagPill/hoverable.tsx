/*
 * hoverable.tsx
 * Author: evan kirkiles
 * Created On Fri Sep 08 2023
 * 2023 Design at Yale
 */
'use client';

import { Transition } from 'transition-hook';
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
      <Transition state={hovered} timeout={300}>
        {(stage, shouldMount) =>
          shouldMount && (
            <div
              className={classNames(s.container, s.container_appearing, stage)}
              ref={nodeRef}
              aria-hidden={!hovered}
            >
              <span
                className={s.color}
                style={{ backgroundColor: tag.color?.hex }}
              />
              <span>{tag.title}</span>
            </div>
          )
        }
      </Transition>
    </li>
  );
}
