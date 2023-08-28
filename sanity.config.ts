/*
 * sanity.config.ts
 * Author: evan kirkiles
 * Created On Mon Aug 28 2023
 * 2023 Design at Yale
 */

import { defineConfig, isDev } from 'sanity';
import { media } from 'sanity-plugin-media';
import { visionTool } from '@sanity/vision';
import { deskTool } from 'sanity/desk';
import schemaTypes from './schemas';
import { SANITY_PROJECT_ID, SANITY_DATASET } from '@/env';
import defaultDocumentNode from '@/sanity/desk/defaultDocumentNode';
import structure from '@/sanity/desk/structure';
import augmentPublishAction from '@/sanity/desk/actions/augmentPublish';
import UpdatePageAction from '@/sanity/desk/actions/revalidatePage';

const devOnlyPlugins: any[] = [];

export default defineConfig({
  name: 'default',
  title: 'UNNAMED_DAY_WEBSITE',
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  basePath: '/studio',
  plugins: [
    deskTool({
      structure,
      defaultDocumentNode,
    }),
    media(),
    visionTool(),
    ...(isDev ? devOnlyPlugins : []),
  ],
  document: {
    actions: (prev, context) => [
      ...prev.map((originalAction) =>
        originalAction.action === 'publish'
          ? augmentPublishAction(originalAction, context)
          : originalAction
      ),
      UpdatePageAction(context),
    ],
  },
  schema: {
    types: schemaTypes,
  },
});
