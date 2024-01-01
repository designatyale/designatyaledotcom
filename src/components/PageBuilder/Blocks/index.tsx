/*
 * index.tsx
 * Author: Evan Kirkiles
 * Created On Sat Dec 09 2023
 * 2023 Design at Yale
 */

import { SanityImageAsset, SanityReference, SiteSettings } from '@/sanity/types';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import s from './Blocks.module.scss';
import Link from 'next/link';
import SanityImage from '@/components/SanityImage';
import { SanityContentDataView, unwrapReference } from '@/sanity/lib/utils';

const components: PortableTextComponents = {
  types: {
    image({ value }: { value: { asset: SanityReference<SanityImageAsset> } }) {
      if (!value.asset) return null;
      return (
        <SanityImage
          className={s.block_image}
          image={unwrapReference(value.asset)}
        />
      );
    },
  },
  // marks, e.g. <a> or <em>
  marks: {
    link({ value, children }) {
      const href = value?.href;
      if (!href) return <>...</>;
      if (!href.startsWith('/'))
        return (
          <a
            href={href}
            className={s.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      return (
        <Link href={href} className={s.link}>
          {children}
        </Link>
      );
    },
    highlight: ({ value, children }) => (
      <span style={{ textShadow: `0px 0px 5px ${value.color?.hex}` }}>
        {children}
      </span>
    ),
  },
  // common list types
  list: {
    bullet: ({ children }) => <ul className={s.ul}>{children}</ul>,
    number: ({ children }) => <ol className={s.ol}>{children}</ol>,
  },
  // common list items
  listItem: ({ children }) => <li className={s.li}>{children}</li>,
  // block types
  block: {
    normal: ({ children }) => <p className={s.p}>{children}</p>,
  },
};

export default function Blocks({
  data,
}: SanityContentDataView<SiteSettings['footer_pane1']>) {
  if (!data) return null;
  return <PortableText value={data} components={components} />;
}
