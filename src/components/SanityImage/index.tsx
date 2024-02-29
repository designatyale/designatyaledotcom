/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Sat Sep 02 2023
 * 2023 Design at Yale
 */
'use client';

import Image from 'next/image';
import type { Event } from '@/sanity/schema';
import { useNextSanityImage } from 'next-sanity-image';
import { SanityImageAsset } from 'sanity-codegen';
import getClient from '@/sanity/client';
import unwrapReference from '@/util/unwrapReference';
import { useState } from 'react';

interface SanityImageProps
  extends Omit<Parameters<typeof Image>[0], 'src' | 'alt'> {
  image: SanityImageAsset | Event['picture'];
  loadFade?: boolean;
}

export default function SanityImage({
  image,
  loadFade,
  ...props
}: SanityImageProps) {
  const [loaded, setLoaded] = useState(false);
  const imageProps = useNextSanityImage(getClient(), image);
  const asset = image._type === 'image' ? unwrapReference(image.asset) : image;
  return (
    <Image
      {...imageProps}
      alt={asset.altText || 'No alt text provided.'}
      data-x-loaded={loaded}
      onLoad={() => setLoaded(true)}
      placeholder={!loadFade ? 'blur' : undefined}
      blurDataURL={asset.metadata.lqip}
      {...props}
    />
  );
}
