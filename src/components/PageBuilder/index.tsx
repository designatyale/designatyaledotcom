/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 */

import Blocks from '@/components/PageBuilder/Blocks';
import { SanityContentDataView } from '@/sanity/lib/utils';
import { SitePage } from '@/sanity/types';

export default function PageBuilder({
  data,
  encodeDataAttribute,
  encodeDataPrefix,
}: SanityContentDataView<SitePage['pageBuilder']>) {
  return data?.map((block, i) => {
    switch (block._type) {
      case 'pe_blocks':
        return (
          <Blocks
            key={block._key}
            data={block.content}
            encodeDataAttribute={encodeDataAttribute}
            encodeDataPrefix={[...(encodeDataPrefix || []), i, 'content']}
          />
        );
      default:
        return null;
    }
  });
}
