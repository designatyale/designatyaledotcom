/*
 * CopyType.ts
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 *
 * Copy is simple (though very expressive!) portable text.
 */

import { PiTextAlignLeftFill } from 'react-icons/pi';
import { defineType } from 'sanity';

const CopyType = defineType({
  name: 'pe_copy',
  type: 'object' as const,
  title: 'Copy',
  icon: PiTextAlignLeftFill,
  description: 'Configurable block text.',
  fields: [
    {
      name: 'content',
      type: 'array' as const,
      of: [{ type: 'block' as const }],
    },
  ],
});

export default CopyType;
