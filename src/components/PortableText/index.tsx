/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 *
 * https://www.sanity.io/plugins/react-portable-text
 */

import classNames from 'classnames';
import { PortableTextComponents } from '@portabletext/react';
import s from './PortableText.module.scss';
import Link from 'next/link';

const components: PortableTextComponents = {
  // marks, e.g. <a> or <em>
  marks: {
    link({ value, children }) {
      const href = value?.href;
      if (!href) return <>...</>;
      if (!href.startsWith('/'))
        return (
          <a
            href={href}
            className={classNames(s.link)}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      return (
        <Link href={href} className={classNames(s.link)}>
          {children}
        </Link>
      );
    },
  },
  // common list types
  list: {
    bullet: ({ children }) => <ul className={classNames(s.ul)}>{children}</ul>,
    number: ({ children }) => <ol className={classNames(s.ol)}>{children}</ol>,
  },
  // common list items
  listItem: ({ children }) => <li className={classNames(s.li)}>{children}</li>,
  // bloc types
  block: {
    normal: ({ children }) => <p className={classNames(s.p)}>{children}</p>,
  },
};

export default components;
