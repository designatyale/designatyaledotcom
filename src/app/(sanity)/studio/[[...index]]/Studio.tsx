/*
 * Studio.tsx
 * author: evan kirkiles
 * created on Wed Jun 14 2023
 * 2023 Design at Yale
 */
'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../../sanity.config';

export function Studio() {
  //  Supports the same props as `import {Studio} from 'sanity'`, `config` is required
  return <NextStudio config={config} />;
}
