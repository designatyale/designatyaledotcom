/*
 * index.tsx
 * author: Evan Kirkiles
 * created on Sun Nov 19 2023
 * 2023 Design at Yale
 */

import { SitePage } from '@/sanity/types';
import s from './NormalPage.module.scss';
import PageBuilder from '@/components/PageBuilder';
import { SanityContentDataView } from '@/sanity/lib/utils';

export default function NormalPageContent({
  data,
  encodeDataAttribute,
}: SanityContentDataView<SitePage>) {
  return (
    <>
      <article className={s.container} id="main-content" tabIndex={-1}>
        <PageBuilder
          data={data.pageBuilder}
          encodeDataAttribute={encodeDataAttribute}
          encodeDataPrefix={['pageBuilder']}
        />
      </article>
    </>
  );
}
