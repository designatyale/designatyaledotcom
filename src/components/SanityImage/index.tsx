/*
 * index.tsx
 * Author: Evan Kirkiles
 * Created On Sat Dec 09 2023
 * 2023 Design at Yale
 */
'use client';

import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { SanityImageAsset } from 'sanity-codegen';
import { client } from '@/sanity/lib/client';
import { vercelStegaCleanAll } from '@sanity/client/stega';

interface SanityImageProps
  extends Omit<Parameters<typeof Image>[0], 'src' | 'alt'> {
  image: SanityImageAsset;
}

export default function SanityImage({ image, ...props }: SanityImageProps) {
  const imageProps = useNextSanityImage(client, image);
  return (
    <Image
      {...imageProps}
      alt={vercelStegaCleanAll(image.altText || 'No alt text provided.')}
      placeholder="blur"
      blurDataURL={image.metadata.lqip}
      {...props}
    />
  );
}
