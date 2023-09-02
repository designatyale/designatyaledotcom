/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Sat Sep 02 2023
 * 2023 Design at Yale
 */
'use client';

import Image from 'next/image';
import { useNextSanityImage } from 'next-sanity-image';
import { SanityImageAsset } from 'sanity-codegen';
import getClient from '@/sanity/client';

interface SanityImageProps
  extends Omit<Parameters<typeof Image>[0], 'src' | 'alt'> {
  image: SanityImageAsset;
}

export default function SanityImage({ image, ...props }: SanityImageProps) {
  const imageProps = useNextSanityImage(getClient(), image);
  return (
    <Image
      {...imageProps}
      alt={image.altText || 'No alt text provided.'}
      placeholder="blur"
      blurDataURL={image.metadata.lqip}
      {...props}
    />
  );
}
