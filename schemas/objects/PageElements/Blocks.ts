/*
 * Copy.ts
 * author: evan kirkiles
 * created on Mon Aug 14 2023
 * 2023 Design at Yale
 */

import { PiTextAlignLeftFill } from 'react-icons/pi';
import { defineType } from 'sanity';
import { BlockEditorElementsArray } from '../BlockElements';

export default defineType({
  name: 'pe_blocks',
  type: 'object' as const,
  title: 'Text',
  icon: PiTextAlignLeftFill,
  description: 'Configurable block / image text.',
  fields: [
    {
      name: 'content',
      type: 'array' as const,
      of: BlockEditorElementsArray,
    },
  ],
});
