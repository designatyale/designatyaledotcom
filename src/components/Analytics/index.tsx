/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Mon Sep 04 2023
 * 2023 Design at Yale
 */
'use client';

import { GA4_TAG } from '@/env';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { useEffect } from 'react';

declare const window: Window & { dataLayer: Record<string, unknown>[] };

export const pageview = (url: string) => {
  window.dataLayer?.push({
    event: 'pageview',
    page: url,
  });
};

export function GTMAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(() => {
    if (pathname) pageview(pathname);
  }, [pathname, searchParams]);

  if (process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production') {
    return null;
  }

  return (
    <>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_TAG}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA4_TAG}');
          `,
        }}
      />
    </>
  );
}
