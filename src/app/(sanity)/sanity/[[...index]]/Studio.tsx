/*
 * Studio.tsx
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 */
'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../../sanity.config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

export function Studio() {
  const [queryClient] = useState(() => new QueryClient());
  //  Supports the same props as `import {Studio} from 'sanity'`, `config` is required
  return (
    <QueryClientProvider client={queryClient}>
      <NextStudio config={config} />
    </QueryClientProvider>
  );
}
