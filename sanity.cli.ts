/*
 * sanity.cli.ts
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 *
 * Configuration passed to the Sanity CLI, works once you fill our your .env.local.
 */
import { defineCliConfig } from 'sanity/cli';
import { SANITY_DATASET, SANITY_PROJECT_ID } from '@/env';

export default defineCliConfig({
  api: {
    projectId: SANITY_PROJECT_ID,
    dataset: SANITY_DATASET,
  },
});
