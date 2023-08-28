/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 */

import components from '@/components/PortableText';
import { PeCopy } from '@/sanity/schema';
import { PortableText } from '@portabletext/react';

export default function Copy({ value }: { value: PeCopy }) {
  return <PortableText value={value.content ?? []} components={components} />;
}
