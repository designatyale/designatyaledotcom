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

// async function getFonts() {
//   const [arialNarrow] = await Promise.all([
//     fetch()
//   ])
// }

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: 'white',
          width: '100%',
          height: '100%',
          paddingTop: '1%',
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
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            height: '70vh',
            width: '70vh',
            borderRadius: '50%',
            border: '1px solid black',
            transform: 'translate(-50%, -50%)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
