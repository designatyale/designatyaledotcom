/*
 * index.tsx
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 */
'use client';

import getClient from '@/sanity/client';
import { LiveQueryProvider } from '@sanity/preview-kit';
import { PropsWithChildren, useMemo } from 'react';

/**
 * Provides live queries to allow for preview mode. When a user edits a draft,
 * the client can respond instantly.
 */
export default function PreviewProvider({
  children,
  token,
}: PropsWithChildren<{ token: string }>) {
  const client = useMemo(() => getClient({ token }), [token]);
  return <LiveQueryProvider client={client}>{children}</LiveQueryProvider>;
}
