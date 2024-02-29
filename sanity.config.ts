/*
 * sanity.config.ts
 * Author: evan kirkiles
 * Created On Mon Aug 28 2023
 * 2023 Design at Yale
 */

import { defineConfig, isDev } from 'sanity';
import { media } from 'sanity-plugin-media';
import { visionTool } from '@sanity/vision';
import { colorInput } from '@sanity/color-input';
import { structureTool } from 'sanity/structure';
import schemaTypes from './schemas';
import { SANITY_PROJECT_ID, SANITY_DATASET } from '@/env';
import defaultDocumentNode from '@/sanity/desk/defaultDocumentNode';
import structure from '@/sanity/desk/structure';
import augmentPublishAction from '@/sanity/desk/actions/augmentPublish';
import UpdatePageAction from '@/sanity/desk/actions/revalidatePage';

const devOnlyPlugins: any[] = [];

export default defineConfig({
  name: 'default',
  title: 'Design at Yale',
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  basePath: '/sanity',
  plugins: [
    structureTool({
      structure,
      defaultDocumentNode,
    }),
    media(),
    visionTool(),
    colorInput(),
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
