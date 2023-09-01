/*
 * CopyType.ts
 * Author: evan kirkiles
 * Created On Sun Aug 27 2023
 * 2023 Design at Yale
 *
 * Copy is simple (though very expressive!) portable text.
 */

import { PiTextAlignLeftFill } from 'react-icons/pi';
import { defineField, defineType } from 'sanity';

const CopyType = defineType({
  name: 'pe_copy',
  type: 'object' as const,
  title: 'Copy',
  icon: PiTextAlignLeftFill,
  description: 'Configurable block text.',
  fields: [
    defineField({
      name: 'content',
      type: 'array' as const,
      of: [{ type: 'block' as const }],
    }),
    defineField({
      name: 'columns',
      description:
        'How many evenly-spaced columns to break the text into. Default 1.',
      type: 'number' as const,
      initialValue: 1,
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
      options: {
        list: [1, 2, 3],
      },
    }),
  ],
});

export default CopyType;
