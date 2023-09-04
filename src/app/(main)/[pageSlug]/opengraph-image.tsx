/*
 * opengraph-image.tsx
 * author: evan kirkiles
 * created on Sat Aug 26 2023
 * 2023 17o1 Records
 */

import DAY from '@/assets/svg/DAY';
import { ImageResponse } from 'next/server';

export const runtime = 'edge';
export const contentType = 'image/png';
export const size = {
  width: 1200,
  height: 630,
};

interface PageProps {
  params: { pageSlug: string };
}

export default async function Image({ params: { pageSlug } }: PageProps) {
  // Font
  const abcDiatypeBold = fetch(
    new URL(
      '../../../assets/fonts/ABC Diatype Edu Web/ABCDiatypeEdu-Bold.woff',
      import.meta.url
    )
  ).then((res) => res.arrayBuffer());

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          paddingTop: '3%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DAY
          disableTitle
          style={{
            height: '30vh',
            width: '50vh',
          }}
        />
        <div style={{ fontFamily: 'ABCDiatype', fontWeight: 700 }}>
          {`/${pageSlug}`}
        </div>
        <div
          style={{
            position: 'absolute',
            top: '50vh',
            left: '50vw',
            height: '70vh',
            width: '70vh',
            borderRadius: '50%',
            border: '1px solid black',
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '50vh',
            left: '50vw',
            height: '75vh',
            width: '75vh',
            borderRadius: '50%',
            border: '8px dashed black',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'ABCDiatype',
          data: await abcDiatypeBold,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
